const SUNGAI_DATA = [
  {
    name: "Sungai Ciliwung",
    loc: "Jakarta Timur, DKI",
    status: "kritis",
    ph: 5.2,
    score: 82,
    relawan: 142,
    time: "2 mnt lalu",
  },
  {
    name: "Sungai Citarum",
    loc: "Bandung, Jawa Barat",
    status: "kritis",
    ph: 4.8,
    score: 91,
    relawan: 210,
    time: "15 mnt lalu",
  },
  {
    name: "Tukad Badung",
    loc: "Denpasar, Bali",
    status: "kritis",
    ph: 5.0,
    score: 79,
    relawan: 88,
    time: "10 mnt lalu",
  },
  {
    name: "Kali Grogol",
    loc: "Jakarta Barat, DKI",
    status: "kritis",
    ph: 5.1,
    score: 77,
    relawan: 63,
    time: "5 mnt lalu",
  },
  {
    name: "Sungai Deli",
    loc: "Medan, Sumatera Utara",
    status: "kritis",
    ph: 5.5,
    score: 68,
    relawan: 71,
    time: "1 jam lalu",
  },
  {
    name: "Kali Surabaya",
    loc: "Surabaya, Jawa Timur",
    status: "sedang",
    ph: 6.4,
    score: 48,
    relawan: 95,
    time: "30 mnt lalu",
  },
  {
    name: "Bengawan Solo",
    loc: "Solo, Jawa Tengah",
    status: "sedang",
    ph: 6.5,
    score: 44,
    relawan: 120,
    time: "20 mnt lalu",
  },
  {
    name: "Sungai Martapura",
    loc: "Banjarmasin, Kalsel",
    status: "sedang",
    ph: 6.1,
    score: 56,
    relawan: 44,
    time: "2 jam lalu",
  },
  {
    name: "Sungai Brantas",
    loc: "Malang, Jawa Timur",
    status: "sedang",
    ph: 6.4,
    score: 47,
    relawan: 88,
    time: "3 jam lalu",
  },
  {
    name: "Sungai Mahakam",
    loc: "Samarinda, Kaltim",
    status: "sedang",
    ph: 6.6,
    score: 41,
    relawan: 52,
    time: "5 jam lalu",
  },
  {
    name: "Sungai Code",
    loc: "Yogyakarta, DIY",
    status: "baik",
    ph: 7.1,
    score: 18,
    relawan: 76,
    time: "1 jam lalu",
  },
  {
    name: "Sungai Kapuas",
    loc: "Pontianak, Kalbar",
    status: "baik",
    ph: 7.0,
    score: 21,
    relawan: 38,
    time: "45 mnt lalu",
  },
  {
    name: "Sungai Musi",
    loc: "Palembang, Sumsel",
    status: "baik",
    ph: 6.9,
    score: 24,
    relawan: 62,
    time: "2 jam lalu",
  },
  {
    name: "Sungai Jeneberang",
    loc: "Makassar, Sulawesi Sel",
    status: "baik",
    ph: 7.2,
    score: 15,
    relawan: 49,
    time: "4 jam lalu",
  },
  {
    name: "Sungai Asahan",
    loc: "Asahan, Sumatera Utara",
    status: "baik",
    ph: 7.3,
    score: 11,
    relawan: 33,
    time: "6 jam lalu",
  },
];

const BAR_DATA = [
  { name: "Citarum", loc: "Bandung", score: 91, status: "kritis" },
  { name: "Ciliwung", loc: "Jakarta", score: 82, status: "kritis" },
  { name: "Tukad Badung", loc: "Denpasar", score: 79, status: "kritis" },
  { name: "Kali Grogol", loc: "Jakarta", score: 77, status: "kritis" },
  { name: "Sungai Deli", loc: "Medan", score: 68, status: "kritis" },
  { name: "Martapura", loc: "Banjarmasin", score: 56, status: "sedang" },
  { name: "Kali Surabaya", loc: "Surabaya", score: 48, status: "sedang" },
  { name: "Brantas", loc: "Malang", score: 47, status: "sedang" },
  { name: "Mahakam", loc: "Samarinda", score: 41, status: "sedang" },
  { name: "Bengawan Solo", loc: "Solo", score: 44, status: "sedang" },
];

