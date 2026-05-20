const LEADERBOARD_DATA = [
  {
    rank: 4,
    name: "Maya Kartika",
    loc: "Bandung",
    pts: 3240,
    laporan: 198,
    level: "Master",
    streak: 22,
    color: "#7c3aed",
  },
  {
    rank: 5,
    name: "Rizal Hakim",
    loc: "Medan",
    pts: 2980,
    laporan: 175,
    level: "Expert",
    streak: 15,
    color: "#0ea5e9",
  },
  {
    rank: 6,
    name: "Farhan Syah",
    loc: "Makassar",
    pts: 2740,
    laporan: 161,
    level: "Expert",
    streak: 18,
    color: "#10b981",
  },
  {
    rank: 7,
    name: "Tina Halim",
    loc: "Palembang",
    pts: 2510,
    laporan: 148,
    level: "Senior",
    streak: 8,
    color: "#f59e0b",
  },
  {
    rank: 8,
    name: "Budi Wijaya",
    loc: "Semarang",
    pts: 2280,
    laporan: 134,
    level: "Senior",
    streak: 12,
    color: "#ec4899",
  },
  {
    rank: 9,
    name: "Nadia Putri",
    loc: "Yogyakarta",
    pts: 2050,
    laporan: 121,
    level: "Member",
    streak: 5,
    color: "#14b8a6",
  },
  {
    rank: 10,
    name: "Hendra Gunawan",
    loc: "Surabaya",
    pts: 1820,
    laporan: 108,
    level: "Member",
    streak: 3,
    color: "#8b5cf6",
  },
];

const EVENTS_DATA = [
  {
    id: 1,
    title: "Bersih Ciliwung - Condet",
    date: "15 Jun 2025",
    time: "07.00 – 12.00 WIB",
    loc: "Condet, Jakarta Timur",
    org: "RiverWatch x KKN UI",
    image: "assets/images/ciliwung.jpg",
    color: "linear-gradient(135deg,#052b1e,#0a4a30)",
    status: "buka",
    kategori: "jakarta",
    quota: 80,
    daftar: 67,
    poin: 500,
  },
  {
    id: 2,
    title: "Monitoring Sungai Citarum",
    date: "22 Jun 2025",
    time: "08.00 – 15.00 WIB",
    loc: "Majalaya, Bandung",
    org: "RiverWatch x ITB",
    image: "assets/images/citarum.jpeg",
    color: "linear-gradient(135deg,#051e2b,#0a304a)",
    status: "buka",
    kategori: "bandung",
    quota: 50,
    daftar: 38,
    poin: 750,
  },
  {
    id: 3,
    title: "Workshop Sensor IoT Sungai",
    date: "28 Jun 2025",
    time: "09.00 – 16.00 WIB",
    loc: "Online via Zoom",
    org: "RiverWatch x GDG Indonesia",
    image: "assets/images/sensor_lot.jpg",
    color: "linear-gradient(135deg,#0a051e,#1a0a30)",
    status: "online",
    kategori: "online",
    quota: 200,
    daftar: 142,
    poin: 300,
  },
  {
    id: 4,
    title: "Bersih Tukad Badung Bali",
    date: "5 Jul 2025",
    time: "06.30 – 11.00 WITA",
    loc: "Denpasar, Bali",
    org: "RiverWatch x Seka Truna",
    image: "assets/images/sampah-tukad-badung.jpeg",
    color: "linear-gradient(135deg,#1e1505,#302308)",
    status: "buka",
    kategori: "bali",
    quota: 60,
    daftar: 60,
    poin: 600,
  },
  {
    id: 5,
    title: "Forum Komunitas Jawa Timur",
    date: "12 Jul 2025",
    time: "13.00 – 17.00 WIB",
    loc: "Surabaya, Jawa Timur",
    org: "RiverWatch x ITS",
    image: "assets/images/coming-soon.jpg",
    color: "linear-gradient(135deg,#1e0505,#302008)",
    status: "buka",
    kategori: "surabaya",
    quota: 100,
    daftar: 44,
    poin: 250,
  },
  {
    id: 6,
    title: "Pelatihan Relawan Tingkat Lanjut",
    date: "19 Jul 2025",
    time: "08.00 – 17.00 WIB",
    loc: "Online via Google Meet",
    org: "Tim RiverWatch",
    image: "assets/images/coming-soon.jpg",
    color: "linear-gradient(135deg,#051e10,#0a3020)",
    status: "online",
    kategori: "online",
    quota: 150,
    daftar: 89,
    poin: 400,
  },
];

