// Component templates
const HEADER_TEMPLATE = `
<!-- Header/Navigation Component -->
<nav class="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
    <!-- ... rest of header HTML ... -->
</nav>
`;

const FOOTER_TEMPLATE = `
<!-- Footer Component -->
<footer class="bg-charcoal py-12 mt-12">
    <!-- ... rest of footer HTML ... -->
</footer>
`;

// Component loader utility
const loadComponents = async () => {
    try {
        // Insert header
        const headerElement = document.getElementById('header');
        if (headerElement) {
            headerElement.innerHTML = HEADER_TEMPLATE;
        }

        // Insert footer
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.innerHTML = FOOTER_TEMPLATE;
        }

        // Initialize mobile menu after header is loaded
        await initializeMobileMenu();
        
        // Highlight current page in navigation
        highlightCurrentPage();
    } catch (error) {
        console.error('Error initializing components:', error);
    }
};

// Mobile menu initialization
const initializeMobileMenu = async () => {
    // Wait a bit to ensure DOM elements are loaded
    await new Promise(resolve => setTimeout(resolve, 100));

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    
    if (!mobileMenuButton || !mobileMenu) return;

    const toggleMenu = () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        menuOpenIcon.classList.toggle('hidden');
        menuCloseIcon.classList.toggle('hidden');
    };

    mobileMenuButton.addEventListener('click', toggleMenu);

    // Add keyboard accessibility
    mobileMenuButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('hidden') && 
            !mobileMenuButton.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            menuOpenIcon.classList.remove('hidden');
            menuCloseIcon.classList.add('hidden');
        }
    });
};

// Highlight current page in navigation
const highlightCurrentPage = () => {
    try {
        const currentPath = window.location.pathname;
        const page = currentPath.split('/').pop().replace('.html', '') || 'index';
        
        document.querySelectorAll(`[data-nav="${page}"]`).forEach(link => {
            link.classList.add('text-terra');
        });
    } catch (error) {
        console.error('Error highlighting current page:', error);
    }
};

// Load header component
const loadHeader = () => {
    const headerElement = document.getElementById('header');
    if (headerElement) {
        fetch('/components/header.html')  // Note: changed path to absolute
            .then(response => response.text())
            .then(data => {
                headerElement.innerHTML = data;
                initializeHeaderScripts();
                highlightCurrentPage();
            })
            .catch(error => console.error('Error loading header:', error));
    }
};

// Load footer component
const loadFooter = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        fetch('/components/footer.html')  // Note: changed path to absolute
            .then(response => response.text())
            .then(data => {
                footerElement.innerHTML = data;
                initializeFooterScripts();
            })
            .catch(error => console.error('Error loading footer:', error));
    }
};

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
});

// Function to initialize header-specific scripts
const initializeHeaderScripts = () => {
    // Initialize mobile menu
    initializeMobileMenu();
};

// Function to initialize footer-specific scripts
const initializeFooterScripts = () => {
    // Add any footer-specific initialization here
}; 