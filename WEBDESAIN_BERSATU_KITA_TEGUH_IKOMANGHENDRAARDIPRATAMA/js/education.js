var revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach(function (el) {
  revealObserver.observe(el);
});

(function () {
  var slider = document.getElementById("baSlider");
  var clip = document.getElementById("baAfterClip");
  var line = document.getElementById("baLine");
  var handle = document.getElementById("baHandle");
  var inner = document.getElementById("baAfterInner");
  var title = document.getElementById("baTitle");
  var before = document.getElementById("baBefore");
  var dragging = false;

  function setInnerWidth() {
    if (inner) inner.style.width = slider.offsetWidth + "px";
  }
  setInnerWidth();
  window.addEventListener("resize", setInnerWidth);

  function setPos(pct) {
    pct = Math.max(5, Math.min(95, pct));
    clip.style.width = pct + "%";
    line.style.left = pct + "%";
    handle.style.left = pct + "%";
  }
  setPos(50);

  function getX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  slider.addEventListener("mousedown", function (e) {
    dragging = true;
  });
  slider.addEventListener(
    "touchstart",
    function (e) {
      dragging = true;
    },
    { passive: true },
  );

  window.addEventListener("mousemove", function (e) {
    if (!dragging) return;
    var rect = slider.getBoundingClientRect();
    var pct = ((getX(e) - rect.left) / rect.width) * 100;
    setPos(pct);
  });
  window.addEventListener(
    "touchmove",
    function (e) {
      if (!dragging) return;
      var rect = slider.getBoundingClientRect();
      var pct = ((getX(e) - rect.left) / rect.width) * 100;
      setPos(pct);
    },
    { passive: true },
  );
  window.addEventListener("mouseup", function () {
    dragging = false;
  });
  window.addEventListener("touchend", function () {
    dragging = false;
  });

  document.querySelectorAll(".ba-thumb").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      document.querySelectorAll(".ba-thumb").forEach(function (t) {
        t.classList.remove("on");
      });
      thumb.classList.add("on");

      var bImg = thumb.getAttribute("data-before-img");
      var aImg = thumb.getAttribute("data-after-img");
      var t = thumb.getAttribute("data-title");

      var beforeImg = document.querySelector("#baBefore img");
      if (beforeImg && bImg) beforeImg.src = bImg;

      var afterImg = document.querySelector("#baAfterClip img");
      if (afterImg && aImg) afterImg.src = aImg;

      if (t && title) title.textContent = t;

      setPos(50);
    });
  });
})();

var BOBOT = {
  botol: 0.03,
  kantong: 0.008,
  styro: 0.012,
  rokok: 0.0003,
  pctSungai: 0.3,
  mikro: 3500,
};

function hitungDampak() {
  var botol = parseInt(document.getElementById("slBotol").value);
  var kantong = parseInt(document.getElementById("slKantong").value);
  var styro = parseInt(document.getElementById("slStyro").value);
  var rokok = parseInt(document.getElementById("slRokok").value);

  document.getElementById("valBotol").textContent = botol + " botol";
  document.getElementById("valKantong").textContent = kantong + " kantong";
  document.getElementById("valStyro").textContent = styro + " bungkus";
  document.getElementById("valRokok").textContent = rokok + " batang";

  updateRange("slBotol", botol, 10);
  updateRange("slKantong", kantong, 20);
  updateRange("slStyro", styro, 14);
  updateRange("slRokok", rokok, 30);

  var totalKg =
    botol * BOBOT.botol * 365 +
    kantong * BOBOT.kantong * 52 +
    styro * BOBOT.styro * 52 +
    rokok * BOBOT.rokok * 365;
  var keSungai = totalKg * BOBOT.pctSungai;
  var mikro = keSungai * BOBOT.mikro;
  var botolEq = Math.round(keSungai / BOBOT.botol);

  setText(
    "resTotalKg",
    totalKg.toFixed(1) + " kg / tahun",
    totalKg > 20 ? "val-bad" : totalKg > 8 ? "val-ok" : "val-good",
  );
  setText(
    "resSungai",
    keSungai.toFixed(1) + " kg / tahun",
    keSungai > 5 ? "val-bad" : keSungai > 2 ? "val-ok" : "val-good",
  );
  setText(
    "resMikro",
    Math.round(mikro).toLocaleString("id") + " partikel",
    mikro > 10000 ? "val-bad" : mikro > 5000 ? "val-ok" : "val-good",
  );
  setText(
    "resBotolEq",
    botolEq + " botol setara",
    botolEq > 100 ? "val-bad" : botolEq > 50 ? "val-ok" : "val-good",
  );

  var statusEl = document.getElementById("calcStatus");
  if (totalKg > 20) {
    statusEl.style.cssText =
      "background:rgba(240,64,64,.1);border-color:rgba(240,64,64,.2);color:#f04040";
    statusEl.innerHTML =
      '<i class="bi bi-exclamation-triangle-fill"></i> Perlu perbaikan serius — dampakmu sangat tinggi!';
  } else if (totalKg > 8) {
    statusEl.style.cssText =
      "background:rgba(245,166,35,.1);border-color:rgba(245,166,35,.2);color:#f5a623";
    statusEl.innerHTML =
      '<i class="bi bi-exclamation-circle-fill"></i> Cukup baik, tapi masih bisa dikurangi lagi';
  } else if (totalKg > 0) {
    statusEl.style.cssText =
      "background:rgba(29,214,138,.1);border-color:rgba(29,214,138,.2);color:#1dd68a";
    statusEl.innerHTML =
      '<i class="bi bi-check-circle-fill"></i> Bagus! Kamu sudah peduli lingkungan 🌿';
  } else {
    statusEl.style.cssText =
      "background:rgba(29,214,138,.15);border-color:rgba(29,214,138,.3);color:#1dd68a";
    statusEl.innerHTML =
      '<i class="bi bi-stars"></i> Luar biasa! Zero plastik — pahlawan sungai sejati!';
  }
}

