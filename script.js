const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const yearEl = document.getElementById("year");
const yearsBuildingEl = document.getElementById("years-building");
const preloader = document.getElementById("preloader");
const welcomeToast = document.getElementById("welcome-toast");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (yearsBuildingEl) {
  const baseYear = 2026;
  const baseYears = 4;
  const currentYear = new Date().getFullYear();
  const totalYears = Math.max(baseYears, baseYears + (currentYear - baseYear));
  yearsBuildingEl.textContent = String(totalYears);
}


window.addEventListener("load", () => {
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 700);
  }
  if (welcomeToast) {
    welcomeToast.classList.add("show");
    welcomeToast.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      if (welcomeToast.classList.contains("show")) {
        welcomeToast.classList.remove("show");
        welcomeToast.setAttribute("aria-hidden", "true");
      }
    }, 5000);
  }
});


if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
