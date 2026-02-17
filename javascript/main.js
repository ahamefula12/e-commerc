// Products Data
const products = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        description: "Timeless denim jacket perfect for any season"
    },
    {
        id: 2,
        name: "Summer Floral Dress",
        price: 65.99,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
        description: "Light and breezy floral dress for summer days"
    },
    {
        id: 3,
        name: "Casual White Sneakers",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
        description: "Comfortable white sneakers for everyday wear"
    },
    {
        id: 4,
        name: "Leather Handbag",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
        description: "Elegant leather handbag with spacious interior"
    },
    {
        id: 5,
        name: "Striped Cotton T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        description: "Comfortable cotton t-shirt with classic stripes"
    },
    {
        id: 6,
        name: "High-Waist Jeans",
        price: 75.99,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
        description: "Stylish high-waist jeans with perfect fit"
    },
    {
        id: 7,
        name: "Wool Blend Coat",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400",
        description: "Warm wool blend coat for cold weather"
    },
    {
        id: 8,
        name: "Silk Scarf",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400",
        description: "Luxurious silk scarf with elegant patterns"
    },
    {
        id: 9,
        name: "Athletic Joggers",
        price: 55.99,
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400",
        description: "Comfortable joggers for workout or casual wear"
    },
    {
        id: 10,
        name: "Knit Sweater",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
        description: "Cozy knit sweater for chilly evenings"
    },
    {
        id: 11,
        name: "Leather Ankle Boots",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
        description: "Stylish leather ankle boots for any occasion"
    },
    {
        id: 12,
        name: "Plaid Shirt",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
        description: "Classic plaid shirt in soft cotton fabric"
    },
    {
        id: 13,
        name: "Maxi Skirt",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400",
        description: "Flowing maxi skirt perfect for summer"
    },
    {
        id: 14,
        name: "Blazer Jacket",
        price: 139.99,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
        description: "Professional blazer for business or casual"
    },
    {
        id: 15,
        name: "Crossbody Bag",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
        description: "Compact crossbody bag for on-the-go style"
    }
];

// Store products in localStorage
localStorage.setItem('products', JSON.stringify(products));

// Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Display Products
const productGrid = document.getElementById('productGrid');

function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${(Math.random() * (5 - 4) + 4).toFixed(1)}</span>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">₦${product.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

function viewProduct(id) {
    window.location.href = `product-details.html?id=${id}`;
}

displayProducts();


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

// Close menu when clicking outside
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
    }
});
