function initNavbar() {
  var nav = document.querySelector(".rw-nav");
  var hamburger = document.getElementById("hamburger");
  var menu = document.getElementById("mobileMenu");

  if (!nav || !hamburger || !menu) return;

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    var isOpen = menu.classList.toggle("active");

    var icon = hamburger.querySelector("i");
    if (icon) icon.className = isOpen ? "bi bi-x" : "bi bi-list";
  });

  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target)) {
      menu.classList.remove("active");
      var icon = hamburger.querySelector("i");
      if (icon) icon.className = "bi bi-list";
    }
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("active");
      var icon = hamburger.querySelector("i");
      if (icon) icon.className = "bi bi-list";
    });
  });

  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (currentPage === "") currentPage = "index.html";

  var allLinks = document.querySelectorAll(
    ".rw-nav-links a, .rw-mobile-menu a",
  );
  allLinks.forEach(function (link) {
    var href = link.getAttribute("href");

    link.classList.remove("active");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}
