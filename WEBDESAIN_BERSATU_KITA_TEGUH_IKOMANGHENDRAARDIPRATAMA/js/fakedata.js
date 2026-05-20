window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 40);
});

const phrases = [
  "Platform pelaporan sungai berbasis komunitas.",
  "Laporkan, pantau, dan selamatkan sungai kita.",
  "Teknologi hijau untuk masa depan berkelanjutan.",
  "Bersama kita jaga air bersih Indonesia.",
];
let pi = 0,
  ci = 0,
  deleting = false;
function type() {
  const txt = phrases[pi];
  document.getElementById("typingText").textContent = deleting
    ? txt.substring(0, ci--)
    : txt.substring(0, ci++);
  let delay = deleting ? 40 : 55;
  if (!deleting && ci === txt.length + 1) {
    delay = 2000;
    deleting = true;
  } else if (deleting && ci === 0) {
    deleting = false;
    pi = (pi + 1) % phrases.length;
    delay = 300;
  }
  setTimeout(type, delay);
}
setTimeout(type, 800);

function animateCounter(el, target, suffix) {
  let cur = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur.toLocaleString("id") + (suffix || "");
    if (cur >= target) clearInterval(timer);
  }, 25);
}
setTimeout(() => {
  animateCounter(document.getElementById("c1"), 2847, "");
  animateCounter(document.getElementById("c2"), 134, "");
  animateCounter(document.getElementById("c3"), 6291, "");
  animateCounter(document.getElementById("c4"), 48, " Ton");
}, 600);

const feedData = [
  {
    name: "Sungai Ciliwung",
    loc: "Condet, Jakarta Timur",
    status: "kritis",
    icon: '<i class="bi bi-exclamation-triangle-fill" style="color:#f04040;font-size:18px"></i>',
    time: "baru saja",
    user: "@andi_r",
    desc: "Air hitam berbau, banyak sampah plastik",
  },
  {
    name: "Kali Malang",
    loc: "Bekasi Barat, Jawa Barat",
    status: "sedang",
    icon: '<i class="bi bi-exclamation-circle-fill" style="color:#f5a623;font-size:18px"></i>',
    time: "5 mnt lalu",
    user: "@siti_m",
    desc: "Warna air keruh kecoklatan",
  },
  {
    name: "Sungai Brantas",
    loc: "Malang, Jawa Timur",
    status: "baik",
    icon: '<i class="bi bi-check-circle-fill" style="color:#1dd68a;font-size:18px"></i>',
    time: "12 mnt lalu",
    user: "@deni_p",
    desc: "Air jernih, kondisi normal",
  },
  {
    name: "Kali Surabaya",
    loc: "Surabaya, Jawa Timur",
    status: "kritis",
    icon: '<i class="bi bi-exclamation-triangle-fill" style="color:#f04040;font-size:18px"></i>',
    time: "18 mnt lalu",
    user: "@rini_s",
    desc: "Busa tebal di permukaan air",
  },
  {
    name: "Sungai Musi",
    loc: "Palembang, Sumatera Selatan",
    status: "sedang",
    icon: '<i class="bi bi-exclamation-circle-fill" style="color:#f5a623;font-size:18px"></i>',
    time: "25 mnt lalu",
    user: "@budi_w",
    desc: "Sampah menumpuk di tepi sungai",
  },
  {
    name: "Sungai Kapuas",
    loc: "Pontianak, Kalimantan Barat",
    status: "baik",
    icon: '<i class="bi bi-check-circle-fill" style="color:#1dd68a;font-size:18px"></i>',
    time: "33 mnt lalu",
    user: "@maya_k",
    desc: "Kondisi baik, air cukup jernih",
  },
];
let feedCount = 0;
function renderFeed(data, prepend = false) {
  const list = document.getElementById("feedList");
  const item = document.createElement("div");
  item.className = "rw-feed-item" + (prepend ? " new" : "");
  item.innerHTML = `
    <div class="rw-feed-thumb ${data.status}">${data.icon}</div>
    <div class="rw-feed-body">
      <div class="rw-feed-top">
        <div class="rw-feed-name">${data.name}</div>
        <span class="rw-badge rw-badge-${data.status}">${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</span>
      </div>
      <div class="rw-feed-loc"><i class="bi bi-geo-alt" style="font-size:10px"></i> ${data.loc}</div>
      <div class="rw-feed-meta">${data.time} · ${data.user}</div>
    </div>`;
  if (prepend) list.insertBefore(item, list.firstChild);
  else list.appendChild(item);
  feedCount++;
  document.getElementById("feedCount").textContent =
    feedCount + " laporan hari ini";
}
feedData.forEach((d) => renderFeed(d));

const newReports = [
  {
    name: "Sungai Bengawan Solo",
    loc: "Solo, Jawa Tengah",
    status: "sedang",
    icon: '<i class="bi bi-exclamation-circle-fill" style="color:#f5a623;font-size:18px"></i>',
    time: "baru saja",
    user: "@joko_p",
    desc: "Limbah industri terdeteksi",
  },
  {
    name: "Kali Grogol",
    loc: "Jakarta Barat",
    status: "kritis",
    icon: '<i class="bi bi-exclamation-triangle-fill" style="color:#f04040;font-size:18px"></i>',
    time: "baru saja",
    user: "@tina_h",
    desc: "Banjir sampah setelah hujan",
  },
  {
    name: "Sungai Serayu",
    loc: "Purwokerto, Jawa Tengah",
    status: "baik",
    icon: '<i class="bi bi-check-circle-fill" style="color:#1dd68a;font-size:18px"></i>',
    time: "baru saja",
    user: "@wahyu_d",
    desc: "Kondisi normal dan jernih",
  },
];
let ni = 0;
setInterval(() => {
  renderFeed(
    { ...newReports[ni % newReports.length], time: "baru saja" },
    true,
  );
  ni++;
  const list = document.getElementById("feedList");
  if (list.children.length > 10) list.removeChild(list.lastChild);
}, 5000);

