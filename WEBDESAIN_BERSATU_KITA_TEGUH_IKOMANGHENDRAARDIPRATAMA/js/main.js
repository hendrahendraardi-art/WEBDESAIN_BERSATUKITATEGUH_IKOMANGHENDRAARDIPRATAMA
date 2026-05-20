window.addEventListener("scroll", function () {
  const nav = document.getElementById("navbar");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");
    const icon = hamburger.querySelector("i");
    if (icon)
      icon.className = mobileMenu.classList.contains("open")
        ? "bi bi-x"
        : "bi bi-list";
  });
}

const phrases = [
  "Platform pelaporan sungai berbasis komunitas.",
  "Laporkan, pantau, dan selamatkan sungai kita.",
  "Teknologi hijau untuk masa depan berkelanjutan.",
  "Bersama kita jaga air bersih Indonesia.",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function runTyping() {
  const target = document.getElementById("typingText");
  if (!target) return;

  const currentPhrase = phrases[phraseIndex];
  target.textContent = isDeleting
    ? currentPhrase.substring(0, charIndex--)
    : currentPhrase.substring(0, charIndex++);

  let delay = isDeleting ? 38 : 52;

  if (!isDeleting && charIndex === currentPhrase.length + 1) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 320;
  }
  setTimeout(runTyping, delay);
}
setTimeout(runTyping, 900);

function animateCounter(el, target, suffix) {
  if (!el) return;
  const step = Math.max(1, Math.ceil(target / 70));
  let current = 0;
  const timer = setInterval(function () {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString("id-ID") + (suffix || "");
    if (current >= target) clearInterval(timer);
  }, 22);
}
setTimeout(function () {
  animateCounter(document.getElementById("c1"), 2847, "");
  animateCounter(document.getElementById("c2"), 134, "");
  animateCounter(document.getElementById("c3"), 6291, "");
  animateCounter(document.getElementById("c4"), 48, " Ton");
}, 700);

const feedDataInit = [
  {
    name: "Sungai Ciliwung",
    loc: "Condet, Jakarta Timur",
    status: "kritis",
    icon: "🚨",
    time: "2 mnt lalu",
    user: "@andi_r",
  },
  {
    name: "Kali Malang",
    loc: "Bekasi Barat, Jawa Barat",
    status: "sedang",
    icon: "⚠️",
    time: "8 mnt lalu",
    user: "@siti_m",
  },
  {
    name: "Sungai Brantas",
    loc: "Malang, Jawa Timur",
    status: "baik",
    icon: "✅",
    time: "15 mnt lalu",
    user: "@deni_p",
  },
  {
    name: "Kali Surabaya",
    loc: "Surabaya, Jawa Timur",
    status: "kritis",
    icon: "🚨",
    time: "21 mnt lalu",
    user: "@rini_s",
  },
  {
    name: "Sungai Musi",
    loc: "Palembang, Sumatera Selatan",
    status: "sedang",
    icon: "⚠️",
    time: "28 mnt lalu",
    user: "@budi_w",
  },
  {
    name: "Sungai Kapuas",
    loc: "Pontianak, Kalimantan Barat",
    status: "baik",
    icon: "✅",
    time: "35 mnt lalu",
    user: "@maya_k",
  },
];

const simulatedReports = [
  {
    name: "Bengawan Solo",
    loc: "Solo, Jawa Tengah",
    status: "sedang",
    icon: "⚠️",
    time: "baru saja",
    user: "@joko_p",
  },
  {
    name: "Kali Grogol",
    loc: "Jakarta Barat",
    status: "kritis",
    icon: "🚨",
    time: "baru saja",
    user: "@tina_h",
  },
  {
    name: "Sungai Serayu",
    loc: "Purwokerto, Jawa Tengah",
    status: "baik",
    icon: "✅",
    time: "baru saja",
    user: "@wahyu_d",
  },
  {
    name: "Sungai Deli",
    loc: "Medan, Sumatera Utara",
    status: "sedang",
    icon: "⚠️",
    time: "baru saja",
    user: "@farhan_s",
  },
  {
    name: "Tukad Badung",
    loc: "Denpasar, Bali",
    status: "kritis",
    icon: "🚨",
    time: "baru saja",
    user: "@made_p",
  },
];

