/* ════════════════════════════════════════════════
   report.js — Logika halaman Lapor Sungai
   Berisi: navigasi step, slider, skor, upload foto,
           peta mini, konfirmasi, dan halaman sukses

   PANDUAN UBAH SISTEM:
   - Bobot skor     → cari bagian "HITUNG SKOR"
   - Label slider   → cari array LABEL_SAMPAH, LABEL_KERUH, LABEL_BAU
   - Warna skor     → cari bagian "WARNA SKOR"
   - Validasi field → cari fungsi validateStep()
════════════════════════════════════════════════ */


/* ════════════════════════════════════════
   DATA GLOBAL
   Semua data laporan disimpan di objek ini
════════════════════════════════════════ */
var dataLaporan = {
  /* Step 1 — Lokasi */
  namaSungai : '',
  kelurahan  : '',
  kotaKab    : '',
  provinsi   : '',
  lat        : -6.2,   /* koordinat default (Jakarta) */
  lng        : 106.8,

  /* Step 2 — Kondisi */
  ph        : 7,
  sampah    : 2,   /* index 0-4 */
  keruh     : 0,   /* index 0-4 */
  bau       : 0,   /* index 0-4 */
  warna     : '',
  skor      : 0,   /* dihitung otomatis */
  statusAir : 'baik',

  /* Step 3 — Foto */
  fotoFiles : [],   /* array File objects */
  catatan   : '',
};

/* Step yang sedang aktif (1-4) */
var currentStep = 1;

/* Total step */
var TOTAL_STEP = 4;

/* ── Label untuk slider sampah ──
   Ubah teks label di sini sesuai kebutuhan */
var LABEL_SAMPAH = ['Tidak ada', 'Sedikit', 'Sedang', 'Banyak', 'Sangat Banyak'];

/* ── Label untuk slider kekeruhan ── */
var LABEL_KERUH  = ['Jernih', 'Agak Keruh', 'Keruh', 'Sangat Keruh', 'Hitam Pekat'];

/* ── Label untuk slider bau ── */
var LABEL_BAU    = ['Tidak Berbau', 'Sedikit Bau', 'Menyengat', 'Sangat Menyengat', 'Sangat Parah'];

/* Referensi peta Leaflet */
var miniMap  = null;
var mapPin   = null;


/* ════════════════════════════════════════
   INIT — Jalankan saat halaman dimuat
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  /* Tampilkan step 1 dan update progress */
  goToStep(1);

  /* Init peta mini Leaflet di Step 1 */
  initMiniMap();

  /* Hitung skor awal (semua slider default) */
  hitungSkor();

  /* Sync nilai awal slider ke tampilan */
  updateSlider('PH',     document.getElementById('sliderPH').value);
  updateSlider('Sampah', document.getElementById('sliderSampah').value);
  updateSlider('Keruh',  document.getElementById('sliderKeruh').value);
  updateSlider('Bau',    document.getElementById('sliderBau').value);
});


/* ════════════════════════════════════════
   NAVIGASI STEP
   goToStep(n)  — langsung lompat ke step n
   nextStep(n)  — dari step n ke step n+1
   prevStep(n)  — dari step n ke step n-1
════════════════════════════════════════ */