const FORUM_DATA = [
  {
    id: 1,
    title: "Sungai Ciliwung di Condet berubah warna hitam pekat pagi ini!",
    cat: "Laporan Darurat",
    catColor: "#f04040",
    catBg: "rgba(240,64,64,.12)",
    author: "@andi_r",
    time: "2 jam lalu",
    votes: 142,
    replies: 38,
    views: 890,
    isHot: true,
  },
  {
    id: 2,
    title: "Tips hemat: cara buat sensor pH air mandiri harga Rp 50rb",
    cat: "Tips & Solusi",
    catColor: "#1dd68a",
    catBg: "rgba(29,214,138,.12)",
    author: "@rizal_h",
    time: "5 jam lalu",
    votes: 98,
    replies: 22,
    views: 634,
    isHot: true,
  },
  {
    id: 3,
    title:
      "Hasil riset: 90% sungai perkotaan Indonesia mengandung mikroplastik",
    cat: "Edukasi & Riset",
    catColor: "#60b0f0",
    catBg: "rgba(96,176,240,.12)",
    author: "@maya_k",
    time: "1 hari lalu",
    votes: 76,
    replies: 15,
    views: 1240,
    isHot: false,
  },
  {
    id: 4,
    title: "Berhasil bersihkan 2 ton sampah di Kali Malang! Ini ceritanya 🎉",
    cat: "Selebrasi & Cerita",
    catColor: "#a78bfa",
    catBg: "rgba(167,139,250,.12)",
    author: "@siti_m",
    time: "2 hari lalu",
    votes: 203,
    replies: 67,
    views: 2100,
    isHot: true,
  },
  {
    id: 5,
    title: "Bagaimana cara melaporkan sungai yang sama dua kali dalam sehari?",
    cat: "Tips & Solusi",
    catColor: "#1dd68a",
    catBg: "rgba(29,214,138,.12)",
    author: "@budi_w",
    time: "3 hari lalu",
    votes: 34,
    replies: 9,
    views: 312,
    isHot: false,
  },
];

const ACT_INIT = [
  {
    name: "Andi R.",
    color: "#7c3aed",
    act: "melaporkan",
    obj: "Sungai Ciliwung — Kritis",
    ico: "🚨",
    time: "2 mnt lalu",
    pts: "+50 pts",
    badgeColor: "rgba(240,64,64,.15)",
    badgeTxt: "Laporan",
  },
  {
    name: "Maya K.",
    color: "#0ea5e9",
    act: "meraih badge",
    obj: "⚡ Streak Master",
    ico: "🏅",
    time: "8 mnt lalu",
    pts: "+200 pts",
    badgeColor: "rgba(167,139,250,.15)",
    badgeTxt: "Badge",
  },
  {
    name: "Siti M.",
    color: "#10b981",
    act: "bergabung di",
    obj: "Event Bersih Ciliwung",
    ico: "📅",
    time: "15 mnt lalu",
    pts: "+100 pts",
    badgeColor: "rgba(29,214,138,.12)",
    badgeTxt: "Event",
  },
  {
    name: "Rizal H.",
    color: "#f59e0b",
    act: "melaporkan",
    obj: "Kali Malang — Sedang",
    ico: "⚠️",
    time: "22 mnt lalu",
    pts: "+50 pts",
    badgeColor: "rgba(245,166,35,.12)",
    badgeTxt: "Laporan",
  },
  {
    name: "Farhan S.",
    color: "#ec4899",
    act: "menyelesaikan",
    obj: "Quiz Kualitas Air — 90/100",
    ico: "🧠",
    time: "35 mnt lalu",
    pts: "+150 pts",
    badgeColor: "rgba(96,176,240,.12)",
    badgeTxt: "Quiz",
  },
  {
    name: "Tina H.",
    color: "#14b8a6",
    act: "melaporkan",
    obj: "Sungai Musi — Baik",
    ico: "✅",
    time: "48 mnt lalu",
    pts: "+50 pts",
    badgeColor: "rgba(29,214,138,.12)",
    badgeTxt: "Laporan",
  },
];