let feedCount = 0;
let simIndex = 0;
const feedList = document.getElementById("feedList");
const feedCounter = document.getElementById("feedCount");

function createFeedItem(data, prepend) {
  const item = document.createElement("div");
  item.className = "rw-feed-item" + (prepend ? " new" : "");
  item.innerHTML = `
    <div class="rw-feed-thumb ${data.status}">${data.icon}</div>
    <div class="rw-feed-body">
      <div class="rw-feed-top">
        <div class="rw-feed-name">${data.name}</div>
        <span class="rw-badge rw-badge-${data.status}">
          ${data.status.charAt(0).toUpperCase() + data.status.slice(1)}
        </span>
      </div>
      <div class="rw-feed-loc"><i class="bi bi-geo-alt" style="font-size:10px"></i> ${data.loc}</div>
      <div class="rw-feed-meta">${data.time} &nbsp;·&nbsp; ${data.user}</div>
    </div>`;

  if (feedList) {
    if (prepend) feedList.insertBefore(item, feedList.firstChild);
    else feedList.appendChild(item);
  }
  feedCount++;
  if (feedCounter) feedCounter.textContent = feedCount + " laporan hari ini";
}

if (feedList) {
  feedDataInit.forEach(function (d) {
    createFeedItem(d, false);
  });
  setInterval(function () {
    createFeedItem(simulatedReports[simIndex % simulatedReports.length], true);
    simIndex++;
    if (feedList.children.length > 12) feedList.removeChild(feedList.lastChild);
  }, 5000);
}

