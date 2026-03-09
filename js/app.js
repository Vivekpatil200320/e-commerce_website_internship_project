/**
 * Main Application Controller
 * Centralizes application initialization and coordination
 * Requirements: 6.8, 10.1, 11.3, 1.4, 2.3, 5.2, 7.1, 10.5
 */

(function(window, $) {
    'use strict';

    /**
     * Application Controller
     * Manages initialization and coordination of all modules
     */
    const AppController = {
        
        /**
         * Initialize application on page load
         * Requirement 6.8: Persist cart contents during user session
         * Requirement 10.1: Use jQuery for interactive functionality
         * Requirement 11.3: Update badge after cart modifications
         */
        init: function() {
            console.log('Initializing E-Commerce Application...');
            
            // Initialize cart from localStorage
            this.initializeCart();
            
            // Update cart badge
            this.updateCartBadge();
            
            // Set up global event listeners
            this.setupGlobalEventListeners();
            
            // Load products data (preload for better performance)
            this.preloadProducts();
            
            // Initialize page-specific functionality
            this.initializePage();
            
            console.log('Application initialized successfully');
        },

        /**
         * Initialize cart from localStorage
         * Requirement 6.8: Persist cart contents during user session
         */
        initializeCart: function() {
            if (window.CartModule) {
                const cart = window.CartModule.getCart();
                console.log('Cart initialized with ' + cart.length + ' items');
            } else {
                console.warn('CartModule not available');
            }
        },

        /**
         * Update cart badge in navigation
         * Requirement 11.3: Update badge after cart modifications within 200ms
         */
        updateCartBadge: function() {
            if (window.CartModule) {
                window.CartModule.updateCartBadge();
            } else if (typeof updateCartBadge === 'function') {
                // Fallback to global function if module not available
                updateCartBadge();
            }
        },

        /**
         * Set up global event listeners
         * Requirement 10.1: Use jQuery for interactive functionality
         * Requirement 10.5: Transition to target page when clicking navigation links
         */
        setupGlobalEventListeners: function() {
            // Add hover effects to interactive elements
            // Requirement 10.2: Provide visual feedback within 100ms
            this.setupHoverEffects();
            
            // Handle navigation link clicks
            this.setupNavigationHandlers();
            
            // Handle "Add to Cart" buttons globally
            this.setupAddToCartHandlers();
            
            // Handle product card clicks
            this.setupProductCardHandlers();
        },

        /**
         * Setup hover effects for interactive elements
         * Requirement 10.2: Provide visual feedback within 100ms
         */
        setupHoverEffects: function() {
            // Add hover effect to buttons
            $(document).on('mouseenter', '.btn', function() {
                $(this).addClass('shadow-sm');
            }).on('mouseleave', '.btn', function() {
                $(this).removeClass('shadow-sm');
            });

            // Add hover effect to product cards
            $(document).on('mouseenter', '.product-card', function() {
                $(this).addClass('shadow');
            }).on('mouseleave', '.product-card', function() {
                $(this).removeClass('shadow');
            });

            // Add hover effect to cart items
            $(document).on('mouseenter', '.cart-item', function() {
                $(this).addClass('bg-light');
            }).on('mouseleave', '.cart-item', function() {
                $(this).removeClass('bg-light');
            });
        },

        /**
         * Setup navigation handlers
         * Requirement 1.4: Provide navigation links to Product List, Category, and Cart pages
         * Requirement 10.5: Transition to target page when clicking navigation links
         */
        setupNavigationHandlers: function() {
            // Navigation links are handled by default browser behavior
            // This function can be extended for custom navigation logic
            
            // Add active class to current page nav item
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            $('.navbar-nav .nav-link').each(function() {
                const href = $(this).attr('href');
                if (href === currentPage) {
                    $(this).closest('.nav-item').addClass('active');
                } else {
                    $(this).closest('.nav-item').removeClass('active');
                }
            });
        },

        /**
         * Setup global "Add to Cart" button handlers
         * Requirement 6.1: Add product to cart when clicking "Add to Cart"
         */
        setupAddToCartHandlers: function() {
            $(document).on('click', '.add-to-cart-btn', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const $btn = $(this);
                const productId = parseInt($btn.data('product-id'));
                const quantity = parseInt($btn.data('quantity') || 1);
                
                // Get product details from data attributes or fetch from module
                const productName = $btn.data('product-name');
                const productPrice = parseFloat($btn.data('product-price'));
                const productImage = $btn.data('product-image');
                
                if (window.CartModule && productId) {
                    window.CartModule.addToCart(productId, quantity, {
                        name: productName,
                        price: productPrice,
                        image: productImage
                    });
                    
                    // Show success notification
                    if (typeof showNotification === 'function') {
                        showNotification('Product added to cart!', 'success');
                    }
                    
                    // Update cart badge
                    AppController.updateCartBadge();
                }
            });
        },

        /**
         * Setup product card click handlers
         * Requirement 2.3: Navigate to Product Detail page when clicking on a product
         */
        setupProductCardHandlers: function() {
            $(document).on('click', '.product-card', function(e) {
                // Don't navigate if clicking on a button inside the card
                if ($(e.target).closest('button, .btn, a').length > 0) {
                    return;
                }
                
                const productId = $(this).data('product-id');
                if (productId) {
                    // Requirement 2.3: Navigate to product detail page
                    AppController.navigateToProductDetail(productId);
                }
            });
        },

        /**
         * Preload products data for better performance
         * Requirement 10.1: Use jQuery for interactive functionality
         */
        preloadProducts: function() {
            if (window.ProductsModule) {
                window.ProductsModule.loadProducts()
                    .then(function(products) {
                        console.log('Products preloaded: ' + products.length + ' items');
                    })
                    .catch(function(error) {
                        console.error('Error preloading products:', error);
                    });
            }
        },

        /**
         * Initialize page-specific functionality based on current page
         */
        initializePage: function() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            switch(currentPage) {
                case 'index.html':
                    this.initializeHomePage();
                    break;
                case 'products.html':
                    this.initializeProductsPage();
                    break;
                case 'product-detail.html':
                    this.initializeProductDetailPage();
                    break;
                case 'categories.html':
                    this.initializeCategoriesPage();
                    break;
                case 'cart.html':
                    this.initializeCartPage();
                    break;
                case 'checkout.html':
                    this.initializeCheckoutPage();
                    break;
                case 'confirmation.html':
                    this.initializeConfirmationPage();
                    break;
            }
        },

        /**
         * Initialize home page
         */
        initializeHomePage: function() {
            console.log('Initializing home page...');
            // Home page initialization is handled by inline script in index.html
            // This can be moved here if needed
        },

        /**
         * Initialize products page
         */
        initializeProductsPage: function() {
            console.log('Initializing products page...');
            // Products page initialization is handled by products.html
        },

        /**
         * Initialize product detail page
         * Requirement 2.3: Navigate to Product Detail page
         */
        initializeProductDetailPage: function() {
            console.log('Initializing product detail page...');
            // Get product ID from URL parameter
            const productId = this.getUrlParameter('id');
            if (productId) {
                console.log('Loading product detail for ID: ' + productId);
            }
        },

        /**
         * Initialize categories page
         * Requirement 5.2: Display products belonging to selected category
         */
        initializeCategoriesPage: function() {
            console.log('Initializing categories page...');
            // Get category from URL parameter if navigating from category selection
            const category = this.getUrlParameter('category');
            if (category) {
                console.log('Filtering by category: ' + category);
            }
        },

        /**
         * Initialize cart page
         */
        initializeCartPage: function() {
            console.log('Initializing cart page...');
            // Cart page initialization is handled by cart.html
        },

        /**
         * Initialize checkout page
         * Requirement 7.1: Navigate to Checkout page from Cart page
         */
        initializeCheckoutPage: function() {
            console.log('Initializing checkout page...');
            // Verify cart is not empty
            if (window.CartModule) {
                const cart = window.CartModule.getCart();
                if (cart.length === 0) {
                    // Requirement 12.3: Redirect to product list if cart is empty
                    console.warn('Cart is empty, redirecting to products page');
                    if (typeof showNotification === 'function') {
                        showNotification('Your cart is empty. Please add items before checkout.', 'warning');
                    }
                    setTimeout(function() {
                        window.location.href = 'products.html';
                    }, 2000);
                }
            }
        },

        /**
         * Initialize confirmation page
         */
        initializeConfirmationPage: function() {
            console.log('Initializing confirmation page...');
            // Get order data from sessionStorage
            const orderData = this.getOrderData();
            if (orderData) {
                console.log('Order confirmed: ' + orderData.orderId);
            }
        },

        /**
         * Navigate to product detail page
         * Requirement 2.3: Navigate to Product Detail page when clicking on a product
         * @param {number} productId - Product ID
         */
        navigateToProductDetail: function(productId) {
            window.location.href = 'product-detail.html?id=' + productId;
        },

        /**
         * Navigate to products page with category filter
         * Requirement 5.2: Display products belonging to selected category
         * @param {string} category - Category name
         */
        navigateToCategory: function(category) {
            window.location.href = 'products.html?category=' + encodeURIComponent(category);
        },

        /**
         * Navigate to checkout page
         * Requirement 7.1: Navigate to Checkout page from Cart page
         */
        navigateToCheckout: function() {
            window.location.href = 'checkout.html';
        },

        /**
         * Navigate to confirmation page with order data
         * @param {Object} orderData - Order data object
         */
        navigateToConfirmation: function(orderData) {
            // Store order data in sessionStorage for confirmation page
            this.storeOrderData(orderData);
            window.location.href = 'confirmation.html';
        },

        /**
         * Get URL parameter value
         * @param {string} name - Parameter name
         * @returns {string|null} Parameter value or null
         */
        getUrlParameter: function(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        },

        /**
         * Store order data in sessionStorage
         * @param {Object} orderData - Order data object
         */
        storeOrderData: function(orderData) {
            try {
                sessionStorage.setItem('orderData', JSON.stringify(orderData));
            } catch (error) {
                console.error('Error storing order data:', error);
            }
        },

        /**
         * Get order data from sessionStorage
         * @returns {Object|null} Order data or null
         */
        getOrderData: function() {
            try {
                const data = sessionStorage.getItem('orderData');
                return data ? JSON.parse(data) : null;
            } catch (error) {
                console.error('Error retrieving order data:', error);
                return null;
            }
        },

        /**
         * Clear order data from sessionStorage
         */
        clearOrderData: function() {
            try {
                sessionStorage.removeItem('orderData');
            } catch (error) {
                console.error('Error clearing order data:', error);
            }
        }
    };

    // Export AppController to global scope
    window.AppController = AppController;

    // Initialize application when DOM is ready
    $(document).ready(function() {
        AppController.init();
    });

})(window, jQuery);