const ACT_NEW = [
  {
    name: "Dewa K.",
    color: "#ea580c",
    act: "melaporkan",
    obj: "Tukad Badung — Kritis",
    ico: "🚨",
    time: "baru saja",
    pts: "+50 pts",
    badgeColor: "rgba(240,64,64,.15)",
    badgeTxt: "Laporan",
  },
  {
    name: "Nadia P.",
    color: "#8b5cf6",
    act: "mendaftar ke",
    obj: "Workshop Sensor IoT",
    ico: "💻",
    time: "baru saja",
    pts: "+100 pts",
    badgeColor: "rgba(167,139,250,.15)",
    badgeTxt: "Event",
  },
  {
    name: "Hendra G.",
    color: "#0ea5e9",
    act: "melaporkan",
    obj: "Sungai Code — Baik",
    ico: "✅",
    time: "baru saja",
    pts: "+50 pts",
    badgeColor: "rgba(29,214,138,.12)",
    badgeTxt: "Laporan",
  },
  {
    name: "Rini S.",
    color: "#f59e0b",
    act: "meraih badge",
    obj: "🌊 Penjaga Air",
    ico: "🏅",
    time: "baru saja",
    pts: "+200 pts",
    badgeColor: "rgba(29,214,138,.12)",
    badgeTxt: "Badge",
  },
];

let actCount = 0;
let actNewIdx = 0;

document.addEventListener("DOMContentLoaded", function () {
  initVanta();
  initReveal();
  initCounters();
  initRings();
  initLeaderboard();
  initActivityFeed();
  initEvents();
  initForum();
  initNavHighlight();
});

function initVanta() {
  if (typeof VANTA === "undefined" || typeof THREE === "undefined") return;

  var isMobile = window.innerWidth < 768;

  VANTA.NET({
    el: "#vantaBg",
    THREE: THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1.0,
    scaleMobile: 0.8,

    color: 0x1dd68a,
    backgroundColor: 0x021a14,
    points: isMobile ? 8 : 12,
    maxDistance: isMobile ? 18 : 22,
    spacing: isMobile ? 18 : 16,
    showDots: true,
  });
}

function initReveal() {
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    obs.observe(el);
  });
}

function initCounters() {
  document.querySelectorAll(".counter").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-target"));
    var step = Math.max(1, Math.ceil(target / 70));
    var cur = 0;
    var t = setInterval(function () {
      cur = Math.min(cur + step, target);
      el.textContent = cur.toLocaleString("id-ID");
      if (cur >= target) clearInterval(t);
    }, 20);
  });
}

function initRings() {
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll(".ring-fill").forEach(function (ring) {
          var pct = parseFloat(ring.getAttribute("data-pct"));
          var circ = 2 * Math.PI * 50;
          var fill = (pct / 100) * circ;
          ring.style.strokeDasharray = fill + " " + (circ - fill);
        });
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.3 },
  );

  var ringSection = document.getElementById("impact");
  if (ringSection) obs.observe(ringSection);
}

function initLeaderboard() {
  var container = document.getElementById("lbRows");
  if (!container) return;

  var lvClass = {
    Master: "lv-master",
    Expert: "lv-expert",
    Senior: "lv-senior",
    Member: "lv-member",
  };

  LEADERBOARD_DATA.forEach(function (r) {
    var row = document.createElement("div");
    row.className = "cm-lb-row";
    row.innerHTML =
      '<div class="cm-lb-rank">#' +
      r.rank +
      "</div>" +
      '<div class="cm-lb-user">' +
      '<div class="cm-lb-avatar" style="background:' +
      r.color +
      '">' +
      r.name.substring(0, 2).toUpperCase() +
      "</div>" +
      "<div>" +
      '<div class="cm-lb-uname">' +
      r.name +
      "</div>" +
      '<div class="cm-lb-uloc"><i class="bi bi-geo-alt-fill" style="font-size:9px"></i> ' +
      r.loc +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="hide-sm"><span class="cm-lb-level ' +
      (lvClass[r.level] || "lv-member") +
      '">' +
      r.level +
      "</span></div>" +
      '<div class="cm-lb-laporan hide-sm">' +
      r.laporan +
      " lap</div>" +
      '<div class="cm-lb-pts">' +
      r.pts.toLocaleString("id-ID") +
      "</div>" +
      '<div class="cm-lb-streak"><i class="bi bi-fire"></i> ' +
      r.streak +
      "d</div>";
    container.appendChild(row);
  });
}

function initActivityFeed() {
  ACT_INIT.forEach(function (d) {
    renderActivity(d, false);
  });
  actCount = ACT_INIT.length;
  updateActCount();

  setInterval(function () {
    var d = ACT_NEW[actNewIdx % ACT_NEW.length];
    actNewIdx++;
    renderActivity(d, true);
    actCount++;
    updateActCount();

    var list = document.getElementById("activityList");
    if (list && list.children.length > 12) {
      list.removeChild(list.lastChild);
    }
  }, 5000);
}

