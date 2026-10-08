// Button Click Ripple Micro-interaction System
document.addEventListener('DOMContentLoaded', () => {
    function createRipple(e) {
        const btn = e.currentTarget;
        if (!btn) return;

        // Clean up previous ripples on this button
        const existingRipples = btn.querySelectorAll('.ripple-effect');
        existingRipples.forEach(r => r.remove());

        const rect = btn.getBoundingClientRect();
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        const circle = document.createElement('span');
        circle.className = 'ripple-effect';
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;

        // Calculate click position relative to button
        const x = e.clientX ? (e.clientX - rect.left - radius) : (rect.width / 2 - radius);
        const y = e.clientY ? (e.clientY - rect.top - radius) : (rect.height / 2 - radius);
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        btn.appendChild(circle);

        const removeRipple = () => {
            if (circle.parentNode) {
                circle.remove();
            }
        };

        circle.addEventListener('animationend', removeRipple, { once: true });
        setTimeout(removeRipple, 600);
    }

    // Event delegation for all buttons across current and dynamically loaded views
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-aurora, .btn-aurora-secondary, .btn-aurora-soft, .btn-ripple, .btn');
        if (btn) {
            createRipple({
                currentTarget: btn,
                clientX: e.clientX,
                clientY: e.clientY
            });
        }
    });
});

