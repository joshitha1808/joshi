// Small progressive enhancements for UX and SEO
// - Add aria-current to external profile links when focused
// - Defer non-critical fontawesome if needed (already CDN)
// - Add smooth focus outline for keyboard users

(function () {
    try {
        // Mark external links
        document.querySelectorAll('a[target="_blank"]').forEach(a => {
            a.setAttribute('rel', 'noopener noreferrer');
        });

        // Improve keyboard focus visibility (in addition to CSS)
        const style = document.createElement('style');
        style.textContent = `a:focus { outline: 2px solid #2d3748; outline-offset: 2px; }`;
        document.head.appendChild(style);

        // Lazy-load images as a progressive enhancement
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
        });
    } catch (_) { }
})();
