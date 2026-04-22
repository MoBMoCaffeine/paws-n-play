function filterSelection(category, btn) {
    const items = document.querySelectorAll(".shop__card");
    const filterButtons = document.querySelectorAll(".shop__filter-btn");

    items.forEach((item) => item.classList.remove("is-visible"));

    let filteredItems = [];
    if (category === "all") {
        filteredItems = Array.from(items).sort(() => 0.5 - Math.random());
    } else {
        filteredItems = Array.from(items).filter((item) => item.classList.contains(category));
    }

    filteredItems.slice(0, 3).forEach((item) => item.classList.add("is-visible"));

    if (btn) {
        filterButtons.forEach((button) => button.classList.remove("is-active"));
        btn.classList.add("is-active");
    }
}

window.addEventListener("load", () => {
    filterSelection("all", document.querySelector(".shop__filter-btn.is-active"));
});
