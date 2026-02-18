// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // --- Menu Toggle ---
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

    // --- Load User Profile ---
    function loadUserProfile() {
        // Try to get user from localStorage (set during login)
        const loggedInUser = localStorage.getItem('loggedInUser');
        const savedPhoto = localStorage.getItem('profilePhoto');
        
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            
            // Update sidebar
            document.getElementById('userName').textContent = user.name || 'User';
            
            // Update profile information
            document.getElementById('profileName').textContent = user.name || 'Not provided';
            document.getElementById('profileEmail').textContent = user.email || 'Not provided';
            document.getElementById('profilePhone').textContent = user.phone || 'Not provided';
        } else {
            // Guest user – keep default placeholder values
            // Optionally, you could redirect to login page
            // window.location.href = 'login.html';
        }
        // Apply saved profile photo if exists
        const img = document.getElementById('profilePhoto');
        if (img && savedPhoto) {
            img.src = savedPhoto;
        }
    }

    loadUserProfile();

    // --- Avatar Upload ---
    const avatarInput = document.getElementById('avatarInput');
    const avatarAdd = document.getElementById('avatarAdd');
    if (avatarAdd && avatarInput) {
        avatarAdd.addEventListener('click', (e) => {
            e.preventDefault();
            avatarInput.click();
        });
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const dataUrl = ev.target.result;
                const img = document.getElementById('profilePhoto');
                if (img && typeof dataUrl === 'string') {
                    img.src = dataUrl;
                    try {
                        localStorage.setItem('profilePhoto', dataUrl);
                    } catch (_) {
                        // Ignore quota errors
                    }
                }
            };
            reader.readAsDataURL(file);
        });
    }

    // --- Update Cart Count (if any) ---
    function updateCartCount() {
        let cart = [];
        try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch { cart = []; }
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalItems = cart.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0);
        
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
        });
    }
    
    updateCartCount();

    // --- Logout Function ---
    window.logout = function() {
        // Clear logged in user from localStorage
        localStorage.removeItem('loggedInUser');
        // Optionally clear cart or other session data
        // Redirect to home or login page
        window.location.href = 'index.html';
    };
});