function setText(id, val, cls) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = val;
  el.className = "calc-result-val " + (cls || "val-good");
}

function updateRange(id, val, max) {
  var el = document.getElementById(id);
  if (!el) return;
  var pct = (val / max) * 100;
  var warna = pct > 70 ? "#f04040" : pct > 40 ? "#f5a623" : "#1dd68a";
  el.style.background =
    "linear-gradient(to right," +
    warna +
    " 0%," +
    warna +
    " " +
    pct +
    "%,rgba(29,214,138,.1) " +
    pct +
    "%,rgba(29,214,138,.1) 100%)";
}

hitungDampak();

function filterArtikel(kat, btn) {
  document.querySelectorAll(".art-filter-btn").forEach(function (b) {
    b.classList.remove("on");
  });
  btn.classList.add("on");

  document.querySelectorAll(".art-card").forEach(function (card) {
    var show = kat === "semua" || card.getAttribute("data-kategori") === kat;
    card.style.display = show ? "" : "none";
  });
}

function searchArtikel(q) {
  q = q.toLowerCase();
  document.querySelectorAll(".art-card").forEach(function (card) {
    var teks = card.querySelector(".art-card-title").textContent.toLowerCase();
    card.style.display = teks.includes(q) ? "" : "none";
  });
}

var TOTAL_SOAL = 5;
var soalAktif = 1;
var jawaban = {};
var quizSelesai = false;
var timerInterval = null;
var waktuDetik = 600;
var waktuMulai = Date.now();

function buildDots() {
  var container = document.getElementById("quizDots");
  container.innerHTML = "";
  for (var i = 1; i <= TOTAL_SOAL; i++) {
    var dot = document.createElement("div");
    dot.className =
      "qdot" +
      (i === soalAktif ? " on" : jawaban[i] !== undefined ? " done" : "");
    dot.setAttribute("data-soal", i);
    container.appendChild(dot);
  }
}
buildDots();

function mulaiTimer() {
  waktuMulai = Date.now();
  timerInterval = setInterval(function () {
    waktuDetik--;
    if (waktuDetik <= 0) {
      clearInterval(timerInterval);
      selesaiQuiz();
      return;
    }
    var m = Math.floor(waktuDetik / 60);
    var s = waktuDetik % 60;
    var el = document.getElementById("quizTimer");
    if (el)
      el.textContent =
        "⏱ " + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;

    if (waktuDetik <= 60 && el) el.style.color = "#f04040";
  }, 1000);
}
mulaiTimer();

function pilihJawaban(soal, pilihan, el) {
  if (jawaban[soal] !== undefined) return;
  var correct = parseInt(
    document.getElementById("q" + soal).getAttribute("data-correct"),
  );
  var benar = pilihan === correct;
  jawaban[soal] = benar;

  var opts = document.querySelectorAll("#opts" + soal + " .quiz-opt");
  opts.forEach(function (opt, i) {
    if (i === correct) opt.classList.add("correct");
    else if (i === pilihan && !benar) opt.classList.add("wrong");
    opt.style.pointerEvents = "none";
  });

  var exp = document.getElementById("exp" + soal);
  if (exp) {
    var bText = benar
      ? document.getElementById("exp" + soal).textContent
      : "❌ Kurang tepat. " +
        document
          .getElementById("exp" + soal)
          .textContent.replace("✅ Benar! ", "");
    exp.innerHTML = bText;
    exp.classList.add("on");
  }

  var done = Object.keys(jawaban).length;
  var fill = document.getElementById("quizProgressFill");
  if (fill) fill.style.width = (done / TOTAL_SOAL) * 100 + "%";

  var jumlahBenar = Object.values(jawaban).filter(Boolean).length;
  var sub = document.getElementById("quizSubtitle");
  if (sub)
    sub.textContent =
      "Soal " + soalAktif + " dari " + TOTAL_SOAL + " · Benar: " + jumlahBenar;

  buildDots();
}