function renderActivity(d, prepend) {
  var list = document.getElementById("activityList");
  if (!list) return;

  var item = document.createElement("div");
  item.className = "cm-act-item" + (prepend ? " new" : "");
  item.innerHTML =
    '<div class="cm-act-avatar" style="background:' +
    d.color +
    '">' +
    d.name.substring(0, 2) +
    "</div>" +
    '<div class="cm-act-body">' +
    '<div class="cm-act-top">' +
    '<div class="cm-act-name">' +
    d.name +
    "</div>" +
    '<div class="cm-act-time">' +
    d.time +
    "</div>" +
    "</div>" +
    '<div class="cm-act-text">' +
    d.act +
    ' <strong style="color:#c0ddd0">' +
    d.obj +
    "</strong></div>" +
    '<div class="cm-act-badge" style="background:' +
    d.badgeColor +
    ';color:var(--mint)">' +
    d.ico +
    " " +
    d.badgeTxt +
    " &nbsp;<strong>" +
    d.pts +
    "</strong>" +
    "</div>" +
    "</div>";

  if (prepend) list.insertBefore(item, list.firstChild);
  else list.appendChild(item);
}

function updateActCount() {
  var el = document.getElementById("actCount");
  if (el) el.textContent = actCount + " aktivitas hari ini";
}

function copyRef() {
  var code = document.getElementById("refCode");
  if (!code) return;

  navigator.clipboard
    .writeText(code.textContent)
    .then(function () {
      showToast("✅ Kode referral disalin!");
    })
    .catch(function () {
      showToast("✅ Kode: " + code.textContent);
    });
}

function share(platform) {
  var code = document.getElementById("refCode")?.textContent || "RW-HERO-2025";
  var text =
    "Bergabunglah dengan komunitas relawan sungai Indonesia di RiverWatch! Pakai kode referral saya: " +
    code;
  var urls = {
    whatsapp: "https://wa.me/?text=" + encodeURIComponent(text),
    twitter:
      "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text),
    instagram: "#" /* Instagram tidak bisa share via URL */,
  };
  if (platform === "instagram") {
    showToast("📸 Salin kode dan bagikan di Instagram Story kamu!");
    return;
  }
  window.open(urls[platform], "_blank");
}

function initEvents() {
  renderEvents("semua");
}

