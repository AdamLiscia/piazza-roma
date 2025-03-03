// Menu rendering and filtering functionality
const menuContainer = document.getElementById('menu-container');
const filterButtons = document.querySelectorAll('.filter-btn');
let menuData = null;

// Use hardcoded menu data
const fetchMenu = () => {
    const data = {
        "categories": [
            {
                "name": "Appetizers",
                "items": [
                    {
                        "name": "Artisanal Cheese Board",
                        "description": "Selection of local and imported cheeses, honey, nuts, and artisanal bread",
                        "price": 18,
                        "category": "appetizers",
                        "dietary": ["vegetarian"],
                        "featured": true
                    },
                    {
                        "name": "Roasted Beet Salad",
                        "description": "Golden and red beets, goat cheese, arugula, candied walnuts",
                        "price": 14,
                        "category": "appetizers",
                        "dietary": ["vegetarian", "gluten-free"]
                    },
                    {
                        "name": "Crispy Calamari",
                        "description": "Lightly breaded squid, lemon aioli, spicy marinara sauce",
                        "price": 16,
                        "category": "appetizers"
                    },
                    {
                        "name": "Tuna Tartare",
                        "description": "Fresh ahi tuna, avocado, wasabi aioli, wonton crisps",
                        "price": 19,
                        "category": "appetizers",
                        "featured": true
                    }
                ]
            },
            {
                "name": "Entrees",
                "items": [
                    {
                        "name": "Pan-Seared Duck Breast",
                        "description": "Cherry gastrique, wild mushroom risotto, seasonal vegetables",
                        "price": 36,
                        "category": "entrees",
                        "featured": true
                    },
                    {
                        "name": "Herb-Crusted Salmon",
                        "description": "Lemon beurre blanc, fingerling potatoes, asparagus",
                        "price": 32,
                        "category": "entrees",
                        "dietary": ["gluten-free"]
                    },
                    {
                        "name": "Wagyu Beef Tenderloin",
                        "description": "8oz filet, truffle butter, roasted garlic mashed potatoes, grilled asparagus",
                        "price": 52,
                        "category": "entrees",
                        "featured": true
                    },
                    {
                        "name": "Wild Mushroom Risotto",
                        "description": "Arborio rice, mixed forest mushrooms, parmesan, white truffle oil",
                        "price": 28,
                        "category": "entrees",
                        "dietary": ["vegetarian", "gluten-free"]
                    }
                ]
            },
            {
                "name": "Desserts",
                "items": [
                    {
                        "name": "Dark Chocolate Soufflé",
                        "description": "Vanilla bean ice cream, raspberry coulis",
                        "price": 12,
                        "category": "desserts",
                        "dietary": ["vegetarian"],
                        "featured": true
                    },
                    {
                        "name": "Crème Brûlée",
                        "description": "Tahitian vanilla bean custard, caramelized sugar",
                        "price": 11,
                        "category": "desserts",
                        "dietary": ["vegetarian", "gluten-free"]
                    },
                    {
                        "name": "Apple Tarte Tatin",
                        "description": "Caramelized apples, puff pastry, vanilla ice cream, salted caramel",
                        "price": 13,
                        "category": "desserts",
                        "dietary": ["vegetarian"]
                    }
                ]
            },
            {
                "name": "Cocktails",
                "items": [
                    {
                        "name": "Craft Cocktail",
                        "description": "House-made seasonal cocktail",
                        "price": 14,
                        "category": "cocktails"
                    },
                    {
                        "name": "Smoky Old Fashioned",
                        "description": "Bourbon, maple syrup, bitters, applewood smoke",
                        "price": 16,
                        "category": "cocktails"
                    },
                    {
                        "name": "Lavender 75",
                        "description": "Gin, lavender syrup, fresh lemon, prosecco",
                        "price": 15,
                        "category": "cocktails"
                    },
                    {
                        "name": "Blood Orange Margarita",
                        "description": "Tequila, blood orange, lime, agave, salt rim",
                        "price": 15,
                        "category": "cocktails"
                    }
                ]
            },
            {
                "name": "Happy Hour",
                "items": [
                    {
                        "name": "Bruschetta Trio",
                        "description": "Classic tomato & basil, mushroom & truffle, olive tapenade",
                        "price": 8,
                        "category": "happy-hour",
                        "dietary": ["vegetarian"]
                    },
                    {
                        "name": "Arancini",
                        "description": "Crispy risotto balls filled with mozzarella and peas",
                        "price": 7,
                        "category": "happy-hour",
                        "dietary": ["vegetarian"]
                    },
                    {
                        "name": "House Wine",
                        "description": "Selected red or white Italian wines",
                        "price": 6,
                        "category": "happy-hour"
                    },
                    {
                        "name": "Aperol Spritz",
                        "description": "Classic Italian aperitif with prosecco and soda",
                        "price": 8,
                        "category": "happy-hour"
                    },
                    {
                        "name": "Antipasto Board",
                        "description": "Selection of cured meats, cheeses, and marinated vegetables",
                        "price": 12,
                        "category": "happy-hour"
                    }
                ]
            }
        ]
    };

    displayMenu(data.categories);
    setupFilters();
};

// Display menu items
const displayMenu = (categories) => {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = ''; // Clear loading spinner

    categories.forEach(category => {
        const section = document.createElement('section');
        section.className = 'menu-section';
        
        section.innerHTML = `
            <h2 class="text-3xl font-serif text-terra mb-8">${category.name}</h2>
            ${category.name === 'Happy Hour' ? 
                '<p class="text-gray-600 mb-8">Available Monday-Friday, 4:00 PM - 6:00 PM</p>' 
                : ''}
            <div class="grid md:grid-cols-2 gap-8">
                ${category.items.map(item => `
                    <div class="menu-item bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow" data-category="${item.category}">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-xl font-semibold mb-2">${item.name}</h3>
                                <p class="text-gray-600 mb-2">${item.description}</p>
                                ${item.dietary ? `
                                    <div class="flex gap-2">
                                        ${item.dietary.map(diet => `
                                            <span class="text-sm text-terra">${diet}</span>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                            <span class="text-lg font-semibold">$${item.price}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        menuContainer.appendChild(section);
    });
};

// Setup filter functionality
const setupFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class and background from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('data-active', 'false');
            });
            // Add active class and background to clicked button
            button.classList.add('active');
            button.setAttribute('data-active', 'true');

            const filter = button.getAttribute('data-filter');

            // Show/hide menu items based on filter
            menuItems.forEach(item => {
                if (item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Show/hide section headers based on visible items
            document.querySelectorAll('.menu-section').forEach(section => {
                const hasVisibleItems = Array.from(section.querySelectorAll('.menu-item'))
                    .some(item => item.style.display !== 'none');
                section.style.display = hasVisibleItems ? 'block' : 'none';
            });
        });
    });

    // Trigger click on first button (Happy Hour) to show initial view
    filterButtons[0].click();
};

// Initialize menu
document.addEventListener('DOMContentLoaded', fetchMenu);

// Add keyboard accessibility
filterButtons.forEach(btn => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});