function goToStep(n) {
  /* Sembunyikan semua step */
  for (var i = 1; i <= TOTAL_STEP; i++) {
    var el = document.getElementById('step' + i);
    if (el) el.style.display = 'none';
  }
  /* Sembunyikan halaman sukses juga */
  var suc = document.getElementById('stepSuccess');
  if (suc) suc.style.display = 'none';

  /* Tampilkan step yang dipilih */
  var target = document.getElementById('step' + n);
  if (target) target.style.display = 'block';

  currentStep = n;

  /* Update indikator progress */
  updateProgress(n);

  /* Scroll ke atas form */
  var container = document.querySelector('.rp-form-container');
  if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Tombol "Lanjut" → validasi dulu, baru pindah */
function nextStep(dari) {
  /* Validasi input step saat ini */
  if (!validateStep(dari)) return;

  /* Simpan data step sebelum pindah */
  simpanDataStep(dari);

  /* Kalau step terakhir, jangan nextStep */
  if (dari >= TOTAL_STEP) return;

  /* Kalau mau ke step 4, isi dulu ringkasan konfirmasi */
  if (dari === 3) isiKonfirmasi();

  goToStep(dari + 1);
}

/* Tombol "Kembali" → langsung kembali tanpa validasi */
function prevStep(dari) {
  if (dari <= 1) return;
  goToStep(dari - 1);
}


/* ════════════════════════════════════════
   VALIDASI PER STEP
   Kembalikan true jika valid, false + alert jika tidak
════════════════════════════════════════ */
function validateStep(step) {
  if (step === 1) {
    /* Step 1: nama sungai dan kota wajib diisi */
    var nama = document.getElementById('namaSungai').value.trim();
    var kota = document.getElementById('kotaKab').value.trim();
    var prov = document.getElementById('provinsi').value;

    if (!nama) {
      /* Ubah pesan validasi di sini */
      showToast('Nama sungai wajib diisi!', 'error');
      document.getElementById('namaSungai').focus();
      return false;
    }
    if (!kota) {
      showToast('Kota / Kabupaten wajib diisi!', 'error');
      document.getElementById('kotaKab').focus();
      return false;
    }
    if (!prov) {
      showToast('Pilih provinsi terlebih dahulu!', 'error');
      document.getElementById('provinsi').focus();
      return false;
    }
    return true;
  }

  if (step === 2) {
    /* Step 2: warna air wajib dipilih */
    if (!dataLaporan.warna) {
      showToast('Pilih warna air yang sesuai!', 'error');
      return false;
    }
    return true;
  }

  if (step === 3) {
    /* Step 3: foto opsional — tidak ada validasi wajib */
    return true;
  }

  if (step === 4) {
    /* Step 4: checkbox persetujuan wajib dicentang */
    var chk = document.getElementById('termsCheck');
    if (!chk.checked) {
      showToast('Centang persetujuan terlebih dahulu!', 'error');
      return false;
    }
    return true;
  }

  return true;
}


/* ════════════════════════════════════════
   SIMPAN DATA TIAP STEP
════════════════════════════════════════ */
function simpanDataStep(step) {
  if (step === 1) {
    dataLaporan.namaSungai = document.getElementById('namaSungai').value.trim();
    dataLaporan.kelurahan  = document.getElementById('kelurahan').value.trim();
    dataLaporan.kotaKab    = document.getElementById('kotaKab').value.trim();
    dataLaporan.provinsi   = document.getElementById('provinsi').value;
  }
  if (step === 2) {
    dataLaporan.ph     = parseFloat(document.getElementById('sliderPH').value);
    dataLaporan.sampah = parseInt(document.getElementById('sliderSampah').value);
    dataLaporan.keruh  = parseInt(document.getElementById('sliderKeruh').value);
    dataLaporan.bau    = parseInt(document.getElementById('sliderBau').value);
  }
  if (step === 3) {
    dataLaporan.catatan   = document.getElementById('catatanTambahan').value.trim();
    dataLaporan.fotoFiles = uploadedFiles.slice(); /* salin array foto */
  }
}


/* ════════════════════════════════════════
   UPDATE PROGRESS BAR & STEP INDICATOR
   Dipanggil setiap kali pindah step
════════════════════════════════════════ */
function updateProgress(activeStep) {
  /* Persentase progress bar:
     Step 1 = 12.5%, Step 2 = 37.5%, Step 3 = 62.5%, Step 4 = 87.5% */
  var pct = ((activeStep - 1) / TOTAL_STEP) * 100 + 12.5;
  var fill = document.getElementById('progressFill');
  if (fill) fill.style.width = pct + '%';

  /* Update state tiap lingkaran step */
  for (var i = 1; i <= TOTAL_STEP; i++) {
    var item   = document.getElementById('ps' + i);
    var circle = item ? item.querySelector('.rp-ps-circle') : null;
    if (!item) continue;

    /* Hapus semua state dulu */
    item.className = 'rp-ps-item';

    if (i < activeStep) {
      /* Sudah selesai → centang hijau */
      item.classList.add('done');
      if (circle) circle.innerHTML = '<i class="bi bi-check-lg"></i>';
    } else if (i === activeStep) {
      /* Sedang aktif */
      item.classList.add('active');
      if (circle) circle.textContent = i;
    } else {
      /* Belum sampai */
      item.classList.add('wait');
      if (circle) circle.textContent = i;
    }

    /* Update warna garis penghubung */
    var line = document.getElementById('line' + i);
    if (line) {
      line.classList.toggle('active', i < activeStep);
    }
  }
}


/* ════════════════════════════════════════
   PETA MINI LEAFLET — STEP 1
════════════════════════════════════════ */
function initMiniMap() {
  var mapEl = document.getElementById('miniMapStep1');
  if (!mapEl || typeof L === 'undefined') return;

  /* Inisialisasi peta dengan koordinat default */
  miniMap = L.map('miniMapStep1', {
    zoomControl  : true,
    scrollWheelZoom: false,  /* nonaktifkan scroll zoom agar tidak ganggu scroll halaman */
  }).setView([dataLaporan.lat, dataLaporan.lng], 12);

  /* Tile layer OpenStreetMap */
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 18,
  }).addTo(miniMap);

  /* Pin yang bisa digeser */
  mapPin = L.marker([dataLaporan.lat, dataLaporan.lng], {
    draggable: true,  /* aktifkan drag pin */
    icon: L.divIcon({
      className: '',
      html: '<div style="width:20px;height:20px;border-radius:50% 50% 50% 0;background:#0e9c6a;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);transform:rotate(-45deg)"></div>',
      iconSize  : [20, 20],
      iconAnchor: [10, 20],
    }),
  }).addTo(miniMap);

  /* Saat pin digeser → simpan koordinat baru */
  mapPin.on('dragend', function (e) {
    var pos = e.target.getLatLng();
    dataLaporan.lat = pos.lat;
    dataLaporan.lng = pos.lng;
  });

  /* Klik di peta → pindahkan pin ke lokasi klik */
  miniMap.on('click', function (e) {
    mapPin.setLatLng(e.latlng);
    dataLaporan.lat = e.latlng.lat;
    dataLaporan.lng = e.latlng.lng;
  });
}

