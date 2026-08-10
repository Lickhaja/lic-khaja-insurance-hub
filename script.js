document.addEventListener('DOMContentLoaded', () => {
    // Configuration - Replace with actual details
    const CONTACT_INFO = {
        phone: "+918790761602",
whatsapp: "918790761602",
email: "licofindia.hyderabad@gmail.com",
        whatsappMessage: "Hello, I am interested in LIC insurance plans. Please guide me."
    };

    /**
     * MOBILE MENU TOGGLE
     * Logic for hamburger menu responsiveness
     */
    const setupMobileMenu = () => {
        const burger = document.querySelector('.burger') || document.createElement('div');
        const nav = document.querySelector('.nav-links');
        
        // If burger doesn't exist in HTML, this logic waits for it
        if (burger) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');
            });
        }
    };

    /**
     * SEARCH FUNCTIONALITY
     * Filters cards or sections based on user input
     */
    const setupSearch = () => {
        const searchInput = document.querySelector('#searchInput');
        const cards = document.querySelectorAll('.card, .service-item');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    card.style.display = text.includes(term) ? 'block' : 'none';
                });
            });
        }
    };

    /**
     * SMOOTH SCROLLING
     * Internal links scroll smoothly to target sections
     */
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    const nav = document.querySelector('.nav-links');
                    if (nav.classList.contains('nav-active')) {
                        nav.classList.remove('nav-active');
                    }
                }
            });
        });
    };

    /**
     * CONTACT BUTTON ACTIONS
     * Logic for WhatsApp, Call, and Email triggers
     */
    const setupContactActions = () => {
        const whatsappBtn = document.querySelectorAll('.whatsapp-trigger');
        const callBtn = document.querySelectorAll('.call-trigger');
        const emailBtn = document.querySelectorAll('.email-trigger');

        whatsappBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`;
                window.open(url, '_blank');
            });
        });

        callBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = `tel:${CONTACT_INFO.phone}`;
            });
        });

        emailBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = `mailto:${CONTACT_INFO.email}?subject=Inquiry regarding LIC Policy`;
            });
        });
    };

    /**
     * HEADER SCROLL EFFECT
     * Changes header style on scroll for a premium feel
     */
    const handleHeaderScroll = () => {
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = "0.5rem 5%";
                header.style.backgroundColor = "rgba(2, 66, 130, 0.95)"; // Solid LIC Blue
            } else {
                header.style.padding = "1rem 5%";
                header.style.backgroundColor = "#024282";
            }
        });
    };

    // Initialize all functions
    setupMobileMenu();
    setupSearch();
    setupSmoothScroll();
    setupContactActions();
    handleHeaderScroll();
});
