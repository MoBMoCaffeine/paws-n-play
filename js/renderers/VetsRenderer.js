let allVets = [];
let filteredVets = [];
let currentPage = 1;
const itemsPerPage = 4;

const searchInput = document.querySelector('.search-input-wrap input[placeholder*="Dr. Smith"]');
const locationInput = document.querySelector('.search-input-wrap input[placeholder*="City or Zip Code"]');

let timeout;

// =================== Helper Functions ===================

function buildStars(rating, max = 5) {
  let html = "";
  for (let i = 1; i <= max; i++) {
    const fill = i <= rating ? 1 : 0;
    html += `<span class="material-symbols-outlined" style="font-variation-settings:'FILL' ${fill};">star</span>`;
  }
  return html;
}

function buildCard(vet) {
  return `
    <div class="vet-card fade-in">
      <div class="vet-avatar">
        <img src="${vet.image}" alt="${vet.alt ?? vet.name}" loading="lazy" />
      </div>
      <p class="vet-name">${vet.name}</p>
      <p class="vet-specialty">${vet.specialty}</p>
      <div class="star-row" aria-label="Rating: ${vet.rating} out of 5">
        ${buildStars(vet.rating)}
      </div>
      <p class="vet-exp">${vet.experience} Years Experience</p>
      <p class="vet-location"><span class="material-symbols-outlined">location_on</span> ${vet.location}</p>
      <button class="btn-profile" data-id="${vet.id}">View Profile</button>
    </div>`;
}

function showNoResultsMessage() {
  const grid = document.getElementById("vet-grid");
  grid.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
      <span class="material-symbols-outlined" style="font-size: 3.5rem; color: #ccc; display: block; margin-bottom: 1rem;">search_off</span>
      <h3>No matching veterinarians found</h3>
      <p>We couldn't find any vets matching your search criteria.</p>
    </div>`;
}

function updatePaginationUI() {
  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");
  const controls = document.getElementById("pagination-controls");

  const hasMore = currentPage * itemsPerPage < filteredVets.length;
  const isFirstPage = currentPage === 1;
  const hasResults = filteredVets.length > 0;

  btnNext.style.display = hasMore && hasResults ? "block" : "none";
  btnPrev.style.display = !isFirstPage && hasResults ? "block" : "none";
  controls.style.display = hasResults ? "flex" : "none";
}

function loadMore() {
  const grid = document.getElementById("vet-grid");
  
  const start = (currentPage - 1) * itemsPerPage;
  const end = Math.min(start + itemsPerPage, filteredVets.length);

  const newItems = filteredVets.slice(start, end);

  newItems.forEach(vet => {
    grid.insertAdjacentHTML("beforeend", buildCard(vet));
  });

  updatePaginationUI();
}

function removeLastPage() {
  const grid = document.getElementById("vet-grid");
  
  if (grid.children.length === 0) return;

  const itemsInCurrentPage = Math.min(itemsPerPage, filteredVets.length - (currentPage - 1) * itemsPerPage);

  const cardsToRemove = Array.from(grid.children).slice(-itemsInCurrentPage);

  cardsToRemove.forEach(card => {
    card.classList.add("fade-out");
    setTimeout(() => card.remove(), 300);
  });
}

function filterVets() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const locationTerm = locationInput.value.toLowerCase().trim();

  if (!searchTerm && !locationTerm) {
    filteredVets = [...allVets];
  } else {
    filteredVets = allVets.filter(vet => {
      const matchesSearch = !searchTerm || 
        vet.name.toLowerCase().includes(searchTerm) || 
        vet.specialty.toLowerCase().includes(searchTerm);

      const matchesLocation = !locationTerm || 
        (vet.location && vet.location.toLowerCase().includes(locationTerm));

      return matchesSearch && matchesLocation;
    });
  }

  currentPage = 1;
  const grid = document.getElementById("vet-grid");
  grid.innerHTML = "";

  if (filteredVets.length === 0) {
    showNoResultsMessage();
    updatePaginationUI();
    return;
  }

  loadMore(); 
}

// ====================== Event Listeners ============================

searchInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(filterVets, 300);
});

locationInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(filterVets, 300);
});

document.getElementById("btn-next").addEventListener("click", () => {
  if (currentPage * itemsPerPage < filteredVets.length) {
    currentPage++;
    loadMore();
  }
});

document.getElementById("btn-prev").addEventListener("click", () => {
  if (currentPage > 1) {
    removeLastPage();

    setTimeout(() => {
      currentPage--;
      updatePaginationUI();
      window.scrollBy({ top: -300, behavior: "smooth" });
    }, 350);
  }
});

document.querySelector(".btn-find").addEventListener("click", filterVets);

async function renderVets() {
  const grid = document.getElementById("vet-grid");
  const error = document.getElementById("vet-error");

  try {
    const res = await fetch("../../data/vets.json");
    if (!res.ok) throw new Error("Failed to load vets");

    allVets = await res.json();
    filteredVets = [...allVets];

    grid.innerHTML = "";

    if (allVets.length === 0) {
      grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;">No specialists found.</p>';
      return;
    }

    loadMore();
  } catch (err) {
    console.error(err);
    grid.style.display = "none";
    error.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", renderVets);