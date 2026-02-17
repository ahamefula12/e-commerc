// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbotClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatbotMessages = document.getElementById('chatbotMessages');

// Chatbot responses
const botResponses = {
    'hello': 'Hello! How can I assist you today?',
    'hi': 'Hi there! What can I help you with?',
    'help': 'I can help you with orders, shipping, returns, and general inquiries. What do you need?',
    'order': 'To track your order, please provide your order number.',
    'shipping': 'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days.',
    'return': 'We accept returns within 30 days of purchase. Items must be unworn with tags attached.',
    'hours': 'Our business hours are Monday to Friday, 9:00 AM to 6:00 PM.',
    'contact': 'You can reach us at +1 (555) 123-4567 or email info@fashionstore.com',
    'price': 'Our products range from $29.99 to $159.99. Check our website for current prices.',
    'payment': 'We accept all major credit cards, PayPal, and Apple Pay.',
    'size': 'We offer sizes from XS to XL. Check our size guide for detailed measurements.',
    'default': 'Thank you for your message. A customer service representative will assist you shortly.'
};

chatbotToggle.addEventListener('click', () => {
    chatbot.classList.add('active');
});

chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('active');
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Display user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    userMessageDiv.innerHTML = `<p>${message}</p>`;
    chatbotMessages.appendChild(userMessageDiv);
    
    chatInput.value = '';
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Get bot response
    setTimeout(() => {
        const response = getBotResponse(message.toLowerCase());
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'bot-message';
        botMessageDiv.innerHTML = `<p>${response}</p>`;
        chatbotMessages.appendChild(botMessageDiv);
        
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 1000);
}

function getBotResponse(message) {
    for (let key in botResponses) {
        if (message.includes(key)) {
            return botResponses[key];
        }
    }
    return botResponses['default'];
}

chatSend.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});


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
