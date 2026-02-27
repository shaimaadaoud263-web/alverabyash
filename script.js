let cart = [];
const discountPercent = 25;
const discountEndDate = new Date("2026-03-06");
const discountBox = document.getElementById("discount-box");

    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');
    const cartCountElement = document.getElementById('cart-count');
    const openCartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');

    // --- ANIMATIONS ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));


    // --- NAVIGATION ---
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Check if cart is open, close it first
            closeCart();
            alert("Mobile Menu Functionality Placeholder");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- CART FUNCTIONALITY ---

    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    function updateCartUI() {
        cartCountElement.innerText = cart.length;

        let total = 0;
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your bag is currently empty.</p>';
        } else {
            cart.forEach((item, index) => {
                total += parseFloat(item.price);

                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span class="cart-item-price">${item.price}EGP</span>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        let subtotal = total;
let finalTotal = subtotal;

if (new Date() <= discountEndDate && subtotal > 0) {

    const discountAmount = subtotal * discountPercent / 100;
    finalTotal = subtotal - discountAmount;

    discountBox.innerHTML = `
        <div style="color:#d63384; font-weight:bold;">
            🎉 Grand Opening Offer (EGP{discountPercent}% OFF)
        </div>
        <div style="text-decoration: line-through; color: gray;">
            EGP{subtotal.toFixed(2)} EGP
        </div>
        <div style="color: green; font-size:18px; font-weight:bold;">
            You Save EGP{discountAmount.toFixed(2)} EGP
        </div>
    `;
} else {
    discountBox.innerHTML = "";
}

cartTotalElement.textContent = finalTotal.toFixed(2) + " EGP";
}
    function addToCart(name, price, img) {
        cart.push({ name, price, img });
        updateCartUI();
        openCart(); // Auto open cart when adding
    }

    // Event Listeners
    if (openCartBtn) openCartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Buy Buttons
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-product');
            const price = e.target.getAttribute('data-price');
            const img = e.target.getAttribute('data-img');

            // Visual feedback on button
            const originalText = e.target.innerText;
            e.target.innerText = "Adding...";

            setTimeout(() => {
                addToCart(name, price, img);
                e.target.innerText = originalText;
            }, 500);
        });
    });

    // Newsletter
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = "Welcome to the Family";
            btn.style.backgroundColor = "#8B5E3C";
            form.querySelector('input').value = "";
        });
    }

    // Checkout Functionality
    const checkoutBtn = document.querySelector('.cart-footer .btn-primary');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Your bag is empty.");
                return;
            }

            const originalText = checkoutBtn.innerText;
            checkoutBtn.innerText = "Processing...";

            setTimeout(() => {
                alert("Thank you for your order! This is a demo transaction.");
                cart = [];
                updateCartUI();
                closeCart();
                checkoutBtn.innerText = originalText;
            }, 1000);
        });
    }
});









