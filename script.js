const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('fly-in-visible', entry.isIntersecting);
    });
}, { threshold: 0.2 });

document.querySelectorAll('.fly-left, .fly-right').forEach(el => {
    observer.observe(el);
});