/* Pindahkan pin ke koordinat tertentu */
function pindahkanPin(lat, lng) {
  if (!miniMap || !mapPin) return;
  miniMap.setView([lat, lng], 14, { animate: true });
  mapPin.setLatLng([lat, lng]);
  dataLaporan.lat = lat;
  dataLaporan.lng = lng;
}


/* ════════════════════════════════════════
   TOMBOL GPS — Gunakan Lokasi Saat Ini
════════════════════════════════════════ */
function gunakanGPS() {
  var statusEl = document.getElementById('gpsStatus');
  var btn      = document.getElementById('gpsBtn');

  /* Cek apakah browser mendukung geolocation */
  if (!navigator.geolocation) {
    statusEl.innerHTML = '<span style="color:#f5a623"><i class="bi bi-exclamation-triangle"></i> Browser tidak mendukung GPS</span>';
    return;
  }

  /* Tampilkan loading */
  statusEl.innerHTML = '<span style="color:#1dd68a"><i class="bi bi-arrow-repeat"></i> Mendeteksi lokasi GPS...</span>';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    /* Berhasil */
    function (pos) {
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;

      /* Pindahkan pin peta */
      pindahkanPin(lat, lng);

      /* Update status */
      statusEl.innerHTML = '<span style="color:#1dd68a"><i class="bi bi-check-circle"></i> Lokasi berhasil terdeteksi</span>';
      btn.disabled = false;

      /* Isi field koordinat (opsional: isi nama kota via reverse geocoding) */
      dataLaporan.lat = lat;
      dataLaporan.lng = lng;

      /* Coba isi nama kota dari koordinat (Nominatim OpenStreetMap) */
      fetch('https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          /* Isi field dari hasil reverse geocoding */
          var addr = data.address || {};
          /* Nama kota: coba city, town, county, state */
          var kota = addr.city || addr.town || addr.county || '';
          var prov = addr.state || '';

          if (kota) document.getElementById('kotaKab').value = kota;
          if (prov) {
            /* Coba cocokkan dengan option di select provinsi */
            var sel = document.getElementById('provinsi');
            for (var i = 0; i < sel.options.length; i++) {
              if (sel.options[i].text.toLowerCase().includes(prov.toLowerCase().slice(0, 5))) {
                sel.selectedIndex = i;
                break;
              }
            }
          }
        })
        .catch(function () {
          /* Gagal reverse geocoding → tidak apa-apa, field kosong */
        });
    },
    /* Gagal */
    function (err) {
      var pesan = {
        1: 'Akses lokasi ditolak. Izinkan akses lokasi di pengaturan browser.',
        2: 'Lokasi tidak tersedia. Periksa sinyal GPS.',
        3: 'Waktu habis. Coba lagi.',
      };
      statusEl.innerHTML = '<span style="color:#f04040"><i class="bi bi-x-circle"></i> ' + (pesan[err.code] || 'GPS gagal') + '</span>';
      btn.disabled = false;
    },
    /* Opsi: timeout 10 detik */
    { timeout: 10000, enableHighAccuracy: true }
  );
}


