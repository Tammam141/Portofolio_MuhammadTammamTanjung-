document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearElem = document.getElementById('year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // Navbar scroll effect & active menu highlight (ScrollSpy)
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateNavbarAndActiveLink() {
        const scrollY = window.scrollY;

        // Toggle navbar background on scroll
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Determine current active section
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const scrollPosition = scrollY + navHeight + 120;
        let currentSectionId = '';

        // If scrolled to the very bottom of the page, activate the last section
        if ((window.innerHeight + Math.round(scrollY)) >= document.documentElement.scrollHeight - 30) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                currentSectionId = lastSection.getAttribute('id');
            }
        } else {
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });
        }

        if (currentSectionId) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateNavbarAndActiveLink);
    updateNavbarAndActiveLink();

    // Close navbar on mobile & set active link immediately when a link is clicked
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = (menuToggle && typeof bootstrap !== 'undefined')
        ? new bootstrap.Collapse(menuToggle, { toggle: false })
        : null;

    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            navLinks.forEach((item) => item.classList.remove('active'));
            l.classList.add('active');

            if (bsCollapse && menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });
    
    // Initialize AOS Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 50,
        });
    }
});
