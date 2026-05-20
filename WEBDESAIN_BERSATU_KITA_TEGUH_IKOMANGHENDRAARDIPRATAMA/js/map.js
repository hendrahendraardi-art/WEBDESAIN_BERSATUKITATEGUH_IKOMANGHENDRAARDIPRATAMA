const RIVER_DATA = [
  {
    id: 1,
    name: "Sungai Ciliwung",
    loc: "Jakarta Timur, DKI Jakarta",
    lat: -6.2146,
    lng: 106.8451,
    status: "kritis",
    ph: "5.2",
    suhu: "29",
    oksigen: "3.1",
    sampah: "Tinggi",
    desc: "Tercemar limbah domestik dan sampah plastik parah.",
    reports: [
      {
        user: "@andi_r",
        time: "2 mnt lalu",
        desc: "Air hitam berbau, banyak sampah plastik mengapung.",
      },
      {
        user: "@dewi_s",
        time: "1 jam lalu",
        desc: "Ditemukan busa tebal di sekitar jembatan Condet.",
      },
      {
        user: "@fajar_m",
        time: "3 jam lalu",
        desc: "Warna air berubah kecoklatan setelah hujan.",
      },
    ],
    photos: ["🗑️", "💧", "📸"],
    trendPH: [5.0, 5.1, 5.3, 5.2, 4.9, 5.2, 5.2],
  },
  {
    id: 2,
    name: "Sungai Citarum",
    loc: "Bandung, Jawa Barat",
    lat: -6.91,
    lng: 107.6198,
    status: "kritis",
    ph: "4.8",
    suhu: "28",
    oksigen: "2.5",
    sampah: "Sangat Tinggi",
    desc: "Salah satu sungai paling tercemar di dunia. Limbah industri tekstil mendominasi.",
    reports: [
      {
        user: "@rini_s",
        time: "15 mnt lalu",
        desc: "Limbah pabrik tekstil berwarna biru mengalir deras.",
      },
      {
        user: "@budi_w",
        time: "2 jam lalu",
        desc: "Bau menyengat di sepanjang bantaran sungai.",
      },
      {
        user: "@siti_m",
        time: "5 jam lalu",
        desc: "Ikan-ikan mati ditemukan di dekat outlet limbah.",
      },
    ],
    photos: ["🏭", "🐟", "⚠️"],
    trendPH: [4.5, 4.7, 4.6, 4.8, 4.9, 4.8, 4.8],
  },
  {
    id: 3,
    name: "Bengawan Solo",
    loc: "Solo, Jawa Tengah",
    lat: -7.5586,
    lng: 110.8321,
    status: "sedang",
    ph: "6.5",
    suhu: "27",
    oksigen: "5.2",
    sampah: "Sedang",
    desc: "Tercemar sedang oleh limbah pertanian dan domestik.",
    reports: [
      {
        user: "@joko_p",
        time: "20 mnt lalu",
        desc: "Sampah rumah tangga menumpuk di tepi sungai.",
      },
      {
        user: "@wahyu_d",
        time: "4 jam lalu",
        desc: "Keruhnya meningkat setelah hujan deras kemarin.",
      },
    ],
    photos: ["🌿", "💧", "📍"],
    trendPH: [6.8, 6.6, 6.4, 6.5, 6.3, 6.6, 6.5],
  },
  {
    id: 4,
    name: "Sungai Code",
    loc: "Yogyakarta, DIY",
    lat: -7.8014,
    lng: 110.3647,
    status: "baik",
    ph: "7.1",
    suhu: "26",
    oksigen: "7.3",
    sampah: "Rendah",
    desc: "Kondisi cukup baik. Komunitas lokal aktif menjaga kebersihan.",
    reports: [
      {
        user: "@maya_k",
        time: "1 jam lalu",
        desc: "Kondisi jernih, ada kegiatan gotong royong bersih sungai.",
      },
    ],
    photos: ["✅", "🌊", "🌿"],
    trendPH: [7.0, 7.1, 7.2, 7.1, 7.0, 7.1, 7.1],
  },
  {
    id: 5,
    name: "Kali Surabaya",
    loc: "Surabaya, Jawa Timur",
    lat: -7.24,
    lng: 112.738,
    status: "sedang",
    ph: "6.4",
    suhu: "30",
    oksigen: "4.8",
    sampah: "Sedang",
    desc: "Kualitas air menurun akibat buangan industri dan domestik.",
    reports: [
      {
        user: "@deni_p",
        time: "30 mnt lalu",
        desc: "Busa mulai muncul di dekat kawasan industri Rungkut.",
      },
      {
        user: "@ayu_f",
        time: "6 jam lalu",
        desc: "Sampah plastik banyak terlihat setelah musim hujan.",
      },
    ],
    photos: ["⚠️", "🗑️", "🌊"],
    trendPH: [6.6, 6.5, 6.3, 6.4, 6.2, 6.4, 6.4],
  },
  {
    id: 6,
    name: "Sungai Kapuas",
    loc: "Pontianak, Kalimantan Barat",
    lat: -0.0233,
    lng: 109.3321,
    status: "baik",
    ph: "7.0",
    suhu: "28",
    oksigen: "6.8",
    sampah: "Rendah",
    desc: "Sungai terpanjang di Indonesia. Kondisi relatif baik di hilir.",
    reports: [
      {
        user: "@made_p",
        time: "45 mnt lalu",
        desc: "Air masih jernih di bagian tengah kota.",
      },
    ],
    photos: ["🌿", "🐟", "✅"],
    trendPH: [7.1, 7.0, 7.0, 7.1, 7.2, 7.0, 7.0],
  },
  {
    id: 7,
    name: "Sungai Musi",
    loc: "Palembang, Sumatera Selatan",
    lat: -2.9908,
    lng: 104.7576,
    status: "baik",
    ph: "6.9",
    suhu: "29",
    oksigen: "6.5",
    sampah: "Rendah",
    desc: "Kondisi terpantau stabil. Lalu lintas perahu masih aktif.",
    reports: [
      {
        user: "@farhan_s",
        time: "2 jam lalu",
        desc: "Sungai terlihat bersih di sekitar Jembatan Ampera.",
      },
    ],
    photos: ["🌊", "✅", "📍"],
    trendPH: [6.8, 6.9, 7.0, 6.9, 6.8, 6.9, 6.9],
  },
  {
    id: 8,
    name: "Sungai Deli",
    loc: "Medan, Sumatera Utara",
    lat: 3.585,
    lng: 98.6753,
    status: "sedang",
    ph: "6.3",
    suhu: "28",
    oksigen: "4.9",
    sampah: "Sedang",
    desc: "Tercemar sedang dari limbah pasar dan permukiman padat.",
    reports: [
      {
        user: "@tina_h",
        time: "1 jam lalu",
        desc: "Sampah pasar Petisah banyak terbawa ke sungai.",
      },
      {
        user: "@rio_d",
        time: "8 jam lalu",
        desc: "Warna agak keruh tapi tidak berbau menyengat.",
      },
    ],
    photos: ["⚠️", "🗑️", "💧"],
    trendPH: [6.5, 6.4, 6.2, 6.3, 6.1, 6.4, 6.3],
  },
  {
    id: 9,
    name: "Tukad Badung",
    loc: "Denpasar, Bali",
    lat: -8.6578,
    lng: 115.2168,
    status: "kritis",
    ph: "5.0",
    suhu: "29",
    oksigen: "2.9",
    sampah: "Tinggi",
    desc: "Tercemar berat oleh limbah hotel dan restoran di kawasan wisata.",
    reports: [
      {
        user: "@nyoman_s",
        time: "10 mnt lalu",
        desc: "Sampah plastik penuh di sepanjang aliran sungai.",
      },
      {
        user: "@kadek_p",
        time: "3 jam lalu",
        desc: "Limbah dapur hotel mengalir langsung ke sungai.",
      },
      {
        user: "@wayan_b",
        time: "7 jam lalu",
        desc: "Bau tidak sedap di kawasan Kuta akibat sungai.",
      },
    ],
    photos: ["🚨", "🗑️", "⚠️"],
    trendPH: [4.8, 5.0, 5.1, 5.0, 4.9, 5.1, 5.0],
  },
  {
    id: 10,
    name: "Sungai Martapura",
    loc: "Banjarmasin, Kalimantan Selatan",
    lat: -3.3199,
    lng: 114.5908,
    status: "sedang",
    ph: "6.1",
    suhu: "29",
    oksigen: "4.5",
    sampah: "Sedang",
    desc: "Tercemar moderat. Aktivitas pasar terapung mempengaruhi kualitas air.",
    reports: [
      {
        user: "@hendra_p",
        time: "2 jam lalu",
        desc: "Sampah dari pasar terapung menumpuk di bantaran.",
      },
    ],
    photos: ["🏪", "⚠️", "💧"],
    trendPH: [6.3, 6.2, 6.0, 6.1, 6.0, 6.2, 6.1],
  },
  {
    id: 11,
    name: "Sungai Brantas",
    loc: "Malang, Jawa Timur",
    lat: -7.9803,
    lng: 112.6304,
    status: "sedang",
    ph: "6.4",
    suhu: "25",
    oksigen: "5.0",
    sampah: "Sedang",
    desc: "Kondisi sedang. Aktif dipantau oleh komunitas mahasiswa setempat.",
    reports: [
      {
        user: "@dinda_r",
        time: "3 jam lalu",
        desc: "Ada kerukan tanah masuk sungai dari proyek jalan.",
      },
    ],
    photos: ["🌿", "💧", "📍"],
    trendPH: [6.6, 6.5, 6.3, 6.4, 6.5, 6.3, 6.4],
  },
  {
    id: 12,
    name: "Sungai Jeneberang",
    loc: "Makassar, Sulawesi Selatan",
    lat: -5.2148,
    lng: 119.412,
    status: "baik",
    ph: "7.2",
    suhu: "28",
    oksigen: "7.0",
    sampah: "Rendah",
    desc: "Kondisi baik. Bendungan Bili-Bili membantu menjaga kualitas air.",
    reports: [
      {
        user: "@aldi_m",
        time: "4 jam lalu",
        desc: "Air jernih dan arus stabil setelah musim kemarau.",
      },
    ],
    photos: ["✅", "🌊", "🌿"],
    trendPH: [7.0, 7.1, 7.2, 7.2, 7.1, 7.2, 7.2],
  },
  {
    id: 13,
    name: "Sungai Mahakam",
    loc: "Samarinda, Kalimantan Timur",
    lat: -0.5024,
    lng: 117.1536,
    status: "sedang",
    ph: "6.6",
    suhu: "28",
    oksigen: "5.5",
    sampah: "Sedang",
    desc: "Aktivitas tambang batu bara di hulu mempengaruhi kualitas air.",
    reports: [
      {
        user: "@surya_k",
        time: "5 jam lalu",
        desc: "Sedimen hitam dari tambang terlihat di sekitar pelabuhan.",
      },
    ],
    photos: ["⚫", "⚠️", "💧"],
    trendPH: [6.8, 6.7, 6.5, 6.6, 6.4, 6.6, 6.6],
  },
  {
    id: 14,
    name: "Sungai Asahan",
    loc: "Asahan, Sumatera Utara",
    lat: 2.5854,
    lng: 99.5723,
    status: "baik",
    ph: "7.3",
    suhu: "24",
    oksigen: "7.8",
    sampah: "Sangat Rendah",
    desc: "Kondisi sangat baik berkat kawasan hutan lindung di sekitarnya.",
    reports: [
      {
        user: "@rizal_h",
        time: "6 jam lalu",
        desc: "Air sangat jernih, bisa melihat dasar sungai.",
      },
    ],
    photos: ["🌿", "✅", "🐟"],
    trendPH: [7.2, 7.3, 7.4, 7.3, 7.2, 7.3, 7.3],
  },
  {
    id: 15,
    name: "Kali Grogol",
    loc: "Jakarta Barat, DKI Jakarta",
    lat: -6.1758,
    lng: 106.7804,
    status: "kritis",
    ph: "5.1",
    suhu: "30",
    oksigen: "2.7",
    sampah: "Tinggi",
    desc: "Tercemar berat oleh sampah dan limbah industri kecil.",
    reports: [
      {
        user: "@tino_w",
        time: "5 mnt lalu",
        desc: "Gunungan sampah menyumbat aliran di kolong tol.",
      },
      {
        user: "@lisa_p",
        time: "2 jam lalu",
        desc: "Banjir kecil akibat sumbatan sampah di gorong-gorong.",
      },
    ],
    photos: ["🚨", "🗑️", "🚫"],
    trendPH: [5.0, 5.2, 5.1, 5.1, 4.9, 5.1, 5.1],
  },
];

