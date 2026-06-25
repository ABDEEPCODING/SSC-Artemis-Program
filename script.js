const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('fly-in-visible', entry.isIntersecting);
    });
}, { threshold: 0.2 });

document.querySelectorAll('.fly-left, .fly-right').forEach(el => {
    observer.observe(el);
});



document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fly-in-visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fly-left, .fly-right, .fly-up, .fade-only').forEach(el => {
        observer.observe(el);
    });

    // SLS rocket diagram: invisible hotspots trigger their matching visual layer
    const caption = document.getElementById('sls-caption');
    const hotspots = document.querySelectorAll('.hotspot');

    if (caption && hotspots.length){
        const defaultText = caption.textContent;
        hotspots.forEach(spot => {
            const layer = document.querySelector('.rocket-' + spot.dataset.target);
            spot.addEventListener('mouseenter', () => {
                if (layer) layer.classList.add('active');
                caption.textContent = spot.dataset.label || defaultText;
            });

            spot.addEventListener('mouseleave', () => {
                if (layer) layer.classList.remove('active');
                caption.textContent = defaultText;
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Scroll-triggered fly-in: adds the class once, never removes it,
    // so elements stay visible permanently after their first reveal
    // (no flicker when scrolling back up/down past something already shown).
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fly-in-visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fly-left, .fly-right, .fly-up, .fade-only').forEach(el => {
        observer.observe(el);
    });

    // SLS rocket diagram: hovering a part updates the caption text below it.
    // The decouple/glow animations themselves are pure CSS (:hover on .rocket-layer);
    // this just swaps the caption to match whichever part is currently hovered.
    const caption = document.getElementById('sls-caption');
    const rocketLayers = document.querySelectorAll('.rocket-layer');

    if (caption && rocketLayers.length){
        const defaultText = caption.textContent;

        rocketLayers.forEach(layer => {
            layer.addEventListener('mouseenter', () => {
                caption.textContent = layer.dataset.label || defaultText;
            });
            layer.addEventListener('mouseleave', () => {
                caption.textContent = defaultText;
            });
        });
    }
});