let tableFilter = "all";
let tableSortKey = "score";
let tableSortAsc = false;
let tablePage = 1;
const PER_PAGE = 7;

document.addEventListener("DOMContentLoaded", function () {
  initKPICounters();
  initLineChart();
  initDonutChart();
  initBarChart();
  renderTable();
  initClock();
  initReveal();
});

function initKPICounters() {
  animCounter("kpi1", 2847, "", 1200);
  animCounter("kpi2", 6, "", 600);
  animCounter("kpi3", 6291, "", 1200);

  setTimeout(function () {
    document.getElementById("kpi4").textContent = "48 Ton";
  }, 300);

  setTimeout(function () {
    animBar("kbar1", 76);
    animBar("kbar2", 40);
    animBar("kbar3", 89);
    animBar("kbar4", 60);
  }, 400);
}

function animCounter(elId, target, suffix, dur) {
  const el = document.getElementById(elId);
  if (!el) return;
  const step = Math.max(1, Math.ceil(target / 70));
  let cur = 0;
  const t = setInterval(function () {
    cur = Math.min(cur + step, target);
    el.textContent = cur.toLocaleString("id-ID") + (suffix || "");
    if (cur >= target) clearInterval(t);
  }, dur / 70);
}

function animBar(elId, pct) {
  const el = document.getElementById(elId);
  if (el)
    setTimeout(function () {
      el.style.width = pct + "%";
    }, 100);
}

let lineChart = null;

function genLabels(n) {
  const labels = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);

    labels.push(
      d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
    );
  }
  return labels;
}

function genData(n, base, noise) {
  return Array.from({ length: n }, (_, i) =>
    Math.round(
      base + Math.sin(i * 0.38) * noise + (Math.random() - 0.5) * noise * 0.45,
    ),
  );
}

function initLineChart() {
  const ctx = document.getElementById("lineChart");
  if (!ctx || typeof Chart === "undefined") return;

  lineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: genLabels(7),
      datasets: [
        {
          label: "Kualitas Air",
          data: genData(7, 65, 12),
          borderColor: "#1dd68a",
          backgroundColor: "rgba(29,214,138,.07)",
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#1dd68a",
          pointBorderColor: "#021a14",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
        },
        {
          label: "Pencemaran",
          data: genData(7, 40, 14),
          borderColor: "#f04040",
          backgroundColor: "rgba(240,64,64,.05)",
          borderDash: [5, 3],
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#f04040",
          pointBorderColor: "#021a14",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1000, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(4,43,32,.95)",
          borderColor: "rgba(29,214,138,.25)",
          borderWidth: 1,
          titleColor: "#1dd68a",
          bodyColor: "#cceedd",
          padding: 10,
          titleFont: { family: "Space Mono", size: 11 },
          bodyFont: { family: "Outfit", size: 12 },
          callbacks: {
            label: function (ctx) {
              return " " + ctx.dataset.label + ": " + ctx.parsed.y + " poin";
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(29,214,138,.05)" },
          ticks: { color: "#5a9a7a", font: { family: "Outfit", size: 11 } },
        },
        y: {
          grid: { color: "rgba(29,214,138,.05)" },
          ticks: { color: "#5a9a7a", font: { family: "Outfit", size: 11 } },
          min: 0,
          max: 100,
        },
      },
    },
  });
}

function updateChart(days, btn) {
  document
    .querySelectorAll("#chartTabs .db-ct")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  if (!lineChart) return;
  lineChart.data.labels = genLabels(days);
  lineChart.data.datasets[0].data = genData(days, 65, 12);
  lineChart.data.datasets[1].data = genData(days, 40, 14);
  lineChart.update("active");
}

