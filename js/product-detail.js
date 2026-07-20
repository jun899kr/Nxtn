document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".product-header");
  const menuButton = document.querySelector(".product-menu-button");
  const mobileMenu = document.querySelector(".product-mobile-menu");
  const mobileLinks = document.querySelectorAll(".product-mobile-menu a");

  const setMenu = (open) => {
    menuButton?.classList.toggle("is-open", open);
    mobileMenu?.classList.toggle("is-open", open);
    menuButton?.setAttribute("aria-expanded", String(open));
    mobileMenu?.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  menuButton?.addEventListener("click", () => {
    setMenu(!mobileMenu.classList.contains("is-open"));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 40);
  }, { passive: true });
});