/* ════════════════════════════════════════
   SLIDER KONDISI AIR — STEP 2
   Dipanggil setiap kali nilai slider berubah
════════════════════════════════════════ */
function updateSlider(tipe, nilai) {
  nilai = parseFloat(nilai);

  /* ── UPDATE LABEL NILAI ── */
  if (tipe === 'PH') {
    /* Tampilkan nilai pH dengan 1 desimal */
    document.getElementById('valPH').textContent = nilai.toFixed(1);
    /* Update warna nilai: merah jika asam/basa ekstrem, hijau jika netral */
    var warnaVal = getWarnaPH(nilai);
    document.getElementById('valPH').style.color = warnaVal;
    updateSliderTrack('sliderPH', (nilai / 14) * 100, warnaVal);
  }
  else if (tipe === 'Sampah') {
    var idx = Math.round(nilai);
    document.getElementById('valSampah').textContent = LABEL_SAMPAH[idx];
    var warnaSampah = idx >= 3 ? '#f04040' : idx === 2 ? '#f5a623' : '#1dd68a';
    document.getElementById('valSampah').style.color = warnaSampah;
    updateSliderTrack('sliderSampah', (idx / 4) * 100, warnaSampah);
  }
  else if (tipe === 'Keruh') {
    var idx = Math.round(nilai);
    document.getElementById('valKeruh').textContent = LABEL_KERUH[idx];
    var warnaKeruh = idx >= 3 ? '#f04040' : idx >= 2 ? '#f5a623' : '#1dd68a';
    document.getElementById('valKeruh').style.color = warnaKeruh;
    updateSliderTrack('sliderKeruh', (idx / 4) * 100, warnaKeruh);
  }
  else if (tipe === 'Bau') {
    var idx = Math.round(nilai);
    document.getElementById('valBau').textContent = LABEL_BAU[idx];
    var warnaBau = idx >= 3 ? '#f04040' : idx >= 2 ? '#f5a623' : '#1dd68a';
    document.getElementById('valBau').style.color = warnaBau;
    updateSliderTrack('sliderBau', (idx / 4) * 100, warnaBau);
  }

  /* Hitung ulang skor setelah slider berubah */
  hitungSkor();
}

/* Warna untuk nilai pH:
   < 5 atau > 9 = merah (berbahaya)
   5-6 atau 8-9 = kuning (sedang)
   6-8 = hijau (aman)
   Ubah ambang batas di sini */
function getWarnaPH(ph) {
  if (ph < 5 || ph > 9) return '#f04040';
  if (ph < 6 || ph > 8) return '#f5a623';
  return '#1dd68a';
}

/* Update track slider dengan gradient warna */
function updateSliderTrack(sliderId, pct, warna) {
  var sl = document.getElementById(sliderId);
  if (!sl) return;
  /* Gradient: warna sampai pct%, abu setelahnya */
  sl.style.background = 'linear-gradient(to right, ' + warna + ' 0%, ' + warna + ' ' + pct + '%, rgba(29,214,138,0.12) ' + pct + '%, rgba(29,214,138,0.12) 100%)';
  /* Ubah warna thumb juga */
  sl.style.setProperty('--thumb-color', warna);
}


/* ════════════════════════════════════════
   PILIH WARNA AIR
════════════════════════════════════════ */
function pilihWarna(elItem) {
  /* Hapus class selected dari semua item */
  var items = document.querySelectorAll('.rp-warna-item');
  items.forEach(function (el) { el.classList.remove('selected'); });

  /* Tandai yang dipilih */
  elItem.classList.add('selected');
  dataLaporan.warna = elItem.getAttribute('data-warna');

  /* Warna hitam/abu tambah skor → hitung ulang */
  hitungSkor();
}


