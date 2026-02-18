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

// View product function (global for onclick)
function viewProduct(id) {
    window.location.href = `product-details.html?id=${id}`;
}

// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');
    const hero = document.querySelector('.hero-slider');
    
    let currentSlide = 0;
    let slideInterval = null;
    let dots = [];

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        if (dots.length) {
            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');
        }
    }

    function resetInterval() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        if (slides.length > 0) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    function nextSlide() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        resetInterval();
    }

    function prevSlide() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        resetInterval();
    }

    if (slides.length > 0) {
        showSlide(0); // Set first slide as active
        
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            dots = Array.from({ length: slides.length }).map((_, i) => {
                const b = document.createElement('button');
                b.setAttribute('aria-label', `Go to slide ${i + 1}`);
                b.addEventListener('click', () => {
                    currentSlide = i;
                    showSlide(currentSlide);
                    resetInterval();
                });
                dotsContainer.appendChild(b);
                return b;
            });
            if (dots[0]) dots[0].classList.add('active');
        }

        // Add event listeners only if buttons exist
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        slideInterval = setInterval(nextSlide, 5000);

        if (hero) {
            let startX = 0;
            let diff = 0;
            hero.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });
            hero.addEventListener('touchmove', (e) => {
                diff = e.touches[0].clientX - startX;
            }, { passive: true });
            hero.addEventListener('touchend', () => {
                if (Math.abs(diff) > 40) {
                    if (diff < 0) nextSlide();
                    else prevSlide();
                }
                diff = 0;
            });
        }
    }

    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        function displayProducts() {
            productGrid.innerHTML = products.map(product => `
                <div class="product-card" data-id="${product.id}" onclick="viewProduct(${product.id})">
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
                        <button class="add-to-cart" aria-label="Add ${product.name} to cart">
                            <i class="fas fa-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }
        displayProducts();
    }

    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');

    if (menuToggle && menuOverlay && menuClose) {
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
    }

    const themeToggle = document.getElementById('themeToggle');
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-theme');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    const revealEls = document.querySelectorAll('.reveal, .product-card');
    if (revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => io.observe(el));
    }

    const cartCountEl = document.querySelector('.cart-count');
    const cartIconEl = document.querySelector('.cart-icon');
    function getCart() {
        try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
    }
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    function updateCartCount() {
        const count = getCart().reduce((acc, item) => acc + (item.qty || 1), 0);
        if (cartCountEl) cartCountEl.textContent = String(count);
    }
    updateCartCount();

    function flyToCart(fromImg) {
        if (!fromImg || !cartIconEl) return;
        const imgRect = fromImg.getBoundingClientRect();
        const iconRect = cartIconEl.getBoundingClientRect();
        const clone = fromImg.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = imgRect.left + 'px';
        clone.style.top = imgRect.top + 'px';
        clone.style.width = imgRect.width + 'px';
        clone.style.height = imgRect.height + 'px';
        clone.style.borderRadius = '12px';
        clone.style.zIndex = '3000';
        clone.style.transition = 'transform 600ms ease, opacity 600ms ease';
        document.body.appendChild(clone);
        const dx = iconRect.left - imgRect.left;
        const dy = iconRect.top - imgRect.top;
        const scale = 0.1;
        requestAnimationFrame(() => {
            clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
            clone.style.opacity = '0.4';
        });
        setTimeout(() => {
            clone.remove();
            cartIconEl.style.transform = 'scale(1.1)';
            setTimeout(() => { cartIconEl.style.transform = ''; }, 120);
        }, 650);
    }

    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart');
            if (!btn) return;
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const id = Number(card?.getAttribute('data-id'));
            const product = products.find(p => p.id === id);
            if (!product) return;
            const cart = getCart();
            const existing = cart.find(i => i.id === id);
            if (existing) existing.qty = (existing.qty || 1) + 1;
            else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
            saveCart(cart);
            updateCartCount();
            const img = card.querySelector('.product-image');
            flyToCart(img);
        });
    }

    if (productGrid) {
        productGrid.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 8;
            const rotateX = ((y / rect.height) - 0.5) * -8;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        productGrid.addEventListener('mouseleave', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            card.style.transform = '';
        });
    }

});
