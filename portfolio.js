document.addEventListener("DOMContentLoaded", () => {
  // Scroll-reveal for project cards
  const revealEls = document.querySelectorAll(".project-card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 80, 240)}ms`;
      observer.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Rotating role words — reflects breadth without overclaiming
  const roleWord = document.getElementById("roleWord");
  if (roleWord) {
    const roles = [
      "Embedded Systems Engineer",
      "Edge-AI Tinkerer",
      "IoT Builder",
      "Electronics Enthusiast"
    ];
    let i = 0;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInterval(() => {
        i = (i + 1) % roles.length;
        roleWord.style.opacity = "0";
        setTimeout(() => {
          roleWord.textContent = roles[i];
          roleWord.style.opacity = "1";
        }, 250);
      }, 3200);
      roleWord.style.transition = "opacity 0.25s ease";
    }
  }
});