/* ════════════════════════════════════════
   HITUNG SKOR PENCEMARAN
   Skor 0–100, makin tinggi makin tercemar

   CARA UBAH BOBOT:
   - BOBOT_PH    = kontribusi maksimal pH ke skor
   - BOBOT_SAMPAH = kontribusi maksimal sampah
   - BOBOT_KERUH  = kontribusi maksimal kekeruhan
   - BOBOT_BAU    = kontribusi maksimal bau
   - BOBOT_WARNA  = kontribusi maksimal warna
   Total bobot sebaiknya = 100
════════════════════════════════════════ */
function hitungSkor() {
  /* ── Ambil nilai slider saat ini ── */
  var ph     = parseFloat(document.getElementById('sliderPH').value);
  var sampah = parseInt(document.getElementById('sliderSampah').value);
  var keruh  = parseInt(document.getElementById('sliderKeruh').value);
  var bau    = parseInt(document.getElementById('sliderBau').value);

  /* ── BOBOT SKOR (ubah di sini) ── */
  var BOBOT_PH     = 30; /* pH paling berpengaruh */
  var BOBOT_SAMPAH = 25;
  var BOBOT_KERUH  = 25;
  var BOBOT_BAU    = 15;
  var BOBOT_WARNA  = 5;

  /* ── Hitung skor pH ──
     pH ideal = 6-8, makin jauh dari netral (7) makin buruk */
  var jarakDariNetral = Math.abs(ph - 7); /* 0 = netral, 7 = ekstrem */
  var skorPH = Math.min(jarakDariNetral / 7, 1) * BOBOT_PH;

  /* ── Skor sampah (0-4 → 0-100%) ── */
  var skorSampah = (sampah / 4) * BOBOT_SAMPAH;

  /* ── Skor kekeruhan ── */
  var skorKeruh = (keruh / 4) * BOBOT_KERUH;

  /* ── Skor bau ── */
  var skorBau = (bau / 4) * BOBOT_BAU;

  /* ── Skor warna ──
     Hitam = paling buruk (+5), abu = sedang (+3), coklat = (+2) */
  var SKOR_WARNA = {
    'jernih': 0, 'hijau': 2, 'coklat': 3, 'abu': 3, 'hitam': 5
  };
  var skorWarna = (SKOR_WARNA[dataLaporan.warna] || 0);

  /* ── Total skor (pembulatan) ── */
  var totalSkor = Math.round(skorPH + skorSampah + skorKeruh + skorBau + skorWarna);
  totalSkor = Math.min(100, Math.max(0, totalSkor)); /* clamp 0-100 */
  dataLaporan.skor = totalSkor;

  /* ── Tentukan status berdasarkan skor ──
     Ubah ambang batas di sini */
  if (totalSkor >= 60) {
    dataLaporan.statusAir = 'kritis';
  } else if (totalSkor >= 30) {
    dataLaporan.statusAir = 'sedang';
  } else {
    dataLaporan.statusAir = 'baik';
  }

  /* ── Update tampilan skor ── */
  tampilkanSkor(totalSkor, skorPH, skorSampah, skorKeruh, skorBau);
}

/* Update semua elemen tampilan skor */
function tampilkanSkor(total, sPH, sSampah, sKeruh, sBau) {

  /* ── WARNA SKOR berdasarkan nilai ──
     Ubah warna dan ambang batas di sini */
  var warna, deskripsi;
  if (total >= 60) {
    warna     = '#f04040'; /* merah = kritis */
    deskripsi = 'Tercemar parah — perlu penanganan segera!';
  } else if (total >= 30) {
    warna     = '#f5a623'; /* kuning = sedang */
    deskripsi = 'Tercemar sedang — perlu perhatian lebih lanjut';
  } else {
    warna     = '#1dd68a'; /* hijau = baik */
    deskripsi = 'Kondisi normal — air dalam keadaan baik';
  }

  /* Nilai teks */
  var elNilai = document.getElementById('skorNilai');
  if (elNilai) {
    elNilai.textContent = total + ' / 100';
    elNilai.style.color = warna;
  }

  /* Deskripsi */
  var elDesc = document.getElementById('skorDesc');
  if (elDesc) elDesc.textContent = deskripsi;

  /* Angka di tengah lingkaran SVG */
  var elAngka = document.getElementById('skorAngka');
  if (elAngka) {
    elAngka.textContent = total;
    elAngka.setAttribute('fill', warna);
  }

  /* Fill lingkaran SVG
     Keliling lingkaran r=32 = 2π×32 ≈ 201
     stroke-dasharray = "terisi kosong"  */
  var elRing = document.getElementById('skorRingFill');
  if (elRing) {
    var keliling = 201;
    var terisi   = (total / 100) * keliling;
    elRing.setAttribute('stroke-dasharray', terisi + ' ' + (keliling - terisi));
    elRing.setAttribute('stroke', warna);
  }

  /* Border warna skor box */
  var elBox = document.getElementById('skorBox');
  if (elBox) elBox.style.borderColor = warna + '33';

  /* ── Breakdown mini bar ── */
  updateBreakdownBar('sbPH',     'sbPHVal',     sPH,     30);
  updateBreakdownBar('sbSampah', 'sbSampahVal', sSampah, 25);
  updateBreakdownBar('sbKeruh',  'sbKeruhVal',  sKeruh,  25);
  updateBreakdownBar('sbBau',    'sbBauVal',    sBau,    15);
}

/* Update satu baris breakdown bar */
function updateBreakdownBar(barId, valId, nilai, maks) {
  var bar = document.getElementById(barId);
  var val = document.getElementById(valId);
  if (!bar || !val) return;

  var pct   = maks > 0 ? (nilai / maks) * 100 : 0;
  var warna = pct >= 70 ? '#f04040' : pct >= 40 ? '#f5a623' : '#1dd68a';

  bar.style.width      = pct + '%';
  bar.style.background = warna;
  val.textContent      = Math.round(nilai);
}


