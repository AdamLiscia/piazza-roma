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
    
    if (!mobileMenuButton || !mobileMenu) return;

    const menuIcons = mobileMenuButton.querySelectorAll('svg');
    
    const toggleMenu = () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        menuIcons[0].classList.toggle('hidden');
        menuIcons[1].classList.toggle('hidden');
    };

    mobileMenuButton.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('hidden')) return;
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            menuIcons[0].classList.remove('hidden');
            menuIcons[1].classList.add('hidden');
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
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuButton && mobileMenu) {
        const toggleMenu = () => {
            const isOpen = mobileMenu.classList.contains('translate-x-0');
            mobileMenu.classList.toggle('translate-x-0', !isOpen);
            mobileMenu.classList.toggle('translate-x-full', isOpen);
        };

        mobileMenuButton.addEventListener('click', toggleMenu);
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', toggleMenu);
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('translate-x-0') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuButton.contains(e.target)) {
                toggleMenu();
            }
        });
    }
};

// Function to initialize footer-specific scripts
const initializeFooterScripts = () => {
    // Add any footer-specific initialization here
}; 