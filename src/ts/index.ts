import { Product } from "Product";

const API_ENDPOINT = "http://localhost:5000";

let cart: Product[] = [];
let productsList: Product[] = [];

document.addEventListener("DOMContentLoaded", init);

async function init() {
  productsList = await fetchProducts();
  renderProducts(productsList.slice(0, 9));

  setupEventListeners();
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_ENDPOINT}/products`);
  return await response.json();
}

function setupEventListeners() {
  const filterButton = document.getElementById('filter-toggle') as HTMLElement;
  const sortButton = document.getElementById('sort-toggle') as HTMLElement;
  const mobileFilterMenu = document.getElementById('mobile-filter-menu') as HTMLElement;
  const mobileSortMenu = document.getElementById('mobile-sort-menu') as HTMLElement;
  const closeFilterButton = document.getElementById('close-filter-menu') as HTMLElement;
  const closeSortButton = document.getElementById('close-sort-menu') as HTMLElement;
  const mobileApplyButton = document.querySelector('.apply-button-mobile') as HTMLElement;
  const mobileClearButton = document.querySelector('.clean-button-mobile') as HTMLElement;

  filterButton.addEventListener('click', () => toggleMenu(mobileFilterMenu));
  sortButton.addEventListener('click', () => toggleMenu(mobileSortMenu));
  closeFilterButton.addEventListener('click', () => hideMenu(mobileFilterMenu));
  closeSortButton.addEventListener('click', () => hideMenu(mobileSortMenu));

  mobileApplyButton.addEventListener('click', () => {
    hideMenu(mobileFilterMenu);
    applyFilters();
  });

  mobileClearButton.addEventListener('click', clearFilters);

  document.querySelectorAll('input[name="sort"]').forEach(option => {
    option.addEventListener('change', () => {
      sortAndRenderProducts();
      if (window.innerWidth <= 800) hideMenu(mobileSortMenu);
    });
  });

  document.querySelectorAll('input[name="color"], input[name="size"], input[name="price"]').forEach(input => {
    input.addEventListener('change', applyFilters);
  });

  document.querySelector(".load_more")?.addEventListener("click", loadMoreProducts);
}

function toggleMenu(menu: HTMLElement) {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function hideMenu(menu: HTMLElement) {
  menu.style.display = 'none';
}

function clearFilters() {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox: HTMLInputElement) => {
    checkbox.checked = false;
  });
  applyFilters();
}

function loadMoreProducts() {
  const currentCount = document.querySelectorAll('.cardProduct').length;
  renderProducts(productsList.slice(0, currentCount + 5));
  
  if (currentCount + 5 >= productsList.length) {
    document.querySelector(".load_more")!.style.display = "none";
  }
}

function applyFilters() {
  const filteredProducts = productsList.filter(product => {
    const selectedColors = getSelectedValues('color');
    const selectedSizes = getSelectedValues('size');
    const selectedPrices = getSelectedValues('price');

    return (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
           (selectedSizes.length === 0 || selectedSizes.some(size => product.size.includes(size))) &&
           (selectedPrices.length === 0 || selectedPrices.some(price => {
             const [min, max] = price.split("-").map(Number);
             return product.price >= min && (max === undefined || product.price <= max);
           }));
  });
  sortAndRenderProducts(filteredProducts);
}

function getSelectedValues(name: string): string[] {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input: HTMLInputElement) => input.value);
}

function sortAndRenderProducts(products: Product[] = productsList) {
  const selectedSortOption = (document.querySelector('input[name="sort"]:checked') as HTMLInputElement)?.value;

  products.sort((a, b) => {
    switch (selectedSortOption) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  renderProducts(products);
}

function renderProducts(products: Product[]) {
  const productContainer = document.querySelector(".listProducts__list ul") as HTMLElement;
  productContainer.innerHTML = "";

  products.forEach(product => {
    const productCard = createProductCard(product);
    productContainer.appendChild(productCard);
  });
}

function createProductCard(product: Product): HTMLElement {
  const productCard = document.createElement("div");
  productCard.classList.add("cardProduct");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  const name = document.createElement("h2");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `R$ ${product.price}`;

  const installment = document.createElement("span");
  installment.textContent = `até ${product.parcelamento[0]}x de ${product.parcelamento[1]}`;

  const buyBtn = document.createElement("button");
  buyBtn.textContent = "comprar";
  buyBtn.onclick = () => addToCart(product);

  productCard.append(img, name, price, installment, buyBtn);
  return productCard;
}

function addToCart(product: Product) {
  cart.push(product);
  updateCartButton();
}

function updateCartButton() {
  const cartBtn = document.querySelector('.btn_bag') as HTMLElement;
  let itemCount = cartBtn.querySelector('.contador') as HTMLElement;

  if (!itemCount) {
    itemCount = document.createElement('span');
    itemCount.classList.add('contador');
    cartBtn.appendChild(itemCount);
  }

  itemCount.textContent = cart.length.toString();
}
