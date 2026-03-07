document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('mainHeader');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Featured Products Slider
    const slider = document.querySelector('.featured-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = slider.querySelector('.product-card');
            if (!card) return 0;
            const style = window.getComputedStyle(slider);
            const gap = parseInt(style.getPropertyValue('gap')) || 0;
            return card.offsetWidth + gap;
        };

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }

    // Interactive Button FX
    const primaryBtns = document.querySelectorAll('.btn-primary');
    primaryBtns.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'translateY(2px) scale(0.98)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'translateY(-2px) scale(1)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ─── Enhanced Scroll Reveal System ──────────────────────
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Reveal classes for all sections
    const revealElements = document.querySelectorAll(
        '.reveal-up, .reveal-fade, .category-card, .product-card, ' +
        '.pillar-card, .curation-card, .testimonial-card, .trust-promise, ' +
        '.ethos-content, .section-header, .hero-content, .curation-arrow'
    );

    // Add staggered reveal to grid items
    document.querySelectorAll('.category-card, .product-card').forEach((el, index) => {
        if (!el.classList.contains('reveal-up') && !el.classList.contains('reveal-fade')) {
            el.classList.add('reveal-up');
            el.style.transitionDelay = `${(index % 4) * 100}ms`;
        }
    });

    // Pillar cards with stagger
    document.querySelectorAll('.pillar-card').forEach((el, index) => {
        el.classList.add('reveal-up');
        el.style.transitionDelay = `${index * 120}ms`;
    });

    // Curation cards with stagger
    document.querySelectorAll('.curation-card').forEach((el, index) => {
        el.classList.add('reveal-up');
        el.style.transitionDelay = `${index * 150}ms`;
    });

    // Curation arrows
    document.querySelectorAll('.curation-arrow').forEach((el, index) => {
        el.classList.add('reveal-fade');
        el.style.transitionDelay = `${150 + index * 150}ms`;
    });

    // Trust promise items with stagger
    document.querySelectorAll('.trust-promise').forEach((el, index) => {
        el.classList.add('reveal-up');
        el.style.transitionDelay = `${index * 100}ms`;
    });

    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('reveal-fade');
    });

    // Ethos content
    document.querySelectorAll('.ethos-content').forEach(el => {
        el.classList.add('reveal-up');
    });

    // Observe all reveal elements (re-query to include newly added classes)
    document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
        observer.observe(el);
    });

    // ─── Smooth Parallax for Hero ───────────────────────────
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            if (scrolled < heroHeight) {
                const heroContent = heroSection.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                    heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
                }
            }
        });
    }

    // ─── Scroll Progress Indicator ──────────────────────────
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

