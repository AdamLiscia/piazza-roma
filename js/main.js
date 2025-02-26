// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains('translate-x-0');
        mobileMenu.classList.toggle('translate-x-0', !isOpen);
        mobileMenu.classList.toggle('translate-x-full', isOpen);
    };

    mobileMenuButton.addEventListener('click', toggleMenu);
    mobileMenuClose.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('translate-x-0') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            toggleMenu();
        }
    });
});

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Any page-specific initialization can go here
    console.log('Page loaded');
});