function nextSoal() {
  if (soalAktif >= TOTAL_SOAL) {
    selesaiQuiz();
    return;
  }
  document.getElementById("q" + soalAktif).classList.remove("on");
  soalAktif++;
  document.getElementById("q" + soalAktif).classList.add("on");

  var btn = document.getElementById("quizNextBtn");
  if (btn)
    btn.textContent = soalAktif === TOTAL_SOAL ? "Selesai ✓" : "Selanjutnya →";
  buildDots();
}

function lewatiSoal() {
  nextSoal();
}

function selesaiQuiz() {
  clearInterval(timerInterval);
  quizSelesai = true;
  var jumlahBenar = Object.values(jawaban).filter(Boolean).length;
  var skor = Math.round((jumlahBenar / TOTAL_SOAL) * 100);
  var waktu = Math.round((Date.now() - waktuMulai) / 1000);
  var mnt = Math.floor(waktu / 60);
  var dtk = waktu % 60;

  for (var i = 1; i <= TOTAL_SOAL; i++) {
    var el = document.getElementById("q" + i);
    if (el) el.classList.remove("on");
  }
  document.getElementById("quizNav").style.display = "none";

  var res = document.getElementById("quizResult");
  res.classList.add("on");

  var warna = skor >= 70 ? "#1dd68a" : skor >= 50 ? "#f5a623" : "#f04040";
  setTimeout(function () {
    var ring = document.getElementById("resultRing");
    if (ring) {
      ring.setAttribute("stroke", warna);
      ring.setAttribute("stroke-dasharray", (skor / 100) * 264 + " 264");
    }
    var angka = document.getElementById("resultAngka");
    if (angka) {
      angka.textContent = skor;
      angka.setAttribute("fill", warna);
    }
  }, 200);

  var title =
    skor >= 70
      ? "🎉 Selamat, Kamu Lulus!"
      : skor >= 50
        ? "👍 Hampir! Coba Lagi"
        : "💪 Terus Belajar!";
  var sub =
    skor >= 70
      ? "Skor kamu " + skor + "/100. Sertifikat digital kamu sudah siap!"
      : "Skor kamu " + skor + "/100. Minimal 70 untuk mendapatkan sertifikat.";
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultSub").textContent = sub;
  document.getElementById("resBenar").textContent = jumlahBenar;
  document.getElementById("resSalah").textContent = TOTAL_SOAL - jumlahBenar;
  document.getElementById("resWaktu").textContent =
    mnt + ":" + (dtk < 10 ? "0" : "") + dtk;

  var fill = document.getElementById("quizProgressFill");
  if (fill) fill.style.width = "100%";
}

function resetQuiz() {
  jawaban = {};
  soalAktif = 1;
  quizSelesai = false;
  waktuDetik = 600;
  for (var i = 1; i <= TOTAL_SOAL; i++) {
    var step = document.getElementById("q" + i);
    if (step) {
      step.classList.remove("on");
      var opts = step.querySelectorAll(".quiz-opt");
      opts.forEach(function (o) {
        o.className = "quiz-opt";
        o.style.pointerEvents = "";
      });
      var exp = step.querySelector(".quiz-explanation");
      if (exp) exp.classList.remove("on");
    }
  }
  document.getElementById("q1").classList.add("on");
  document.getElementById("quizResult").classList.remove("on");
  document.getElementById("quizNav").style.display = "";
  document.getElementById("quizNextBtn").textContent = "Selanjutnya →";
  document.getElementById("quizProgressFill").style.width = "0%";
  document.getElementById("quizTimer").textContent = "⏱ 10:00";
  document.getElementById("quizTimer").style.color = "";
  buildDots();
  clearInterval(timerInterval);
  mulaiTimer();
}

function downloadSertifikat() {
  alert(
    "Sertifikat dalam format PDF akan tersedia setelah kamu menyelesaikan quiz dengan skor ≥ 70!",
  );
}

var sections = [
  "fotoSection",
  "beforeAfter",
  "calculator",
  "articles",
  "quiz",
  "certificate",
];
var tabs = document.querySelectorAll(".edu-htab");
window.addEventListener("scroll", function () {
  var scrollY = window.scrollY + 120;
  sections.forEach(function (id, i) {
    var el = document.getElementById(id);
    if (!el || !tabs[i]) return;
    if (el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
      tabs.forEach(function (t) {
        t.classList.remove("on");
      });
      tabs[i].classList.add("on");
    }
  });
});
