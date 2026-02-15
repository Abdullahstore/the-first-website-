// ========================================
// BESTER DEVELOPMENT - MAIN SCRIPT
// ========================================

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ========================================
// PRELOADER
// ========================================
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        delay: 2.2,
        ease: 'power2.inOut',
        onComplete: () => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto';
            initAnimations();
        }
    });
});

// Fallback if window load takes too long
setTimeout(() => {
    if (preloader.style.display !== 'none') {
        preloader.style.display = 'none';
        document.body.style.overflow = 'auto';
        initAnimations();
    }
}, 4000);

// ========================================
// CUSTOM CURSOR
// ========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let cursorX = 0, cursorY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;

    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
});

// Smooth cursor outline follow
function animateCursor() {
    outlineX += (cursorX - outlineX) * 0.15;
    outlineY += (cursorY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-card, .contact-card, .tech-icon, .filter-btn');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorOutline.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorOutline.classList.remove('hover');
    });
});

// ========================================
// NAVIGATION
// ========================================
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll header effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 200;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ========================================
// GSAP ANIMATIONS
// ========================================
function initAnimations() {
    // Hero Animations
    const heroTimeline = gsap.timeline();

    heroTimeline
        .from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.title-line', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-buttons .cta-btn', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-3d-card', {
            opacity: 0,
            scale: 0.8,
            rotateY: -30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6');

    // Services Section
    gsap.fromTo('.service-card',
        { opacity: 0, y: 60, rotateX: -15 },
        {
            scrollTrigger: {
                trigger: '.services',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        }
    );

    // Portfolio Section
    gsap.from('.portfolio-item', {
        scrollTrigger: {
            trigger: '.portfolio',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // About Section
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-visual', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 60,
        duration: 1,
        ease: 'power3.out'
    });

    // Contact Section
    gsap.from('.contact-card', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power3.out'
    });

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(stat, {
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        stat.textContent = Math.round(this.targets()[0].textContent);
                    }
                });
            },
            once: true
        });
    });

    // Parallax Effects
    gsap.utils.toArray('.hero-3d-card').forEach(card => {
        gsap.to(card, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Background lines parallax
    gsap.utils.toArray('.line').forEach((line, i) => {
        gsap.to(line, {
            yPercent: (i + 1) * 10,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2
            }
        });
    });
}

// ========================================
// 3D TILT EFFECT
// ========================================
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ========================================
// HERO 3D CARD MOUSE TRACKING
// ========================================
const hero3dCard = document.querySelector('.hero-3d-card');

if (hero3dCard) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth - 0.5) * 20;
        const yPercent = (clientY / innerHeight - 0.5) * 20;

        gsap.to(hero3dCard, {
            rotateY: xPercent,
            rotateX: -yPercent,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
}

// ========================================
// PORTFOLIO FILTER
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                gsap.to(item, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    onStart: () => {
                        item.classList.remove('hidden');
                        item.style.position = 'relative';
                    }
                });
            } else {
                gsap.to(item, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        item.classList.add('hidden');
                    }
                });
            }
        });
    });
});

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;

    // Animate button
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitBtn.querySelector('span').textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// LOGO FALLBACK
// ========================================
const logoImg = document.getElementById('logo-img');
const footerLogo = document.querySelector('.footer-logo');

function createFallbackLogo(element) {
    if (element) {
        element.onerror = function() {
            // Create text logo as fallback
            const textLogo = document.createElement('span');
            textLogo.className = 'logo-fallback';
            textLogo.innerHTML = '<span style="font-family: Orbitron, sans-serif; font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">BESTER</span>';
            element.parentNode.replaceChild(textLogo, element);
        };
    }
}

createFallbackLogo(logoImg);
createFallbackLogo(footerLogo);

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================
const magneticBtns = document.querySelectorAll('.cta-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// ========================================
// REVEAL ANIMATIONS ON SCROLL
// ========================================
const revealElements = document.querySelectorAll('.tech-icon, .social-link');

revealElements.forEach((el, index) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.7)'
    });
});

// ========================================
// BACKGROUND ANIMATION ENHANCEMENT
// ========================================
function animateBackgroundLines() {
    const lines = document.querySelectorAll('.line');

    lines.forEach((line, index) => {
        // Add random shimmer effect
        setInterval(() => {
            const randomOpacity = 0.3 + Math.random() * 0.3;
            line.style.opacity = randomOpacity;
        }, 2000 + index * 500);
    });
}

animateBackgroundLines();

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// ========================================
// INITIALIZE
// ========================================
console.log('🚀 Bester Development - Website Loaded Successfully!');
