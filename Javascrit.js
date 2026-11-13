// PRODUCT INFORMATION

const products = [

    {
        id: 1,
        name: "Smartphone",
        category: "Electronics",
        price: 15000,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        description: "A modern smartphone for communication, entertainment and everyday use."
    },

    {
        id: 2,
        name: "Laptop",
        category: "Electronics",
        price: 45000,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        description: "A laptop suitable for studying, working and entertainment."
    },

    {
        id: 3,
        name: "Headphones",
        category: "Electronics",
        price: 2500,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        description: "Comfortable headphones for music and videos."
    },

    {
        id: 4,
        name: "Ladies Handbag",
        category: "Fashion",
        price: 1800,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        description: "A stylish handbag suitable for everyday use."
    },

    {
        id: 5,
        name: "Sneakers",
        category: "Fashion",
        price: 3500,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        description: "Casual sneakers designed for everyday comfort."
    },

    {
        id: 6,
        name: "Wrist Watch",
        category: "Fashion",
        price: 2200,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        description: "A stylish wrist watch for everyday use."
    },

    {
        id: 7,
        name: "Blender",
        category: "Home",
        price: 4200,
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500",
        description: "A kitchen blender for preparing drinks and mixtures."
    },

    {
        id: 8,
        name: "Coffee Maker",
        category: "Home",
        price: 5500,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
        description: "A coffee maker for preparing coffee at home."
    },

    {
        id: 9,
        name: "Skincare Products",
        category: "Beauty",
        price: 2000,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500",
        description: "Skincare products for everyday routines."
    },

    {
        id: 10,
        name: "Perfume",
        category: "Beauty",
        price: 3000,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
        description: "A fragrance suitable for everyday use."
    }

];


// SHOPPING CART FUNCTIONS

function getCart() {
    return JSON.parse(localStorage.getItem("cateMartCart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cateMartCart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {

    const count = getCart().reduce(
        (sum, item) => sum + item.quantity, 0
    );

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = count;
    });

}

function addToCart(id) {

    const cart = getCart();

    const product = products.find(
        product => product.id === Number(id)
    );

    if (!product) return;

    const found = cart.find(item => item.id === product.id);

    if (found) {
        found.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);

    alert(product.name + " added to your cart.");

}

function changeQuantity(id, change) {

    let cart = getCart();

    let item = cart.find(
        product => product.id === Number(id)
    );

    if (item) {
        item.quantity += change;
    }

    cart = cart.filter(product => product.quantity > 0);

    saveCart(cart);

    if (document.getElementById("cartItems")) {
        renderCart();
    }

}

function removeFromCart(id) {

    saveCart(
        getCart().filter(product => product.id !== Number(id))
    );

    if (document.getElementById("cartItems")) {
        renderCart();
    }

}

function cartTotal(cart = getCart()) {

    return cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

}

function money(amount) {

    return "KSh " + Number(amount).toLocaleString("en-KE");

}


// PRODUCT DISPLAY

function productCard(product) {

    return `
        <article class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <p class="price">${money(product.price)}</p>

            <a class="button"
               href="product-details.html?id=${product.id}">
               View Details
            </a>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

        </article>
    `;

}

function renderProducts(list, targetId) {

    const target = document.getElementById(targetId);

    if (!target) return;

    target.innerHTML = list.length
        ? list.map(productCard).join("")
        : "<p>No products found.</p>";

}


// DISPLAY SHOPPING CART

function renderCart() {

    const target = document.getElementById("cartItems");

    if (!target) return;

    const cart = getCart();

    target.innerHTML = cart.length

        ? cart.map(item => `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div>
                    <h3>${item.name}</h3>
                    <p>${money(item.price)} each</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>

                <div>

                    <button onclick="changeQuantity(${item.id},1)">+</button>

                    <button onclick="changeQuantity(${item.id},-1)">-</button>

                    <button onclick="removeFromCart(${item.id})">
                        Remove
                    </button>

                </div>

            </div>

        `).join("")

        : "<p>Your shopping cart is empty.</p>";

    const total = document.getElementById("cartTotal");

    if (total) {
        total.textContent = money(cartTotal());
    }

}


// CHECKOUT SUMMARY

