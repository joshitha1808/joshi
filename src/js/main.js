/* ================================================================
   JOSHITHA V — PORTFOLIO JS
   Smooth scroll, nav behavior, scroll reveal, project filtering
   ================================================================ */

(function () {
    'use strict';

    // ── DOM REFS ──
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkEls = document.querySelectorAll('.nav-link');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('.section, .hero');

    // ── MOBILE NAV TOGGLE ──
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinkEls.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ── NAVBAR HIDE/SHOW ON SCROLL ──
    let lastScroll = 0;
    let ticking = false;

    function onScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            if (currentScroll > lastScroll + 5) {
                nav.classList.add('hidden');
            } else if (currentScroll < lastScroll - 5) {
                nav.classList.remove('hidden');
            }
        } else {
            nav.classList.remove('hidden');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // ── ACTIVE NAV LINK HIGHLIGHTING ──
    function updateActiveLink() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkEls.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveLink);
    }, { passive: true });

    // ── SCROLL REVEAL ANIMATION ──
    function initReveal() {
        const revealElements = document.querySelectorAll(
            '.about-content, .about-image-card, .about-subtitle, .about-description, ' +
            '.about-meta, .tag-row, .skills-content, .project-card, .exp-card, ' +
            '.contact-grid, .contact-footer-info, .github-widget, .content-heading'
        );

        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // ── PROJECT FILTERING ──
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                projectCards.forEach(card => {
                    const categories = card.dataset.category || '';
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = '';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ── KEYBOARD FOCUS STYLES ──
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        a:focus-visible, button:focus-visible {
            outline: 2px solid rgba(255,255,255,0.5);
            outline-offset: 3px;
        }
    `;
    document.head.appendChild(focusStyle);

    // ── EXTERNAL LINK SECURITY ──
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
        a.setAttribute('rel', 'noopener noreferrer');
    });

    // ── LAZY LOADING IMAGES ──
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });

    // ── GITHUB RETRY BUTTON (fun interaction) ──
    const retryBtn = document.querySelector('.github-retry');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            retryBtn.textContent = 'SYNCING...';
            retryBtn.style.color = 'var(--text-secondary)';
            setTimeout(() => {
                retryBtn.textContent = 'FEED UNAVAILABLE';
                setTimeout(() => {
                    retryBtn.textContent = 'RETRY SYNC';
                    retryBtn.style.color = '';
                }, 2000);
            }, 1500);
        });
    }

    // ── INIT ON DOM READY ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }

})();