/* ════════════════════════════════════════
   UPLOAD FOTO — STEP 3
════════════════════════════════════════ */
var uploadedFiles = []; /* array File yang sudah dipilih */
var MAX_FOTO = 5;       /* ubah batas maksimal foto di sini */

/* Dipanggil dari input[type=file] */
function handleFileSelect(event) {
  tambahFoto(Array.from(event.target.files));
  /* Reset input agar bisa pilih file yang sama lagi */
  event.target.value = '';
}

/* Dipanggil dari drag & drop */
function handleDrop(event) {
  event.preventDefault();
  var zone = document.getElementById('uploadZone');
  if (zone) zone.classList.remove('rp-drag-over');

  var files = Array.from(event.dataTransfer.files)
    .filter(function (f) { return f.type.startsWith('image/'); });
  tambahFoto(files);
}

/* Tambah foto ke array dan render preview */
function tambahFoto(files) {
  files.forEach(function (file) {
    /* Cek batas maksimal */
    if (uploadedFiles.length >= MAX_FOTO) {
      showToast('Maksimal ' + MAX_FOTO + ' foto!', 'error');
      return;
    }
    /* Cek ukuran file (5MB) */
    if (file.size > 5 * 1024 * 1024) {
      showToast(file.name + ' terlalu besar! Maks 5MB.', 'error');
      return;
    }
    uploadedFiles.push(file);
  });
  renderPreviewFoto();
}

/* Render semua preview foto */
function renderPreviewFoto() {
  var grid = document.getElementById('previewGrid');
  var info = document.getElementById('uploadInfo');
  if (!grid) return;

  grid.innerHTML = '';

  uploadedFiles.forEach(function (file, index) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var item = document.createElement('div');
      item.className = 'rp-preview-item';
      item.innerHTML =
        '<img src="' + e.target.result + '" alt="Foto ' + (index + 1) + '" />' +
        '<button class="rp-preview-del" onclick="hapusFoto(' + index + ')" title="Hapus foto">' +
        '<i class="bi bi-x"></i></button>';
      grid.appendChild(item);
    };
    reader.readAsDataURL(file);
  });

  /* Update info jumlah foto */
  if (info) {
    if (uploadedFiles.length === 0) {
      info.textContent = 'Belum ada foto dipilih';
    } else {
      info.textContent = uploadedFiles.length + ' foto dipilih (maks. ' + MAX_FOTO + ')';
    }
  }
}

/* Hapus foto berdasarkan index */
function hapusFoto(index) {
  uploadedFiles.splice(index, 1);
  renderPreviewFoto();
}


/* ════════════════════════════════════════
   ISI DATA KONFIRMASI — STEP 4
   Dipanggil saat pindah dari Step 3 ke Step 4
════════════════════════════════════════ */
function isiKonfirmasi() {
  /* Simpan data step 3 dulu */
  simpanDataStep(3);

  /* ── Nama & lokasi ── */
  var cfNama = document.getElementById('cfNama');
  var cfLok  = document.getElementById('cfLokasi');
  if (cfNama) cfNama.textContent = dataLaporan.namaSungai || '—';
  if (cfLok) {
    var lokStr = [dataLaporan.kelurahan, dataLaporan.kotaKab, dataLaporan.provinsi]
      .filter(Boolean).join(', ');
    cfLok.innerHTML = '<i class="bi bi-geo-alt-fill"></i> ' + (lokStr || '—');
  }

  /* ── Badge status ── */
  var badge = document.getElementById('cfBadge');
  if (badge) {
    var labelStatus = {
      'baik'  : 'Baik',
      'sedang': 'Sedang',
      'kritis': 'Kritis',
    };
    badge.textContent = labelStatus[dataLaporan.statusAir] || '—';
    badge.className   = 'rp-confirm-badge ' + dataLaporan.statusAir;
  }

  /* ── Data kondisi ── */
  set('cfPH',     dataLaporan.ph.toFixed(1) + ' — ' + deskripsiPH(dataLaporan.ph));
  set('cfSampah', LABEL_SAMPAH[dataLaporan.sampah]);
  set('cfKeruh',  LABEL_KERUH[dataLaporan.keruh]);

  /* Warna air dengan kapitalisasi */
  var labelWarna = {
    'jernih': 'Jernih', 'hijau': 'Hijau', 'coklat': 'Coklat',
    'abu'   : 'Abu-abu','hitam': 'Hitam',
  };
  set('cfWarna', labelWarna[dataLaporan.warna] || '—');

  /* Skor dengan warna */
  var elSkor = document.getElementById('cfSkor');
  if (elSkor) {
    var warnaS = dataLaporan.skor >= 60 ? '#f04040' : dataLaporan.skor >= 30 ? '#f5a623' : '#1dd68a';
    elSkor.innerHTML = '<span style="color:' + warnaS + '">' + dataLaporan.skor + ' / 100</span>';
  }

  /* Jumlah foto */
  var jmlFoto = dataLaporan.fotoFiles.length;
  set('cfFoto', jmlFoto > 0 ? jmlFoto + ' foto dilampirkan' : 'Tidak ada foto');

  /* Catatan */
  set('cfCatatan', dataLaporan.catatan || 'Tidak ada catatan');

  /* ── Thumbnail foto (maks 3) ── */
  var cfPhotos = document.getElementById('cfPhotos');
  if (cfPhotos) {
    cfPhotos.innerHTML = '';
    dataLaporan.fotoFiles.slice(0, 3).forEach(function (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var div = document.createElement('div');
        div.className = 'rp-conf-photo';
        div.innerHTML = '<img src="' + e.target.result + '" alt="Foto laporan" />';
        cfPhotos.appendChild(div);
      };
      reader.readAsDataURL(file);
    });
  }
}