const map = L.map("miniMap", {
  zoomControl: true,
  attributionControl: true,
  scrollWheelZoom: false,
}).setView([-2.5489, 118.0149], 4);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

function makeIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2.5px solid #fff;box-shadow:0 0 8px ${color}80;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}
const icons = {
  kritis: makeIcon("#f04040"),
  sedang: makeIcon("#f5a623"),
  baik: makeIcon("#1dd68a"),
};

const markers = [
  {
    lat: -6.21462,
    lng: 106.84513,
    name: "Ciliwung",
    loc: "Jakarta Timur",
    status: "kritis",
    ph: "5.2",
    sampah: "Tinggi",
  },
  {
    lat: -6.96418,
    lng: 107.70929,
    name: "Citarum",
    loc: "Bandung, Jawa Barat",
    status: "kritis",
    ph: "4.8",
    sampah: "Sangat Tinggi",
  },
  {
    lat: -7.24917,
    lng: 112.75083,
    name: "Kali Surabaya",
    loc: "Surabaya, Jawa Timur",
    status: "sedang",
    ph: "6.4",
    sampah: "Sedang",
  },
  {
    lat: -7.80139,
    lng: 110.36472,
    name: "Sungai Code",
    loc: "Yogyakarta",
    status: "baik",
    ph: "7.1",
    sampah: "Rendah",
  },
  {
    lat: -3.31987,
    lng: 114.59075,
    name: "Sungai Martapura",
    loc: "Banjarmasin, Kalsel",
    status: "sedang",
    ph: "6.1",
    sampah: "Sedang",
  },
  {
    lat: -0.02329,
    lng: 109.33206,
    name: "Sungai Kapuas",
    loc: "Pontianak, Kalbar",
    status: "baik",
    ph: "7.0",
    sampah: "Rendah",
  },
  {
    lat: 3.58502,
    lng: 98.6753,
    name: "Sungai Deli",
    loc: "Medan, Sumatera Utara",
    status: "sedang",
    ph: "6.3",
    sampah: "Sedang",
  },
  {
    lat: -2.99078,
    lng: 104.7576,
    name: "Sungai Musi",
    loc: "Palembang, Sumsel",
    status: "baik",
    ph: "6.9",
    sampah: "Rendah",
  },
  {
    lat: -8.65778,
    lng: 115.21675,
    name: "Tukad Badung",
    loc: "Denpasar, Bali",
    status: "kritis",
    ph: "5.0",
    sampah: "Tinggi",
  },
  {
    lat: -7.55861,
    lng: 110.83208,
    name: "Bengawan Solo",
    loc: "Solo, Jawa Tengah",
    status: "sedang",
    ph: "6.5",
    sampah: "Sedang",
  },
];

let allMarkers = [];
markers.forEach((d) => {
  const m = L.marker([d.lat, d.lng], { icon: icons[d.status] }).addTo(map)
    .bindPopup(`<strong style="color:#1dd68a">${d.name}</strong><br>
      <span style="color:#5a9a7a">📍 ${d.loc}</span><br><br>
      Status: <strong style="color:${d.status === "kritis" ? "#f04040" : d.status === "sedang" ? "#f5a623" : "#1dd68a"}">${d.status.charAt(0).toUpperCase() + d.status.slice(1)}</strong><br>
      pH Air: <strong>${d.ph}</strong><br>
      Sampah: <strong>${d.sampah}</strong>`);
  allMarkers.push({ marker: m, status: d.status });
});

window.filterMap = function (status, btn) {
  document
    .querySelectorAll(".rw-map-header .rw-filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  allMarkers.forEach(({ marker, status: s }) => {
    if (status === "all" || s === status) {
      if (!map.hasLayer(marker)) marker.addTo(map);
    } else {
      if (map.hasLayer(marker)) map.removeLayer(marker);
    }
  });
};

const ctx = document.getElementById("trendChart").getContext("2d");
function genData(days, base, noise) {
  return Array.from({ length: days }, (_, i) =>
    Math.round(
      base + Math.sin(i * 0.4) * noise + (Math.random() - 0.5) * noise * 0.5,
    ),
  );
}
function getLabels(days) {
  const labels = [],
    now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(
      d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
    );
  }
  return labels;
}
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: getLabels(7),
    datasets: [
      {
        label: "Kualitas Air",
        data: genData(7, 65, 12),
        borderColor: "#1dd68a",
        backgroundColor: "rgba(29,214,138,0.08)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#1dd68a",
        pointBorderColor: "#021a14",
        pointBorderWidth: 2,
      },
      {
        label: "Pencemaran",
        data: genData(7, 40, 15),
        borderColor: "#f04040",
        backgroundColor: "rgba(240,64,64,0.06)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#f04040",
        pointBorderColor: "#021a14",
        pointBorderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: "rgba(29,214,138,0.06)" },
        ticks: { color: "#5a9a7a", font: { family: "Outfit", size: 11 } },
      },
      y: {
        grid: { color: "rgba(29,214,138,0.06)" },
        ticks: { color: "#5a9a7a", font: { family: "Outfit", size: 11 } },
        min: 0,
        max: 100,
      },
    },
  },
});

window.updateChart = function (days, btn) {
  document
    .querySelectorAll(".rw-chart-filters .rw-filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  chart.data.labels = getLabels(days);
  chart.data.datasets[0].data = genData(days, 65, 12);
  chart.data.datasets[1].data = genData(days, 40, 15);
  chart.update("active");
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
