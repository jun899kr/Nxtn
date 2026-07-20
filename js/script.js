/* ========================================
   NXTN WEBSITE
   js/script.js
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
  const revealElements = document.querySelectorAll(".reveal");

  /* ----------------------------------------
     Header scroll effect
  ---------------------------------------- */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });


  /* ----------------------------------------
     Mobile menu
  ---------------------------------------- */

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu || !header) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");
    header.classList.remove("menu-active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "모바일 메뉴 열기");
  };

  const openMobileMenu = () => {
    if (!menuToggle || !mobileMenu || !header) return;

    menuToggle.classList.add("active");
    mobileMenu.classList.add("open");
    header.classList.add("menu-active");
    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "모바일 메뉴 닫기");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });


  /* ----------------------------------------
     Scroll reveal animation
  ---------------------------------------- */

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  /* ----------------------------------------
     같은 페이지 내부 링크 이동
  ---------------------------------------- */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /* ----------------------------------------
     Video playback
  ---------------------------------------- */

  const videos = document.querySelectorAll(".brand-video");

  videos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          /* 브라우저에서 자동재생을 차단한 경우 오류를 표시하지 않음 */
        });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }
  });
});