function renderEvents(filter) {
  var grid = document.getElementById("eventsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  var filtered =
    filter === "semua"
      ? EVENTS_DATA
      : EVENTS_DATA.filter(function (e) {
          return e.kategori === filter;
        });

  if (filtered.length === 0) {
    grid.innerHTML =
      '<div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--muted)">Belum ada event untuk kota ini. Cek kembali nanti!</div>';
    return;
  }

  filtered.forEach(function (ev) {
    var isFull = ev.daftar >= ev.quota;
    var pctFull = Math.min(100, Math.round((ev.daftar / ev.quota) * 100));
    var statusCls =
      ev.status === "online"
        ? "cm-event-online"
        : isFull
          ? "cm-event-full"
          : "cm-event-open";
    var statusTxt =
      ev.status === "online" ? "Online" : isFull ? "Penuh" : "Buka";

    var card = document.createElement("div");
    card.className = "cm-event-card reveal";
    card.setAttribute("data-status", isFull ? "penuh" : "buka");
    card.innerHTML =
      '<div class="cm-event-top" style="background:' +
      ev.color +
      '">' +
      (ev.image
        ? '<img src="' +
          ev.image +
          '" alt="' +
          ev.title +
          '" class="cm-event-img">'
        : '<span class="cm-event-emoji">' + ev.emoji + "</span>") +
      '<div class="cm-event-status ' +
      statusCls +
      '">' +
      statusTxt +
      "</div>" +
      "</div>" +
      '<div class="cm-event-status ' +
      statusCls +
      '">' +
      statusTxt +
      "</div>" +
      "</div>" +
      '<div class="cm-event-body">' +
      '<div class="cm-event-date"><i class="bi bi-calendar3"></i> ' +
      ev.date +
      " &nbsp;·&nbsp; " +
      ev.time +
      "</div>" +
      '<div class="cm-event-title">' +
      ev.title +
      "</div>" +
      '<div class="cm-event-meta">' +
      '<div class="cm-event-loc"><i class="bi bi-geo-alt-fill"></i> ' +
      ev.loc +
      "</div>" +
      '<div class="cm-event-org"><i class="bi bi-people-fill"></i> ' +
      ev.org +
      "</div>" +
      "</div>" +
      '<div style="margin-bottom:10px">' +
      '<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted);margin-bottom:5px">' +
      '<span>Kuota terisi</span><span style="color:var(--mint)">' +
      pctFull +
      "%</span>" +
      "</div>" +
      '<div style="height:3px;background:rgba(29,214,138,.08);border-radius:2px;overflow:hidden">' +
      '<div style="height:100%;width:' +
      pctFull +
      "%;background:" +
      (isFull ? "var(--red)" : "var(--mint)") +
      ';border-radius:2px;transition:width 1.4s cubic-bezier(.16,1,.3,1)"></div>' +
      "</div>" +
      "</div>" +
      '<div class="cm-event-footer">' +
      '<div class="cm-event-quota">Slot: <span>' +
      ev.daftar +
      " / " +
      ev.quota +
      "</span> &nbsp;·&nbsp; +" +
      ev.poin +
      " pts</div>" +
      '<button class="cm-event-btn" ' +
      (isFull ? "disabled" : "") +
      ' onclick="daftarEvent(' +
      ev.id +
      ',this)">' +
      (isFull ? "Penuh" : "Daftar") +
      "</button>" +
      "</div>" +
      "</div>";
    grid.appendChild(card);

    setTimeout(function () {
      card.classList.add("visible");
    }, 100);
  });
}

function filterEvent(filter, btn) {
  document.querySelectorAll(".cm-ef-btn").forEach(function (b) {
    b.classList.remove("on");
  });
  btn.classList.add("on");
  renderEvents(filter);
}

function daftarEvent(id, btn) {
  btn.disabled = true;
  btn.textContent = "✓ Terdaftar";
  btn.style.background = "rgba(29,214,138,.2)";
  btn.style.color = "var(--mint)";
  showToast("🎉 Berhasil daftar! +100 poin ditambahkan ke akunmu.");
}

function initForum() {
  var container = document.getElementById("forumThreads");
  if (!container) return;

  FORUM_DATA.forEach(function (t) {
    var el = document.createElement("div");
    el.className = "cm-thread reveal";
    el.innerHTML =
      '<div class="cm-thread-vote">' +
      '<button class="cm-thread-up" onclick="upvote(' +
      t.id +
      ',this)"><i class="bi bi-chevron-up"></i></button>' +
      '<div class="cm-thread-votes" id="votes' +
      t.id +
      '">' +
      t.votes +
      "</div>" +
      "</div>" +
      '<div class="cm-thread-body">' +
      '<div class="cm-thread-top">' +
      '<span class="cm-thread-cat-tag" style="background:' +
      t.catBg +
      ";color:" +
      t.catColor +
      '">' +
      t.cat +
      "</span>" +
      (t.isHot ? '<span class="cm-thread-hot"> Hot</span>' : "") +
      "</div>" +
      '<div class="cm-thread-title">' +
      t.title +
      "</div>" +
      '<div class="cm-thread-meta">' +
      '<span><i class="bi bi-person-fill"></i> ' +
      t.author +
      "</span>" +
      '<span><i class="bi bi-clock"></i> ' +
      t.time +
      "</span>" +
      '<span><i class="bi bi-eye"></i> ' +
      t.views.toLocaleString("id-ID") +
      "</span>" +
      "</div>" +
      "</div>" +
      '<div class="cm-thread-right">' +
      '<div class="cm-thread-replies"><i class="bi bi-chat-dots-fill"></i> ' +
      t.replies +
      "</div>" +
      '<div class="cm-thread-time">' +
      t.time +
      "</div>" +
      "</div>";
    container.appendChild(el);
  });

  setTimeout(function () {
    container.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }, 300);
}

var votedThreads = new Set();
function upvote(id, btn) {
  if (votedThreads.has(id)) {
    votedThreads.delete(id);
    btn.classList.remove("voted");
    var el = document.getElementById("votes" + id);
    if (el) el.textContent = parseInt(el.textContent) - 1;
  } else {
    votedThreads.add(id);
    btn.classList.add("voted");
    var el = document.getElementById("votes" + id);
    if (el) el.textContent = parseInt(el.textContent) + 1;
    showToast("👍 Upvote diberikan!");
  }
}

function scrollTo(sectionId) {
  var el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

var toastTimer = null;
function showToast(msg) {
  var toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerHTML = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

function initNavHighlight() {
  var navLinks = document.querySelectorAll(
    ".rw-nav-links a, .rw-mobile-menu a",
  );
  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "community.html") {
      link.classList.add("active");
    }
  });
}
