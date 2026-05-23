// ===========================
// Global Variables
// ===========================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// ===========================
// Preloader
// ===========================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 200);
    }
});
const contactForm = document.getElementById('contactForm');
const contactPhoneNumber = '918072499658';
const contactEmail = 'aasif772007@gmail.com';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const emailJsConfig = {
    publicKey: 'UyR77uBGy5jUzs9_O',
    serviceId: 'service_5bhot5e',
    templateId: 'template_dcy4jyc'
};

function getMissingEmailJsConfig() {
    return Object.entries(emailJsConfig)
        .filter(([, value]) => !value || value.startsWith('YOUR_'))
        .map(([key]) => key);
}

function initializeEmailJs() {
    if (!window.emailjs) return false;
    emailjs.init({
        publicKey: emailJsConfig.publicKey
    });
    return true;
}

// ===========================
// Signature Interaction Layer
// ===========================
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
}

function setupCursorGlow() {
    if (reducedMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener('pointermove', (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
    }, { passive: true });

    function animateGlow() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        document.body.style.setProperty('--mouse-x', `${currentX}px`);
        document.body.style.setProperty('--mouse-y', `${currentY}px`);
        window.requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

function setupMagneticCards() {
    if (reducedMotion) return;

    const cards = document.querySelectorAll(
        '.project-card, .skill-category, .service-card, .testimonial-card, .stat-card, .contact-form-card, .contact-info-card, .social-card'
    );

    cards.forEach(card => {
        card.classList.add('magnetic-card');

        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 8;
            const rotateX = ((0.5 - (y / rect.height)) * 8);

            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
        });
    });
}

setupScrollProgress();
setupCursorGlow();
setupMagneticCards();

// ===========================
// Navbar Scroll Effect
// ===========================
function handleNavbarScroll() {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ===========================
// Mobile Menu Toggle
// ===========================
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

navToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ===========================
// Smooth Scroll & Page Transition for Links
// ===========================
const allScrollLinks = document.querySelectorAll('a[href^="#"]');

allScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            e.preventDefault();
            const preloader = document.getElementById('preloader');
            
            if (preloader) {
                // Show preloader
                preloader.style.display = 'flex';
                setTimeout(() => {
                    preloader.classList.remove('fade-out');
                }, 10);
                
                // Wait for fade-in, then jump and fade out
                setTimeout(() => {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'auto'
                    });
                    
                    // Simulate processing time
                    setTimeout(() => {
                        preloader.classList.add('fade-out');
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 500);
                    }, 450);
                    
                }, 400);
            } else {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// Scroll Animations for Sections
// ===========================
const observerOptions = {
    threshold: 0.14,
    rootMargin: '0px 0px -80px 0px'
};

function setupRevealAnimations() {
    const revealSelectors = [
        '.section-header',
        '.about-content',
        '.education-card',
        '.stat-card',
        '.skill-category',
        '.project-card',
        '.timeline-item',
        '.service-card',
        '.testimonial-card',
        '.contact-form-card',
        '.contact-info-card',
        '.social-card',
        '.footer-content',
        '.footer-links'
    ];
    const revealElements = document.querySelectorAll(revealSelectors.join(','));

    revealElements.forEach((element, index) => {
        element.classList.add('reveal');

        if (
            element.classList.contains('stat-card') ||
            element.classList.contains('skill-category') ||
            element.classList.contains('service-card') ||
            element.classList.contains('testimonial-card')
        ) {
            element.classList.add('reveal-scale');
        }

        if (element.classList.contains('about-content') || element.classList.contains('contact-form-card')) {
            element.classList.add('reveal-left');
        }

        if (
            element.classList.contains('education-card') ||
            element.classList.contains('contact-info-card') ||
            element.classList.contains('social-card')
        ) {
            element.classList.add('reveal-right');
        }

        const localIndex = Array.from(element.parentElement.children).indexOf(element);
        const delay = Math.min(localIndex >= 0 ? localIndex * 90 : index * 35, 360);
        element.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(element => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => observer.observe(element));
}

setupRevealAnimations();

// ===========================
// Skill Progress Bar Animation
// ===========================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                
                // Animate the width
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, 100);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Initialize skill bar animations
animateSkillBars();

// ===========================
// Contact Form Validation and Submission
// ===========================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!window.emailjs) {
            alert('Email service is still loading. Please try again in a moment.');
            return;
        }

        const missingEmailJsConfig = getMissingEmailJsConfig();
        if (missingEmailJsConfig.length > 0) {
            alert(`EmailJS is not configured yet. Missing: ${missingEmailJsConfig.join(', ')}`);
            return;
        }

        initializeEmailJs();

        const formattedMessage = [
            'Portfolio Contact Request',
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            '',
            'Message:',
            message
        ].join('\n');

        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
            name,
            email,
            title: `Portfolio Contact Request from ${name}`,
            from_name: name,
            from_email: email,
            reply_to: email,
            to_email: contactEmail,
            message,
            formatted_message: formattedMessage,
            to_phone: `+${contactPhoneNumber}`
        })
            .then(() => {
                contactForm.reset();
                window.location.href = 'thank-you.html';
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                const errorMessage = error?.text || error?.message || 'Unknown EmailJS error';
                alert(`Sorry, the message could not be sent.\n\nEmailJS error: ${errorMessage}`);
            })
            .finally(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
    });
}

// ===========================
// Set Current Year in Footer
// ===========================
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ===========================
// Active Navigation Link Highlighting
// ===========================
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active-link'));
            
            // Add active class to current link
            if (correspondingLink) {
                correspondingLink.classList.add('active-link');
            }
        }
    });
}

// Optional: Add active class styling in CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active-link {
        color: var(--primary);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', highlightActiveNavLink);

// ===========================
// Parallax Effect for Hero Background Blobs (Optional)
// ===========================
const heroBackground = document.querySelector('.hero-background');
let ticking = false;

function updateHeroParallax() {
    if (heroBackground) {
        const yPos = window.pageYOffset * 0.08;
        heroBackground.style.transform = `translateY(${yPos}px)`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeroParallax);
        ticking = true;
    }
});

// ===========================
// Button Click Ripple Effect (Optional Enhancement)
// ===========================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleElement = button.querySelector('.ripple');
    if (rippleElement) {
        rippleElement.remove();
    }
    
    button.appendChild(ripple);
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// ===========================
// Lazy Loading for Images (if you add images)
// ===========================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

// ===========================
// Scroll to Top Button (Optional)
// ===========================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
    
    // Add styles
    const scrollBtnStyle = document.createElement('style');
    scrollBtnStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background-color: var(--primary);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background-color: var(--primary-dark);
            transform: translateY(-4px);
        }
    `;
    document.head.appendChild(scrollBtnStyle);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTopButton();

// ===========================
// Initialize on DOM Content Loaded
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    console.log('Designed & Developed by Mohammed Asif');
    
    // Initial navbar state
    handleNavbarScroll();
    
    // Initial active link highlighting
    highlightActiveNavLink();
});

// ===========================
// Performance Optimization
// ===========================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events for better performance
const debouncedHighlight = debounce(highlightActiveNavLink, 100);
window.addEventListener('scroll', debouncedHighlight);

// ===========================
// Accessibility Enhancements
// ===========================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Add focus indicators
const focusableElements = document.querySelectorAll('a, button, input, textarea');
focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

console.log('All scripts initialized! Portfolio is ready. 🚀');
