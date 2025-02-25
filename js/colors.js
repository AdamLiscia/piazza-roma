// Define the color palette
const colors = {
    terra: '#CD4F38',     // Terracotta red
    olive: '#556B2F',     // Deep olive green
    cream: '#FFF8E7',     // Warm cream
    sienna: '#8B4513',    // Sienna brown
    charcoal: '#36454F',  // Keeping charcoal for contrast
};

// Export the colors for Tailwind configuration
const tailwindColors = {
    theme: {
        extend: {
            colors: colors
        }
    }
};

// Make colors available globally
window.restaurantColors = colors;
window.tailwindConfig = tailwindColors; 