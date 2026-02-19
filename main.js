document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        }
    });

    // 3. Form Handling
    const contactForm = document.getElementById('srv-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Form Submitted:', data);

            // Simulate success
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = 'Enviando...';
            submitBtn.style.backgroundColor = '#4caf50';

            setTimeout(() => {
                submitBtn.innerText = '¡Solicitud Enviada!';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // 4. Scroll Animations (Simple Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply to sections
    const animatedElements = document.querySelectorAll('.service-card, .mvv-card, .about-text, .enhanced-values, .value-card, .logo-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // CSS for visible state injected via JS
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                padding: 20px;
                box-shadow: 0 10px 10px rgba(0,0,0,0.1);
                animation: slideDown 0.3s ease-out;
            }
            
            @keyframes slideDown {
                from { transform: translateY(-10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        }
    `;
    document.head.appendChild(style);
});