let mainMap = null;
let allMarkers = [];
let sdMiniChart = null;
let activeFilter = "all";

window.addEventListener("DOMContentLoaded", function () {
  initMap();
  updateInfoBar();
  updateStatPills();
  initSearch();
});

function initMap() {
  if (!document.getElementById("mainMap")) return;

  mainMap = L.map("mainMap", {
    zoomControl: false,
    attributionControl: true,
    scrollWheelZoom: true,
  }).setView([-2.5489, 118.0149], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(mainMap);

  setTimeout(function () {
    const loading = document.getElementById("mapLoading");
    if (loading) loading.classList.add("hidden");
  }, 1200);

  RIVER_DATA.forEach(function (river) {
    addMarker(river);
  });
}

function makeIcon(status) {
  const colors = { kritis: "#f04040", sedang: "#f5a623", baik: "#1dd68a" };
  const c = colors[status] || "#1dd68a";
  return L.divIcon({
    className: "",
    html: `<div style="
      width:16px; height:16px; border-radius:50%;
      background:${c}; border:2.5px solid #fff;
      box-shadow:0 0 10px ${c}90;
      transition:transform 0.2s;
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  });
}

function addMarker(river) {
  const marker = L.marker([river.lat, river.lng], {
    icon: makeIcon(river.status),
  }).addTo(mainMap);

  /* Popup singkat */
  const statusColor = { kritis: "#f04040", sedang: "#f5a623", baik: "#1dd68a" }[
    river.status
  ];
  marker.bindPopup(`
    <strong style="color:#1dd68a;font-size:14px">${river.name}</strong><br>
    <span style="color:#5a9a7a;font-size:11px">📍 ${river.loc}</span><br><br>
    <span style="color:#5a9a7a">Status:</span>
    <strong style="color:${statusColor}">
      ${river.status.charAt(0).toUpperCase() + river.status.slice(1)}
    </strong><br>
    <span style="color:#5a9a7a">pH Air:</span> <strong>${river.ph}</strong> &nbsp;
    <span style="color:#5a9a7a">Suhu:</span> <strong>${river.suhu}°C</strong><br>
    <span style="color:#5a9a7a">Sampah:</span> <strong>${river.sampah}</strong>
    <br><br>
    <span style="
      display:inline-block; background:#0e9c6a; color:#fff;
      padding:4px 12px; border-radius:6px; font-size:11px;
      cursor:pointer;" onclick="showSidebar(${river.id})">
      Lihat Detail Lengkap →
    </span>
  `);

  marker.on("click", function () {
    showSidebar(river.id);
  });

  allMarkers.push({ marker, river });
}

function showSidebar(riverId) {
  const river = RIVER_DATA.find(function (r) {
    return r.id === riverId;
  });
  if (!river) return;

  document.getElementById("sidebarEmpty").style.display = "none";
  document.getElementById("sidebarDetail").style.display = "block";

  document.getElementById("sdName").textContent = river.name;
  document.getElementById("sdLoc").innerHTML =
    '<i class="bi bi-geo-alt-fill"></i> ' + river.loc;
  document.getElementById("sdPH").textContent = river.ph;
  document.getElementById("sdSuhu").textContent = river.suhu + "°";
  document.getElementById("sdOksigen").textContent = river.oksigen;
  document.getElementById("sdSampah").textContent = river.sampah;

  const badge = document.getElementById("sdBadge");
  badge.textContent =
    river.status.charAt(0).toUpperCase() + river.status.slice(1);
  badge.className = "sd-badge " + river.status;

  const photosEl = document.getElementById("sdPhotos");
  photosEl.innerHTML = "";
  river.photos.forEach(function (emoji, i) {
    const div = document.createElement("div");
    div.className = "sd-photo sd-photo-" + (i + 1);
    div.innerHTML = emoji;
    photosEl.appendChild(div);
  });

  const reportsEl = document.getElementById("sdReports");
  reportsEl.innerHTML = "";
  river.reports.forEach(function (rep) {
    const div = document.createElement("div");
    div.className = "sd-report-item";
    div.innerHTML = `
      <div class="sd-report-top">
        <span class="sd-report-user">${rep.user}</span>
        <span class="sd-report-time">${rep.time}</span>
      </div>
      <div class="sd-report-desc">${rep.desc}</div>`;
    reportsEl.appendChild(div);
  });

  const ctx = document.getElementById("sdChart");
  if (sdMiniChart) sdMiniChart.destroy();
  sdMiniChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
      datasets: [
        {
          data: river.trendPH,
          borderColor:
            river.status === "baik"
              ? "#1dd68a"
              : river.status === "sedang"
                ? "#f5a623"
                : "#f04040",
          backgroundColor:
            river.status === "baik"
              ? "rgba(29,214,138,0.1)"
              : river.status === "sedang"
                ? "rgba(245,166,35,0.1)"
                : "rgba(240,64,64,0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor:
            river.status === "baik"
              ? "#1dd68a"
              : river.status === "sedang"
                ? "#f5a623"
                : "#f04040",
          pointBorderColor: "#042b20",
          pointBorderWidth: 1.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: "rgba(29,214,138,0.06)" },
          ticks: { color: "#5a9a7a", font: { family: "Outfit", size: 10 } },
        },
        y: {
          grid: { color: "rgba(29,214,138,0.06)" },
          ticks: { color: "#5a9a7a", font: { family: "Outfit", size: 10 } },
          min: 0,
          max: 14,
        },
      },
    },
  });

  mainMap.setView([river.lat, river.lng], 9, { animate: true });

  /* Scroll sidebar ke atas */
  document.getElementById("mapSidebar").scrollTop = 0;
}

window.applyFilter = function (status, btn) {
  activeFilter = status;
  document
    .querySelectorAll(".map-filter-group .map-filter-btn")
    .forEach(function (b) {
      if (["all", "kritis", "sedang", "baik"].includes(b.dataset.filter))
        b.classList.remove("active");
    });
  btn.classList.add("active");

  allMarkers.forEach(function ({ marker, river }) {
    if (status === "all" || river.status === status) {
      if (!mainMap.hasLayer(marker)) marker.addTo(mainMap);
    } else {
      if (mainMap.hasLayer(marker)) mainMap.removeLayer(marker);
    }
  });
};

window.applyTime = function (days, btn) {
  document.querySelectorAll(".map-filter-group").forEach(function (g) {
    g.querySelectorAll(".map-filter-btn:not([data-filter])").forEach(
      function (b) {
        b.classList.remove("active");
      },
    );
  });
  btn.classList.add("active");
};

/* ─── TOGGLE HEATMAP ─── */
let heatLayer = null;
window.toggleHeatmap = function (checkbox) {
  if (checkbox.checked) {
    heatLayer = L.layerGroup();
    RIVER_DATA.forEach(function (river) {
      if (river.status === "kritis") {
        L.circle([river.lat, river.lng], {
          radius: 80000,
          color: "transparent",
          fillColor: "#f04040",
          fillOpacity: 0.18,
        }).addTo(heatLayer);
      } else if (river.status === "sedang") {
        L.circle([river.lat, river.lng], {
          radius: 50000,
          color: "transparent",
          fillColor: "#f5a623",
          fillOpacity: 0.12,
        }).addTo(heatLayer);
      }
    });
    heatLayer.addTo(mainMap);
  } else {
    if (heatLayer) {
      mainMap.removeLayer(heatLayer);
      heatLayer = null;
    }
  }
};

window.toggleCluster = function (checkbox) {};

function initSearch() {
  const input = document.getElementById("mapSearch");
  const clear = document.getElementById("searchClear");
  if (!input) return;

  input.addEventListener("input", function () {
    const q = input.value.trim().toLowerCase();
    clear.style.display = q ? "block" : "none";

    if (!q) {
      allMarkers.forEach(function ({ marker }) {
        if (!mainMap.hasLayer(marker)) marker.addTo(mainMap);
      });
      return;
    }

    let found = null;
    allMarkers.forEach(function ({ marker, river }) {
      const match =
        river.name.toLowerCase().includes(q) ||
        river.loc.toLowerCase().includes(q);
      if (match) {
        if (!mainMap.hasLayer(marker)) marker.addTo(mainMap);
        if (!found) found = river;
      } else {
        if (mainMap.hasLayer(marker)) mainMap.removeLayer(marker);
      }
    });

    if (found) {
      mainMap.setView([found.lat, found.lng], 9, { animate: true });
    }
  });

  clear.addEventListener("click", function () {
    input.value = "";
    clear.style.display = "none";
    allMarkers.forEach(function ({ marker }) {
      if (!mainMap.hasLayer(marker)) marker.addTo(mainMap);
    });
  });
}

/* ─── ZOOM CUSTOM ─── */
window.mapZoomIn = function () {
  if (mainMap) mainMap.zoomIn();
};
window.mapZoomOut = function () {
  if (mainMap) mainMap.zoomOut();
};
window.mapReset = function () {
  if (mainMap) mainMap.setView([-2.5489, 118.0149], 5, { animate: true });
};

/* ─── INFO BAR & STAT PILLS ─── */
function updateInfoBar() {
  const total = RIVER_DATA.length;
  const kritis = RIVER_DATA.filter(function (r) {
    return r.status === "kritis";
  }).length;
  const sedang = RIVER_DATA.filter(function (r) {
    return r.status === "sedang";
  }).length;
  const baik = RIVER_DATA.filter(function (r) {
    return r.status === "baik";
  }).length;

  setText("ibTotal", total);
  setText("ibKritis", kritis);
  setText("ibSedang", sedang);
  setText("ibBaik", baik);
}

function updateStatPills() {
  const kritis = RIVER_DATA.filter(function (r) {
    return r.status === "kritis";
  }).length;
  const sedang = RIVER_DATA.filter(function (r) {
    return r.status === "sedang";
  }).length;
  const baik = RIVER_DATA.filter(function (r) {
    return r.status === "baik";
  }).length;

  setText("countKritis", kritis);
  setText("countSedang", sedang);
  setText("countBaik", baik);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