const mapEl = document.getElementById("miniMap");
if (mapEl && typeof L !== "undefined") {
  const map = L.map("miniMap", {
    zoomControl: true,
    attributionControl: true,
    scrollWheelZoom: false,
  }).setView([-2.5489, 118.0149], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
    maxZoom: 18,
  }).addTo(map);

  function makeIcon(color) {
    return L.divIcon({
      className: "",
      html: `<div style="
        width:14px;height:14px;border-radius:50%;
        background:${color};border:2.5px solid #fff;
        box-shadow:0 0 8px ${color}90;">
      </div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
  }
  const icons = {
    kritis: makeIcon("#f04040"),
    sedang: makeIcon("#f5a623"),
    baik: makeIcon("#1dd68a"),
  };

  const riverData = [
    {
      lat: -6.2146,
      lng: 106.8451,
      name: "Ciliwung",
      loc: "Jakarta Timur",
      status: "kritis",
      ph: "5.2",
      sampah: "Tinggi",
    },
    {
      lat: -6.91,
      lng: 107.6198,
      name: "Citarum",
      loc: "Bandung, Jawa Barat",
      status: "kritis",
      ph: "4.8",
      sampah: "Sangat Tinggi",
    },
    {
      lat: -7.24,
      lng: 112.738,
      name: "Kali Surabaya",
      loc: "Surabaya, Jawa Timur",
      status: "sedang",
      ph: "6.4",
      sampah: "Sedang",
    },
    {
      lat: -7.8014,
      lng: 110.3647,
      name: "Sungai Code",
      loc: "Yogyakarta",
      status: "baik",
      ph: "7.1",
      sampah: "Rendah",
    },
    {
      lat: -3.3199,
      lng: 114.5908,
      name: "Sungai Martapura",
      loc: "Banjarmasin, Kalsel",
      status: "sedang",
      ph: "6.1",
      sampah: "Sedang",
    },
    {
      lat: -0.0233,
      lng: 109.3321,
      name: "Sungai Kapuas",
      loc: "Pontianak, Kalbar",
      status: "baik",
      ph: "7.0",
      sampah: "Rendah",
    },
    {
      lat: 3.585,
      lng: 98.6753,
      name: "Sungai Deli",
      loc: "Medan, Sumatera Utara",
      status: "sedang",
      ph: "6.3",
      sampah: "Sedang",
    },
    {
      lat: -2.9908,
      lng: 104.7576,
      name: "Sungai Musi",
      loc: "Palembang, Sumsel",
      status: "baik",
      ph: "6.9",
      sampah: "Rendah",
    },
    {
      lat: -8.6578,
      lng: 115.2168,
      name: "Tukad Badung",
      loc: "Denpasar, Bali",
      status: "kritis",
      ph: "5.0",
      sampah: "Tinggi",
    },
    {
      lat: -7.5586,
      lng: 110.8321,
      name: "Bengawan Solo",
      loc: "Solo, Jawa Tengah",
      status: "sedang",
      ph: "6.5",
      sampah: "Sedang",
    },
  ];

  const allMarkers = [];

  riverData.forEach(function (d) {
    const statusColor =
      d.status === "kritis"
        ? "#f04040"
        : d.status === "sedang"
          ? "#f5a623"
          : "#1dd68a";
    const marker = L.marker([d.lat, d.lng], { icon: icons[d.status] })
      .addTo(map)
      .bindPopup(
        `<strong style="color:#1dd68a">${d.name}</strong><br>
         <span style="color:#5a9a7a">📍 ${d.loc}</span><br><br>
         Status: <strong style="color:${statusColor}">${d.status.charAt(0).toUpperCase() + d.status.slice(1)}</strong><br>
         pH Air: <strong>${d.ph}</strong><br>
         Sampah: <strong>${d.sampah}</strong>`,
      );
    allMarkers.push({ marker, status: d.status });
  });

  window.filterMap = function (status, btn) {
    document
      .querySelectorAll(".rw-map-filters .rw-filter-btn")
      .forEach(function (b) {
        b.classList.remove("active");
      });
    btn.classList.add("active");
    allMarkers.forEach(function ({ marker, status: s }) {
      if (status === "all" || s === status) {
        if (!map.hasLayer(marker)) marker.addTo(map);
      } else {
        if (map.hasLayer(marker)) map.removeLayer(marker);
      }
    });
  };
}

const chartCanvas = document.getElementById("trendChart");
let trendChart = null;

function generateData(days, base, noise) {
  return Array.from({ length: days }, function (_, i) {
    return Math.round(
      base + Math.sin(i * 0.38) * noise + (Math.random() - 0.5) * noise * 0.5,
    );
  });
}

function getDateLabels(days) {
  const labels = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(
      d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
    );
  }
  return labels;
}

if (chartCanvas && typeof Chart !== "undefined") {
  trendChart = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: getDateLabels(7),
      datasets: [
        {
          label: "Kualitas Air",
          data: generateData(7, 65, 12),
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
          label: "Tingkat Pencemaran",
          data: generateData(7, 40, 14),
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
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(4,43,32,0.95)",
          borderColor: "rgba(29,214,138,0.25)",
          borderWidth: 1,
          titleColor: "#1dd68a",
          bodyColor: "#cceedd",
          padding: 10,
          titleFont: { family: "Outfit", size: 12, weight: "600" },
          bodyFont: { family: "Outfit", size: 12 },
        },
      },
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
}

window.updateChart = function (days, btn) {
  document
    .querySelectorAll(".rw-chart-filters .rw-filter-btn")
    .forEach(function (b) {
      b.classList.remove("active");
    });
  btn.classList.add("active");
  if (!trendChart) return;
  trendChart.data.labels = getDateLabels(days);
  trendChart.data.datasets[0].data = generateData(days, 65, 12);
  trendChart.data.datasets[1].data = generateData(days, 40, 14);
  trendChart.update("active");
};

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add("visible");
        }, i * 80);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach(function (el) {
  revealObserver.observe(el);
});