function renderCheckout() {

    const summary = document.getElementById("checkoutSummary");

    if (!summary) return;

    const cart = getCart();

    summary.innerHTML = cart.length

        ? cart.map(item => `
            <p>
                ${item.name} × ${item.quantity}
                — ${money(item.price * item.quantity)}
            </p>
        `).join("")

        : "<p>Your cart is empty.</p>";

    document.getElementById("checkoutTotal").textContent =
        money(cartTotal());

}


// DISPLAY MESSAGES

function showMessage(id, message) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = message;
    }

}


// CUSTOMER REGISTRATION

function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();

    const email = document.getElementById("registerEmail")
        .value.trim().toLowerCase();

    const password = document.getElementById("registerPassword").value;

    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {

        showMessage("registerMessage", "Passwords do not match.");

        return;
    }

    // Demonstration only. Real accounts need a secure backend.

    localStorage.setItem(
        "cateMartDemoUser",
        JSON.stringify({ name, email })
    );

    showMessage(
        "registerMessage",
        "Demo registration successful. You can now log in."
    );

    event.target.reset();

}


// CUSTOMER LOGIN

function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail")
        .value.trim().toLowerCase();

    const user = JSON.parse(
        localStorage.getItem("cateMartDemoUser") || "null"
    );

    if (user && user.email === email) {

        showMessage(
            "loginMessage",
            `Welcome, ${user.name}! Demo login successful.`
        );

    } else {

        showMessage(
            "loginMessage",
            "No demo account found for that email. Please register first."
        );

    }

}


// CONTACT FORM

function sendMessage(event) {

    event.preventDefault();

    showMessage(
        "contactResponse",
        "Thank you. Your message has been received in this demonstration."
    );

    event.target.reset();

}


// PLACE ORDER

function placeOrder(event) {

    event.preventDefault();

    const cart = getCart();

    if (!cart.length) {

        showMessage(
            "orderMessage",
            "Your cart is empty. Add products before placing an order."
        );

        return;
    }

    const orderNo = "CM" + Date.now();

    localStorage.removeItem("cateMartCart");

    updateCartCount();

    document.getElementById("checkoutSummary").innerHTML =
        "<p>Your cart is now empty.</p>";

    document.getElementById("checkoutTotal").textContent = money(0);

    showMessage(
        "orderMessage",
        `Demo order ${orderNo} placed. No payment was processed.`
    );

    event.target.reset();

}


// INITIALIZE WEBSITE

function initPage() {

    updateCartCount();

    const home = document.getElementById("homeProducts");

    if (home) {
        renderProducts(products.slice(0, 4), "homeProducts");
    }

    const all = document.getElementById("allProducts");

    if (all) {

        const params = new URLSearchParams(location.search);

        const category = params.get("category");

        renderProducts(
            category
                ? products.filter(product => product.category === category)
                : products,
            "allProducts"
        );

    }

    const filter = document.getElementById("categoryFilter");

    if (filter) {

        filter.addEventListener("change", () => {

            const value = filter.value;

            renderProducts(
                value === "All"
                    ? products
                    : products.filter(product => product.category === value),
                "allProducts"
            );

        });

    }

    const search = document.getElementById("searchInput");

    if (search) {

        search.addEventListener("input", () => {

            const query = search.value.toLowerCase();

            renderProducts(
                products.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                ),
                "allProducts"
            );

        });

    }

    const details = document.getElementById("detailsContent");

    if (details) {

        const id = Number(
            new URLSearchParams(location.search).get("id")
        );

        const product = products.find(item => item.id === id);

        details.innerHTML = product

            ? `
                <img src="${product.image}" alt="${product.name}">

                <div class="details-info">

                    <h2>${product.name}</h2>

                    <p><b>Category:</b> ${product.category}</p>

                    <p class="price">${money(product.price)}</p>

                    <p>${product.description}</p>

                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                    <a class="button" href="products.html">
                        Back to Products
                    </a>

                </div>
            `

            : `
                <p>
                    Product not found.
                    <a href="products.html">Browse products</a>.
                </p>
            `;

    }

    if (document.getElementById("cartItems")) {
        renderCart();
    }

    if (document.getElementById("checkoutSummary")) {
        renderCheckout();
    }

}

document.addEventListener("DOMContentLoaded", initPage);