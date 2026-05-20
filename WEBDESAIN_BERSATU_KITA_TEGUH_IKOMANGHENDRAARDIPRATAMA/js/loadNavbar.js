fetch("components/layout/navbar.html")
  .then(function (res) {
    return res.text();
  })
  .then(function (html) {
    var placeholder = document.getElementById("navbar");
    if (!placeholder) return;

    var temp = document.createElement("div");
    temp.innerHTML = html.trim();

    var navEl = temp.firstElementChild;
    placeholder.replaceWith(navEl);

    initNavbar();
  })
  .catch(function (err) {
    console.warn("Navbar gagal dimuat:", err);
  });
