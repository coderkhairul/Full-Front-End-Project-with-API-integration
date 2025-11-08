// ===== Load Phone Data =====
async function loadPhone(searchText, isShowAll) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  setTimeout(() => {
    displayProducts(data.data, isShowAll);
  }, 800);
}

// ===== Display Phone Cards =====
const displayProducts = (data, isShowAll) => {
  const cardContainer = document.getElementById("card-container-section");
  cardContainer.textContent = "";

  const showAllContainer = document.getElementById("showAllBtn");

  if (data.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    data = data.slice(0, 12);
  }

  data.forEach((element) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");
    productCard.innerHTML = `
      <div class="card-image">
        <img src="${element.image}" alt="${element.phone_name}" />
      </div>
      <h3 class="card-title">${element.phone_name}</h3>
      <p class="card-description">A modern smartphone with stunning features.</p>
      <div class="card-price"><span>$999</span></div>
      <div class="card-button">
        <button onClick="handleShowDetails('${element.slug}')" class="btn">Show Details</button>
      </div>
    `;
    cardContainer.appendChild(productCard);
  });

  toggleLoadingSpinner(false);
};

// ===== Search Handler =====
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-input-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// ===== Loading Spinner =====
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinnerElement = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinnerElement.classList.remove("hidden");
  } else {
    loadingSpinnerElement.classList.add("hidden");
  }
};

// ===== Show All Button =====
const handleShowAll = () => {
  handleSearch(true);
};

// ===== Show Details =====
const handleShowDetails = async (productId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${productId}`
  );
  const data = await res.json();
  const product = data.data;
  showProductDetails(product);
};

// ===== Modal Details =====
const showProductDetails = (phone) => {
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <div id="modal-image-container">
      <img src="${phone?.image}" alt="${phone?.name}" />
    </div>
    <p id='modal-item-name'>${phone?.name}</p>
    <p><span>Brand:</span> ${phone?.brand || "Not Available"}</p>
    <p><span>Release Date:</span> ${phone?.releaseDate || "No release date found"}</p>
    <p><span>Chipset:</span> ${phone?.mainFeatures?.chipSet || "Not specified"}</p>
    <p><span>Storage:</span> ${phone?.mainFeatures?.storage || "Unknown"}</p>
    <p><span>Display:</span> ${phone?.mainFeatures?.displaySize || "Unknown"}</p>
    <p><span>Sensors:</span> ${phone?.mainFeatures?.sensors?.join(", ") || "No sensors listed"}</p>
    <p><span>GPS:</span> ${phone?.others?.GPS || "No GPS available"}</p>
  `;

  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  document.getElementById("closeBtn").onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
  };
};

// ===== Typed.js Animation =====
document.addEventListener("DOMContentLoaded", () => {
  new Typed(".multiple-text", {
    strings: ["Khairul API Store"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
  });
});
