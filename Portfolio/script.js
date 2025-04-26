// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Typing animation for hero section
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Dynamic type effect for roles with smooth timing
const roles = ['Python Programmer', 'AI/ML Engineer', 'Content Creator', 'Gamer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeText = document.querySelector('.type-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typeText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        delay = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = typingSpeed;
    }
    
    setTimeout(typeEffect, delay);
}

typeEffect();

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create a new contact entry
    const newContactRef = database.ref('contacts').push();
    newContactRef.set({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    })
    .then(() => {
        // Show success message
        alert('Message sent successfully!');
        contactForm.reset();
    })
    .catch((error) => {
        // Show error message
        alert('Error sending message: ' + error.message);
    });
});