function initDonutChart() {
  const ctx = document.getElementById("donutChart");
  if (!ctx || typeof Chart === "undefined") return;

  const kritis = SUNGAI_DATA.filter((r) => r.status === "kritis").length;
  const sedang = SUNGAI_DATA.filter((r) => r.status === "sedang").length;
  const baik = SUNGAI_DATA.filter((r) => r.status === "baik").length;

  setText("dk", kritis);
  setText("ds", sedang);
  setText("db2", baik);

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Kritis", "Sedang", "Baik"],
      datasets: [
        {
          data: [kritis, sedang, baik],
          backgroundColor: ["#f04040", "#f5a623", "#1dd68a"],
          borderColor: "#031f18",
          borderWidth: 3,
          hoverBorderWidth: 2,
        },
      ],
    },
    options: {
      cutout: "68%",
      animation: { duration: 1200, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(4,43,32,.95)",
          borderColor: "rgba(29,214,138,.25)",
          borderWidth: 1,
          titleColor: "#1dd68a",
          bodyColor: "#cceedd",
          padding: 8,
          titleFont: { family: "Outfit", size: 12 },
          bodyFont: { family: "Outfit", size: 12 },
        },
      },
    },
  });
}

let barDescending = true;

function initBarChart() {
  renderBarChart(BAR_DATA.slice());
}

function renderBarChart(data) {
  const container = document.getElementById("barList");
  if (!container) return;
  container.innerHTML = "";

  data.forEach(function (d, i) {
    const warna = getWarna(d.status);
    const row = document.createElement("div");
    row.className = "db-bar-row";
    row.innerHTML = `
      <div class="db-bar-rank">${i + 1}</div>
      <div class="db-bar-name" title="${d.name}">${d.name}</div>
      <div class="db-bar-loc">${d.loc}</div>
      <div class="db-bar-track">
        <div class="db-bar-fill" id="bfill${i}"
          style="width:0%;background:${warna}"></div>
      </div>
      <div class="db-bar-score" style="color:${warna}">${d.score}</div>`;
    container.appendChild(row);

    setTimeout(
      function () {
        const fill = document.getElementById("bfill" + i);
        if (fill) fill.style.width = d.score + "%";
      },
      200 + i * 60,
    );
  });
}