/* Helper: set textContent elemen */
function set(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text || '—';
}

/* Deskripsi singkat nilai pH */
function deskripsiPH(ph) {
  if (ph < 5)  return 'Sangat asam';
  if (ph < 6)  return 'Asam';
  if (ph < 6.5)return 'Sedikit asam';
  if (ph <= 7.5)return 'Normal';
  if (ph <= 8.5)return 'Sedikit basa';
  if (ph <= 9)  return 'Basa';
  return 'Sangat basa';
}


/* ════════════════════════════════════════
   KIRIM LAPORAN
   Dipanggil dari tombol "Kirim Laporan" di Step 4
════════════════════════════════════════ */
function kirimLaporan() {
  /* Validasi checkbox persetujuan */
  if (!validateStep(4)) return;

  /* Simpan data final */
  simpanDataStep(4);

  /* Tampilkan loading di tombol */
  var btnSubmit = document.querySelector('.rp-btn-submit');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<i class="bi bi-arrow-repeat"></i> Mengirim...';
  }

  /* Simulasi delay pengiriman (ganti dengan fetch/AJAX ke server jika ada) */
  setTimeout(function () {
    tampilkanSukses();
  }, 1800);

  /* ── JIKA INGIN KIRIM KE SERVER, GANTI setTimeout DI ATAS DENGAN: ──
  var formData = new FormData();
  formData.append('namaSungai', dataLaporan.namaSungai);
  formData.append('kotaKab',    dataLaporan.kotaKab);
  formData.append('provinsi',   dataLaporan.provinsi);
  formData.append('ph',         dataLaporan.ph);
  formData.append('sampah',     dataLaporan.sampah);
  formData.append('keruh',      dataLaporan.keruh);
  formData.append('bau',        dataLaporan.bau);
  formData.append('warna',      dataLaporan.warna);
  formData.append('skor',       dataLaporan.skor);
  formData.append('catatan',    dataLaporan.catatan);
  dataLaporan.fotoFiles.forEach(function(f) { formData.append('foto[]', f); });

  fetch('api/laporan.php', { method: 'POST', body: formData })
    .then(function(r) { return r.json(); })
    .then(function(res) { tampilkanSukses(res.nomor); })
    .catch(function() { showToast('Gagal mengirim, coba lagi!', 'error'); });
  */
}


