// Redirect to index.html after 8 seconds
setTimeout(() => {
    const splashScreen = document.querySelector('.splash-screen');
    splashScreen.classList.add('fade-out');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}, 8000);