function sortBar(dir, btn) {
  document
    .querySelectorAll(".db-sort-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  barDescending = dir === "desc";
  const sorted = [...BAR_DATA].sort((a, b) =>
    barDescending ? b.score - a.score : a.score - b.score,
  );
  renderBarChart(sorted);
}

function setTableFilter(f, btn) {
  tableFilter = f;
  tablePage = 1;
  document
    .querySelectorAll(".db-tbl-filters .db-tf-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderTable();
}

function filterTable() {
  tablePage = 1;
  renderTable();
}

function sortTable(key) {
  if (tableSortKey === key) tableSortAsc = !tableSortAsc;
  else {
    tableSortKey = key;
    tableSortAsc = true;
  }
  renderTable();
}

function setTimeFilter(days, btn) {
  document
    .querySelectorAll(".db-time-filter .db-tf-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

function renderTable() {
  const q = (document.getElementById("tableSearch")?.value || "")
    .toLowerCase()
    .trim();

  let filtered = SUNGAI_DATA.filter(function (r) {
    const matchQ =
      !q || r.name.toLowerCase().includes(q) || r.loc.toLowerCase().includes(q);
    const matchF = tableFilter === "all" || r.status === tableFilter;
    return matchQ && matchF;
  });

  filtered.sort(function (a, b) {
    let av = a[tableSortKey];
    let bv = b[tableSortKey];
    if (typeof av === "string")
      return tableSortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    return tableSortAsc ? av - bv : bv - av;
  });

  const total = filtered.length;
  const totalPage = Math.ceil(total / PER_PAGE) || 1;
  if (tablePage > totalPage) tablePage = totalPage;
  const start = (tablePage - 1) * PER_PAGE;
  const rows = filtered.slice(start, start + PER_PAGE);

  const tbody = document.getElementById("tableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  rows.forEach(function (r) {
    const warna = getWarna(r.status);
    const badgeCls = "td-badge td-" + r.status;
    const label = r.status.charAt(0).toUpperCase() + r.status.slice(1);
    const phPct = Math.round((r.ph / 14) * 100);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="td-name">${r.name}</td>
      <td>${r.loc}</td>
      <td><span class="${badgeCls}">${label}</span></td>
      <td>
        <div class="td-ph-wrap">
          <div class="td-ph-bar">
            <div class="td-ph-fill" style="width:${phPct}%;background:${warna}"></div>
          </div>
          ${r.ph}
        </div>
      </td>
      <td>
        <div class="td-score-wrap">
          <div class="td-score-bar">
            <div class="td-score-fill" style="width:${r.score}%;background:${warna}"></div>
          </div>
          <span style="color:${warna};font-weight:600">${r.score}</span>
        </div>
      </td>
      <td>${r.relawan} orang</td>
      <td>${r.time}</td>`;
    tbody.appendChild(tr);
  });

  setText("tblInfo", `Menampilkan ${rows.length} dari ${total} laporan`);
  setText("tableInfo", `Menampilkan ${rows.length} dari ${total} laporan`);

  renderPagination(totalPage);
}

function renderPagination(totalPage) {
  const pg = document.getElementById("pagination");
  if (!pg) return;
  pg.innerHTML = "";

  if (totalPage > 1) {
    const prev = makePgBtn('<i class="bi bi-chevron-left"></i>', tablePage > 1);
    prev.onclick = function () {
      if (tablePage > 1) {
        tablePage--;
        renderTable();
      }
    };
    pg.appendChild(prev);
  }

  for (let i = 1; i <= totalPage; i++) {
    const btn = makePgBtn(i, true);
    if (i === tablePage) btn.classList.add("active");
    btn.onclick = (function (p) {
      return function () {
        tablePage = p;
        renderTable();
      };
    })(i);
    pg.appendChild(btn);
  }

  if (totalPage > 1) {
    const next = makePgBtn(
      '<i class="bi bi-chevron-right"></i>',
      tablePage < totalPage,
    );
    next.onclick = function () {
      if (tablePage < totalPage) {
        tablePage++;
        renderTable();
      }
    };
    pg.appendChild(next);
  }
}

function makePgBtn(content, enabled) {
  const btn = document.createElement("button");
  btn.className = "db-page-btn";
  btn.innerHTML = String(content);
  if (!enabled) btn.disabled = true;
  return btn;
}

function exportCSV() {
  const headers = [
    "Nama Sungai",
    "Lokasi",
    "Status",
    "pH Air",
    "Skor Pencemaran",
    "Relawan",
    "Laporan Terakhir",
  ];
  const rows = SUNGAI_DATA.map(function (r) {
    return [
      '"' + r.name + '"',
      '"' + r.loc + '"',
      r.status,
      r.ph,
      r.score,
      r.relawan,
      '"' + r.time + '"',
    ].join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =
    "riverwatch-data-" + new Date().toISOString().slice(0, 10) + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const isOpen = sidebar.classList.toggle("open");
  overlay.classList.toggle("on", isOpen);

  const icon = document.querySelector(".db-hamburger i");
  if (icon) icon.className = isOpen ? "bi bi-x-lg" : "bi bi-list";
}

function closeSidebar() {
  document.getElementById("sidebar")?.classList.remove("open");
  document.getElementById("overlay")?.classList.remove("on");
  const icon = document.querySelector(".db-hamburger i");
  if (icon) icon.className = "bi bi-list";
}

window.addEventListener("resize", function () {
  if (window.innerWidth > 820) closeSidebar();
});

function initClock() {
  function tick() {
    const now = new Date();
    const jam = String(now.getHours()).padStart(2, "0");
    const mnt = String(now.getMinutes()).padStart(2, "0");
    const dtk = String(now.getSeconds()).padStart(2, "0");
    const el = document.getElementById("sidebarTime");
    if (el) el.textContent = jam + ":" + mnt + ":" + dtk;
  }
  tick();
  setInterval(tick, 1000);
}

function initReveal() {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.08 },
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });
}

function getWarna(status) {
  if (status === "kritis") return "#f04040";
  if (status === "sedang") return "#f5a623";
  return "#1dd68a";
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
