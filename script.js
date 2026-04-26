// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 500);
});

// ========== TYPED TEXT ANIMATION ==========
const typedTextSpan = document.querySelector('.typed-text');
const roles = ['AI/ML Engineer', 'Frontend Developer', 'Computer Vision Enthusiast', 'Generative AI Explorer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

// ========== CURSOR FOLLOWER ==========
const cursor = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Add hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .cert-card, .info-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ========== HEADER SCROLL EFFECT ==========
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== MOBILE MENU ==========
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon?.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon?.classList.remove('active');
        navbar?.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.project-card, .timeline-item, .cert-card, .info-card, .about-card, .about-text');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        showFormStatus('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showFormStatus('Sending message...', 'loading');
    
    setTimeout(() => {
        showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    }, 1500);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.style.color = type === 'error' ? '#ff4444' : type === 'success' ? '#0ef' : '#ffaa00';
        formStatus.style.fontSize = '14px';
        
        setTimeout(() => {
            if (type !== 'loading') {
                formStatus.textContent = '';
            }
        }, 4000);
    }
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== PARALLAX EFFECT ON HOME ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const homeImage = document.querySelector('.image-wrapper');
    const homeContent = document.querySelector('.home-content');
    
    if (homeImage && scrolled < window.innerHeight) {
        homeImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (homeContent && scrolled < window.innerHeight) {
        homeContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ========== DYNAMIC YEAR IN FOOTER ==========
const footerYear = document.querySelector('.footer-content p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${new Date().getFullYear()} Sakshi Pagare. All rights reserved.`;
}

// ========== PREVENT RIGHT CLICK (Optional - uncomment if needed) ==========
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// ========== CONSOLE GREETING ==========
console.log('%c👋 Welcome to Sakshi Pagare\'s Portfolio!', 'color: #0ef; font-size: 18px; font-weight: bold;');
console.log('%cExplore my work and feel free to connect!', 'color: #8892b0; font-size: 14px;');