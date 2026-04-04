// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const targetAttr = counter.getAttribute('data-target');
        const target = parseFloat(targetAttr);
        const isFloat = targetAttr.includes('.');
        
        const updateCount = () => {
            const count = parseFloat(counter.innerText);
            const inc = target / speed;

            if (count < target) {
                const nextValue = count + inc;
                counter.innerText = isFloat ? nextValue.toFixed(1) : Math.ceil(nextValue);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = isFloat ? target.toFixed(1) : target;
            }
        };
        updateCount();
    });
};

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.1
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const targetAttr = counter.getAttribute('data-target');
            const target = parseFloat(targetAttr);
            const isFloat = targetAttr.includes('.');
            
            const updateCount = () => {
                const count = parseFloat(counter.innerText);
                const inc = Math.max(isFloat ? 0.1 : 1, target / speed);

                if (count < target) {
                    const nextValue = count + inc;
                    counter.innerText = isFloat ? nextValue.toFixed(1) : Math.ceil(nextValue);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = isFloat ? target.toFixed(1) : target;
                }
            };
            updateCount();
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Portfolio hover effects (extra smoothness)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('img');
        if (img) img.style.transform = 'scale(1.1)';
    });
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ── Why Choose Us slide-in from left ────────────────────────────────────────
const whyItems = document.querySelectorAll('.why-item');
if (whyItems.length) {
    const whyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.getAttribute('data-slide-delay') || 0);
                setTimeout(() => el.classList.add('slide-in-active'), delay);
                whyObserver.unobserve(el);
            }
        });
    }, { threshold: 0.15 });

    whyItems.forEach((item, index) => {
        item.setAttribute('data-slide-delay', index * 150);
        whyObserver.observe(item);
    });
}
// ── Typewriter animation for Motto ──────────────────────────────────────────
const mottoEl = document.getElementById('motto-text');
if (mottoEl) {
    const mottoText = '\u201cFrom concept to creation, we build with care, precision, and passion \u2014 delivering lasting structures that reflect our commitment to quality and innovation.\u201d';
    let typed = false;

    const typeWriter = (el, text, delay) => {
        let i = 0;
        el.innerHTML = '<span class="typed-cursor">|</span>';
        const interval = setInterval(() => {
            if (i < text.length) {
                el.innerHTML = text.slice(0, i + 1) + '<span class="typed-cursor">|</span>';
                i++;
            } else {
                el.innerHTML = text;
                clearInterval(interval);
            }
        }, delay);
    };

    const mottoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typed) {
                typed = true;
                setTimeout(() => typeWriter(mottoEl, mottoText, 28), 500);
                mottoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    mottoObserver.observe(mottoEl);
}

// ── Gallery Lightbox ────────────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

if (lightbox && lightboxImg) {
    document.querySelectorAll('.project-card img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const hideLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeLightbox.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) hideLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) hideLightbox();
    });
}

// ── Testimonial Read More Toggle ─────────────────────────────────────────────
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.testimonial-card');
        card.classList.toggle('expanded');
        
        if (card.classList.contains('expanded')) {
            btn.textContent = 'Read Less';
        } else {
            btn.textContent = 'Read More';
            // Scroll back to the top of the card if it was expanded
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});
