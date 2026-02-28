/* ================================================================
   JOSHITHA V — PORTFOLIO JS
   Nav, smooth scroll, reveal, project filter, mobile menu
   ================================================================ */

(function () {
    'use strict';

    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkEls = document.querySelectorAll('.nav-link');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('.section, .hero');

    /* ── Mobile Nav ── */
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinkEls.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ── Navbar hide/show on scroll ── */
    let lastScroll = 0;
    let ticking = false;

    function handleNavScroll() {
        const y = window.scrollY;
        if (y > 120) {
            if (y > lastScroll + 5) nav.classList.add('hidden');
            else if (y < lastScroll - 5) nav.classList.remove('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        lastScroll = y;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(handleNavScroll); ticking = true; }
    }, { passive: true });

    /* ── Active nav link ── */
    function updateActiveLink() {
        const scrollY = window.scrollY + 160;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const id = sec.getAttribute('id');
            if (scrollY >= top && scrollY < top + sec.offsetHeight) {
                navLinkEls.forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === '#' + id);
                });
            }
        });
    }
    window.addEventListener('scroll', () => requestAnimationFrame(updateActiveLink), { passive: true });

    /* ── Scroll reveal (IntersectionObserver) ── */
    function initReveal() {
        const els = document.querySelectorAll(
            '.about-content, .about-image-card, .about-subtitle, .about-description, ' +
            '.about-meta, .tag-row, .skills-content, .project-card, .exp-card, ' +
            '.contact-grid, .contact-footer-info, .github-widget, .content-heading, ' +
            '.blog-card, .blogs-coming-soon'
        );
        els.forEach(el => el.classList.add('reveal'));

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        els.forEach(el => obs.observe(el));
    }

    /* ── Project filter ── */
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const f = btn.dataset.filter;
                projectCards.forEach(c => {
                    const cats = c.dataset.category || '';
                    const show = f === 'all' || cats.includes(f);
                    c.style.display = show ? '' : 'none';
                    if (show) {
                        c.style.opacity = '0';
                        c.style.transform = 'translateY(16px)';
                        requestAnimationFrame(() => {
                            c.style.transition = 'opacity .4s ease, transform .4s ease';
                            c.style.opacity = '1';
                            c.style.transform = 'translateY(0)';
                        });
                    }
                });
            });
        });
    }

    /* ── Smooth scroll anchors ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ── Focus styles ── */
    const s = document.createElement('style');
    s.textContent = 'a:focus-visible,button:focus-visible{outline:2px solid rgba(0,0,0,.2);outline-offset:3px;}';
    document.head.appendChild(s);

    /* ── External link security ── */
    document.querySelectorAll('a[target="_blank"]').forEach(a => a.setAttribute('rel', 'noopener noreferrer'));

    /* ── Image lazy load ── */
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });

    /* ── GitHub retry button ── */
    const retry = document.querySelector('.github-retry');
    if (retry) {
        retry.addEventListener('click', () => {
            retry.textContent = 'SYNCING...';
            retry.style.color = 'var(--zinc-600)';
            setTimeout(() => {
                retry.textContent = 'FEED UNAVAILABLE';
                setTimeout(() => { retry.textContent = 'RETRY SYNC'; retry.style.color = ''; }, 2000);
            }, 1500);
        });
    }

    /* ── Init ── */
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initReveal);
    else initReveal();

})();
