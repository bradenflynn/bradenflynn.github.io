// Navigation Toggle for Mobile
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll with Offset for Fixed Nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Nav Background on Scroll
let lastScroll = 0;
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.background = 'hsla(220, 20%, 12%, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'hsla(220, 20%, 20%, 0.4)';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// Add hover effect to contact links
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.background = 'hsla(220, 90%, 60%, 0.1)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.background = 'hsla(220, 20%, 20%, 0.4)';
    });
});

// Typing Effect for Hero Subtitle (Optional Enhancement)
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing after page load
    setTimeout(typeWriter, 500);
}

// Add stagger animation to skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Cursor Trail Effect (Subtle)
const coords = { x: 0, y: 0 };

if (window.innerWidth > 768) {
    // Create fewer, more subtle cursor trail elements
    for (let i = 0; i < 8; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: linear-gradient(135deg, hsl(220, 90%, 60%), hsl(280, 80%, 65%));
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(circle);
    }

    const circleElements = document.querySelectorAll('.circle');

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circleElements.forEach((circle, index) => {
            circle.style.left = x - 2 + 'px';
            circle.style.top = y - 2 + 'px';
            circle.style.opacity = (8 - index) / 80; // Much more subtle
            circle.style.transform = `scale(${(8 - index) / 10})`;

            const nextCircle = circleElements[index + 1] || circleElements[0];
            x += (nextCircle.offsetLeft - x) * 0.3;
            y += (nextCircle.offsetTop - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// Click Ripple Animation
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = (e.clientX - 50) + 'px';
    ripple.style.top = (e.clientY - 50) + 'px';
    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress-circle');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        const circumference = 126; // 2 * π * r (r=20)
        const offset = circumference - (scrollPercent / 100) * circumference;
        scrollProgress.style.strokeDashoffset = offset;
    });
}

// Performance: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduce-motion');
}

console.log('🚀 Landing page loaded successfully!');