/* ════════════════════════════════════════
   TAMPILKAN HALAMAN SUKSES
════════════════════════════════════════ */
function tampilkanSukses(nomorServer) {
  /* Sembunyikan semua step */
  for (var i = 1; i <= TOTAL_STEP; i++) {
    var el = document.getElementById('step' + i);
    if (el) el.style.display = 'none';
  }

  /* Sembunyikan progress bar */
  var progWrap = document.querySelector('.rp-progress-wrap');
  if (progWrap) progWrap.style.display = 'none';

  /* Tampilkan halaman sukses */
  var suc = document.getElementById('stepSuccess');
  if (suc) suc.style.display = 'block';

  /* Generate nomor laporan unik
     Format: RW-TAHUN-NOMER_ACAK
     Ganti dengan nomor dari server jika tersedia */
  var tahun  = new Date().getFullYear();
  var nomor  = nomorServer || ('RW-' + tahun + '-' + String(Math.floor(10000 + Math.random() * 89999)));
  var elNomor = document.getElementById('nomorLaporan');
  if (elNomor) elNomor.textContent = nomor;

  /* Animasi lingkaran centang SVG */
  setTimeout(function () {
    var circle = document.getElementById('successCircle');
    var check  = document.getElementById('successCheck');
    if (circle) circle.style.strokeDashoffset = '0';
    if (check)  check.style.strokeDashoffset  = '0';
  }, 200);

  /* Scroll ke atas */
  var container = document.querySelector('.rp-form-container');
  if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/* ════════════════════════════════════════
   RESET FORM — Kembali ke Step 1
   Dipanggil dari tombol "Lapor Sungai Lain"
════════════════════════════════════════ */
function resetForm() {
  /* Reset data global */
  dataLaporan = {
    namaSungai: '', kelurahan: '', kotaKab: '', provinsi: '',
    lat: -6.2, lng: 106.8,
    ph: 7, sampah: 2, keruh: 0, bau: 0,
    warna: '', skor: 0, statusAir: 'baik',
    fotoFiles: [], catatan: '',
  };
  uploadedFiles = [];

  /* Reset semua input form */
  document.getElementById('namaSungai').value  = '';
  document.getElementById('kelurahan').value   = '';
  document.getElementById('kotaKab').value     = '';
  document.getElementById('provinsi').value    = '';
  document.getElementById('catatanTambahan').value = '';
  document.getElementById('termsCheck').checked = false;

  /* Reset slider ke default */
  document.getElementById('sliderPH').value     = 7;
  document.getElementById('sliderSampah').value = 2;
  document.getElementById('sliderKeruh').value  = 0;
  document.getElementById('sliderBau').value    = 0;

  /* Reset warna yang dipilih */
  document.querySelectorAll('.rp-warna-item').forEach(function (el) {
    el.classList.remove('selected');
  });

  /* Reset preview foto */
  var grid = document.getElementById('previewGrid');
  if (grid) grid.innerHTML = '';
  var info = document.getElementById('uploadInfo');
  if (info) info.textContent = 'Belum ada foto dipilih';

  /* Tampilkan progress bar lagi */
  var progWrap = document.querySelector('.rp-progress-wrap');
  if (progWrap) progWrap.style.display = '';

  /* Kembali ke step 1 */
  goToStep(1);

  /* Update slider tampilan */
  updateSlider('PH',     7);
  updateSlider('Sampah', 2);
  updateSlider('Keruh',  0);
  updateSlider('Bau',    0);
  hitungSkor();
}


/* ════════════════════════════════════════
   TOAST NOTIFIKASI
   Pesan singkat yang muncul & hilang otomatis
   Ubah durasi di setTimeout di bawah
════════════════════════════════════════ */
function showToast(pesan, tipe) {
  /* Hapus toast lama jika ada */
  var lama = document.getElementById('rp-toast');
  if (lama) lama.remove();

  /* Warna sesuai tipe */
  var warna = tipe === 'error' ? '#f04040' : tipe === 'success' ? '#1dd68a' : '#f5a623';
  var ikon  = tipe === 'error' ? 'bi-x-circle-fill' : tipe === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill';

  /* Buat elemen toast */
  var toast = document.createElement('div');
  toast.id  = 'rp-toast';
  toast.style.cssText = [
    'position:fixed',
    'bottom:24px',
    'right:24px',
    'z-index:9999',
    'background:#031f18',
    'border:1px solid ' + warna + '44',
    'border-left:3px solid ' + warna,
    'border-radius:10px',
    'padding:12px 18px',
    'display:flex',
    'align-items:center',
    'gap:10px',
    'font-size:13px',
    'color:#c0ddd0',
    'font-family:Outfit,sans-serif',
    'box-shadow:0 4px 20px rgba(0,0,0,0.4)',
    'animation:toastIn 0.3s ease',
    'max-width:320px',
  ].join(';');

  toast.innerHTML =
    '<i class="bi ' + ikon + '" style="color:' + warna + ';font-size:16px;flex-shrink:0"></i>' +
    '<span>' + pesan + '</span>';

  /* Tambahkan animasi CSS */
  if (!document.getElementById('toast-style')) {
    var style = document.createElement('style');
    style.id  = 'toast-style';
    style.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}';
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  /* Hilang otomatis setelah 3 detik — ubah 3000 untuk durasi lebih panjang */
  setTimeout(function () {
    toast.style.transition = 'opacity 0.3s ease';
    toast.style.opacity = '0';
    setTimeout(function () { if (toast) toast.remove(); }, 300);
  }, 3000);
}
