fetch("components/layout/footer.html")
  .then(function (res) {
    return res.text();
  })
  .then(function (html) {
    var placeholder = document.getElementById("footer");
    if (!placeholder) return;

    var temp = document.createElement("div");
    temp.innerHTML = html.trim();

    var footerEl = temp.firstElementChild;
    placeholder.replaceWith(footerEl);
  })
  .catch(function (err) {
    console.warn("Footer gagal dimuat:", err);
  });
