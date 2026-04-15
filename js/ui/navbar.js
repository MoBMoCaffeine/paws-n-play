// ==================== Mobile Navigation ====================

const hamburger = document.getElementById('hamburger');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const siteNav = document.querySelector('.site-nav');

function openMobileMenu() {
    mobileMenu.classList.add('open');
    siteNav.classList.add('menu-open');
    hamburger.innerHTML = '<span class="material-symbols-outlined">close</span>';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    siteNav.classList.remove('menu-open');
    hamburger.innerHTML = '<span class="material-symbols-outlined">menu</span>';
}

hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

closeMenuBtn.addEventListener('click', closeMobileMenu);

siteNav.addEventListener('click', (e) => {
    if (e.target === siteNav) {
        closeMobileMenu();
    }
});

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    }
});