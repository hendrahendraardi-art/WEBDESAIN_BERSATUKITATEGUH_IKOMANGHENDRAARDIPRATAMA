// document.addEventListener("DOMContentLoaded", () => {
//   const splash = document.getElementById("splash-screen");
//   const texts = document.querySelectorAll(".reveal-text");

//   if (sessionStorage.getItem("riverwatch_splash_done")) {
//     if (splash) splash.remove();
//     return;
//   }

//   setTimeout(() => {
//     texts.forEach((txt, index) => {
//       setTimeout(() => {
//         txt.style.transition = "transform 1.1s cubic-bezier(0.19, 1, 0.22, 1)";
//         txt.style.transform = "translateX(110%)";
//       }, index * 80);
//     });

//     setTimeout(() => {
//       splash.style.transition = "all 1.2s cubic-bezier(0.19, 1, 0.22, 1)";
//       splash.style.opacity = "0";
//       splash.style.filter = "blur(20px)";

//       setTimeout(() => {
//         splash.remove();

//         sessionStorage.setItem("riverwatch_splash_done", "true");
//       }, 1200);
//     }, 1200);
//   }, 2500);
// });

// window.addEventListener("DOMContentLoaded", () => {
//   const splash = document.getElementById("splash-screen");
//   const progressFill = document.querySelector(".progress-fill");
//   const statusText = document.querySelector(".status-text");

//   let width = 0;
//   const loadingStates = [
//     "INITIALIZING CORE SYSTEM...",
//     "FETCHING RIVER DATA...",
//     "ESTABLISHING SECURE CONNECTION...",
//     "READY TO START!",
//   ];

//   const interval = setInterval(() => {
//     if (width >= 100) {
//       clearInterval(interval);
//       finishLoading();
//     } else {
//       width += Math.random() * 15;
//       if (width > 100) width = 100;
//       progressFill.style.width = width + "%";

//       if (width < 30) statusText.innerText = loadingStates[0];
//       else if (width < 60) statusText.innerText = loadingStates[1];
//       else if (width < 90) statusText.innerText = loadingStates[2];
//       else statusText.innerText = loadingStates[3];
//     }
//   }, 200);

//   function finishLoading() {
//     setTimeout(() => {
//       splash.style.transition = "all 1s cubic-bezier(0.85, 0, 0.15, 1)";

//       splash.style.transform = "translateY(-100%) scale(1.1)";
//       splash.style.opacity = "0";

//       setTimeout(() => {
//         splash.remove();
//       }, 1000);
//     }, 800);
//   }
// });

// texts.forEach((txt, index) => {
//   setTimeout(() => {
//     txt.style.transition = "transform 1.1s cubic-bezier(0.19, 1, 0.22, 1)";
//     txt.style.transform = "translateX(110%)";
//   }, index * 80);
// });

// setTimeout(() => {
//   splash.style.transition = "all 1.2s cubic-bezier(0.19, 1, 0.22, 1)";
//   splash.style.opacity = "0";
//   splash.style.backdropFilter = "blur(20px)";
// }, 1200);
