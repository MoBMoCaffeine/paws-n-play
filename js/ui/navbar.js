const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    const closeLandingMenu = () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    };

    const toggleMenu = () => {
        const isOpen = navLinks.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    };

    menuToggle.addEventListener("click", toggleMenu);

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeLandingMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLandingMenu();
        }
    });
}

const siteNav = document.querySelector(".site-nav");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuButton = document.getElementById("close-menu");

if (siteNav && hamburger && mobileMenu) {
    const setMenuState = (isOpen) => {
        mobileMenu.classList.toggle("open", isOpen);
        siteNav.classList.toggle("menu-open", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-menu-open", isOpen);
    };

    hamburger.addEventListener("click", () => {
        setMenuState(!mobileMenu.classList.contains("open"));
    });

    if (closeMenuButton) {
        closeMenuButton.addEventListener("click", () => setMenuState(false));
    }

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
        }
    });
}
