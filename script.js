const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const yearEl = document.getElementById("year");
const yearsBuildingEl = document.getElementById("years-building");
const heroVisual = document.querySelector(".hero-visual");
const glassCard = document.querySelector(".glass-card");
const preloader = document.getElementById("preloader");
const tiltCards = document.querySelectorAll(".tilt-card");
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
    preloader.classList.add("hidden");
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

if (heroVisual && glassCard && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * -10;
    const rotateY = x * 10;
    heroVisual.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    glassCard.style.transform = `translateZ(40px)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    heroVisual.style.transform = "rotateX(0deg) rotateY(0deg)";
    glassCard.style.transform = "translateZ(0)";
  });
}

if (tiltCards.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateX = y * -8;
      const rotateY = x * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
      card.classList.add("is-tilting");
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      card.classList.remove("is-tilting");
    });
  });
}
