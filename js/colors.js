// Define the color palette
const colors = {
    terra: '#6B2758',     // Terracotta red
    gold: '#D4AF37',
    cream: '#FDFBF7',     // Warm cream
    sienna: '#8B4513',    // Sienna brown
    charcoal: '#2D2D2D',  // Keeping charcoal for contrast
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