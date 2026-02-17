// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Get products from localStorage
const products = JSON.parse(localStorage.getItem('products')) || [];

// Find the product
const product = products.find(p => p.id === productId);

const productDetailContainer = document.getElementById('productDetail');

// Product images for slider (4 different angles/views)
const productImages = [
    product?.image,
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    "https://images.unsplash.com/photo-1558769132-cb1aea1c8347?w=800",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800"
];

if (product) {
    productDetailContainer.innerHTML = `
        <div class="product-image-slider">
            <div class="slider-wrapper">
                ${productImages.map((img, index) => `
                    <div class="product-slide ${index === 0 ? 'active' : ''}">
                        <img src="${img}" alt="${product.name}">
                    </div>
                `).join('')}
            </div>
            <button class="product-slider-btn prev"><i class="fas fa-chevron-left"></i></button>
            <button class="product-slider-btn next"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="product-detail-info">
            <h1>${product.name}</h1>
            <div class="product-detail-price">₦${product.price.toLocaleString()}</div>
            <p class="product-detail-description">${product.description}</p>
            
            <div class="product-quantity">
                <h3>Quantity:</h3>
                <div class="quantity-controls">
                    <button class="qty-btn minus" onclick="decreaseQty()"><i class="fas fa-minus"></i></button>
                    <input type="number" id="quantity" value="1" min="1" readonly>
                    <button class="qty-btn plus" onclick="increaseQty()"><i class="fas fa-plus"></i></button>
                </div>
            </div>
            
            <div class="product-actions">
                <button class="btn-primary" onclick="addToCart()">Add to Cart</button>
                <button class="btn-secondary" onclick="window.location.href='index.html'">Back to Shop</button>
            </div>
        </div>
    `;
    
    // Initialize product image slider
    initProductSlider();
} else {
    productDetailContainer.innerHTML = '<p class="loading">Product not found</p>';
}

// Quantity Controls
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    qtyInput.value = parseInt(qtyInput.value) + 1;
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

// Product Image Slider
function initProductSlider() {
    let currentProductSlide = 0;
    const productSlides = document.querySelectorAll('.product-slide');
    const productPrevBtn = document.querySelector('.product-slider-btn.prev');
    const productNextBtn = document.querySelector('.product-slider-btn.next');
    
    function showProductSlide(index) {
        productSlides.forEach(slide => slide.classList.remove('active'));
        productSlides[index].classList.add('active');
    }
    
    function nextProductSlide() {
        currentProductSlide = (currentProductSlide + 1) % productSlides.length;
        showProductSlide(currentProductSlide);
    }
    
    function prevProductSlide() {
        currentProductSlide = (currentProductSlide - 1 + productSlides.length) % productSlides.length;
        showProductSlide(currentProductSlide);
    }
    
    productNextBtn.addEventListener('click', nextProductSlide);
    productPrevBtn.addEventListener('click', prevProductSlide);
    
    // Auto slide every 4 seconds
    setInterval(nextProductSlide, 4000);
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    alert(`Added ${quantity} x ${product.name} to cart!`);
    
    // Update cart count
    let cartCount = parseInt(document.querySelector('.cart-count').textContent);
    document.querySelector('.cart-count').textContent = cartCount + quantity;
    
    // Save to cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

menuToggle.addEventListener('click', () => {
    menuOverlay.classList.add('active');
});

menuClose.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
});

menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
    }
});
