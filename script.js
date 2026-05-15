const products = [
  {
    id: 1,
    name: "Himalayan Salt Phool Makhana",
    shortName: "Himalayan Salt",
    category: "makhana",
    label: "Phool Makhana",
    price: 5.99,
    tag: "Simple • Savory • Crisp",
    description: "A clean and classic flavor that lets the natural crunch of makhana shine.",
    image: "images/PMHIMSALT.jpeg",
    featured: true
  },
  {
    id: 2,
    name: "Peri Peri Phool Makhana",
    shortName: "Peri Peri",
    category: "makhana",
    label: "Phool Makhana",
    price: 6.49,
    tag: "Spicy • Tangy • Bold",
    description: "A fiery, zesty version for snackers who want more punch in every bite.",
    image: "images/PMPERIPERI.jpeg",
    featured: true
  },
  {
    id: 3,
    name: "Pudina Masala Phool Makhana",
    shortName: "Pudina Masala",
    category: "makhana",
    label: "Phool Makhana",
    price: 6.29,
    tag: "Fresh • Herby • Flavorful",
    description: "A refreshing blend of herbs and spice for a bright, everyday snack experience.",
    image: "images/PMPudina.jpg",
    featured: true
  },
  {
    id: 4,
    name: "Caramel Jaggery Phool Makhana",
    shortName: "Caramel Jaggery",
    category: "makhana",
    label: "Phool Makhana",
    price: 6.79,
    tag: "Sweet • Toasted • Cozy",
    description: "A warm, lightly sweet take on makhana for softer cravings and balanced indulgence.",
    image: "images/PMCaramel.jpg",
    featured: false
  },
  {
    id: 5,
    name: "Ragi Thattai",
    shortName: "Ragi Thattai",
    category: "millet",
    label: "Millet Snacks",
    price: 5.49,
    tag: "Cookies • Crisp • Traditional",
    description: "A millet-based savory cookie format with a familiar crunch and a more grounded pantry story.",
    image: "images/Ragi.jpeg",
    featured: true
  },
  {
    id: 6,
    name: "Millet Chivda",
    shortName: "Millet Chivda",
    category: "millet",
    label: "Millet Snacks",
    price: 5.79,
    tag: "Namkeen • Crunchy • Snackable",
    description: "A millet-led namkeen mix designed for teatime, hosting, or easy crunchy snacking.",
    image: "images/Chivda.jpeg",
    featured: true
  },
  {
    id: 7,
    name: "Millet Cereal",
    shortName: "Millet Cereal",
    category: "millet",
    label: "Millet Snacks",
    price: 7.49,
    tag: "Breakfast • Pantry • Versatile",
    description: "A more pantry-staple style product that helps broaden Root & Roast beyond pure snack moments.",
    image: "images/cereal.jpg",
    featured: false
  },
  {
    id: 8,
    name: "Millet Crackers",
    shortName: "Millet Crackers",
    category: "millet",
    label: "Millet Snacks",
    price: 5.99,
    tag: "Crisp • Savory • Everyday",
    description: "Crisp crackers built around millet for simple snacking, dips, and pantry repeatability.",
    image: "images/crackers.jpeg",
    featured: false
  },
  {
    id: 9,
    name: "Millet Puffs",
    shortName: "Millet Puffs",
    category: "millet",
    label: "Millet Snacks",
    price: 5.29,
    tag: "Light • Airy • Fun",
    description: "A lighter-format millet snack that keeps the collection feeling playful and family friendly.",
    image: "images/puffs.jpg",
    featured: false
  }
];

const productGrid = document.getElementById("productGrid");
const featuredGrid = document.getElementById("featuredGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const shopFilterButtons = document.querySelectorAll(".shop-filter-btn");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItemsContainer = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");

const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

const CART_KEY = "root-and-roast-cart";
let currentFilter = "all";
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function getFilteredProducts(filter) {
  if (filter === "all") return products;
  if (filter === "featured") return products.filter(product => product.featured);
  return products.filter(product => product.category === filter);
}

function createProductCard(product) {
  return `
    <article class="product-card reveal active">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <span class="product-badge">${product.featured ? "Bestseller" : product.label}</span>
      </div>
      <div class="product-body">
        <span class="product-category">${product.label}</span>
        <h3 class="product-name">${product.shortName}</h3>
        <p class="product-desc">${product.description}</p>
        <span class="product-tag">${product.tag}</span>
        <div class="product-meta">
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="btn btn-primary add-cart-btn" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderFeaturedProducts() {
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  featuredGrid.innerHTML = featuredProducts.map(createProductCard).join("");
}

function renderProducts(filter = "all") {
  currentFilter = filter;
  const filteredProducts = getFilteredProducts(filter);
  productGrid.innerHTML = filteredProducts.map(createProductCard).join("");

  filterButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      shortName: product.shortName,
      price: product.price,
      image: product.image,
      label: product.label,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  openCart();
}

function updateCartQuantity(productId, change) {
  const item = cart.find(product => product.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <span>Add some snacks to get started.</span>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <article class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div>
          <h4 class="cart-item-title">${item.shortName}</h4>
          <div class="cart-item-sub">${item.label} • ${formatPrice(item.price)}</div>

          <div class="cart-item-bottom">
            <div class="qty-controls">
              <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
            </div>

            <button class="remove-btn" data-action="remove" data-id="${item.id}">
              Remove
            </button>
          </div>
        </div>
      </article>
    `).join("");
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartSubtotal.textContent = formatPrice(subtotal);
  cartCount.textContent = totalItems;
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest(".add-cart-btn");
  if (!button) return;

  const productId = Number(button.dataset.productId);
  addToCart(productId);
});

featuredGrid.addEventListener("click", event => {
  const button = event.target.closest(".add-cart-btn");
  if (!button) return;

  const productId = Number(button.dataset.productId);
  addToCart(productId);
});

cartItemsContainer.addEventListener("click", event => {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;

  const productId = Number(actionTarget.dataset.id);
  const action = actionTarget.dataset.action;

  if (action === "increase") updateCartQuantity(productId, 1);
  if (action === "decrease") updateCartQuantity(productId, -1);
  if (action === "remove") removeFromCart(productId);
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    renderProducts(button.dataset.filter);
  });
});

shopFilterButtons.forEach(button => {
  button.addEventListener("click", () => {
    renderProducts(button.dataset.shopFilter);
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });
});

cartButton.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("This is a front-end demo cart. Add a backend or Shopify/Stripe integration later for real checkout.");
});

newsletterForm.addEventListener("submit", event => {
  event.preventDefault();

  const emailValue = emailInput.value.trim();

  if (!emailValue) {
    alert("Please enter your email address.");
    return;
  }

  alert("Thanks for joining the Root & Roast list!");
  emailInput.value = "";
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(element => revealObserver.observe(element));

document.getElementById("year").textContent = new Date().getFullYear();

renderFeaturedProducts();
renderProducts(currentFilter);
renderCart();