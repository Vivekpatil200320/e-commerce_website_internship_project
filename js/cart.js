/**
 * Shopping Cart Module
 * Manages cart operations with localStorage persistence
 */

(function(window) {
    'use strict';

    const CART_STORAGE_KEY = 'cart';

    /**
     * Get cart from localStorage
     * @returns {Array} Array of cart items
     */
    function getCart() {
        try {
            const cartData = localStorage.getItem(CART_STORAGE_KEY);
            if (cartData) {
                return JSON.parse(cartData);
            }
        } catch (error) {
            console.error('Error reading cart from localStorage:', error);
        }
        return [];
    }

    /**
     * Save cart to localStorage
     * @param {Array} cart - Cart items array
     */
    function saveCart(cart) {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }

    /**
     * Add product to cart
     * @param {number} productId - Product ID
     * @param {number} quantity - Quantity to add
     * @param {Object} productDetails - Product details (name, price, image)
     * @returns {Object} Updated cart item
     */
    function addToCart(productId, quantity, productDetails) {
        const cart = getCart();
        const existingItemIndex = cart.findIndex(function(item) {
            return item.productId === productId;
        });

        if (existingItemIndex !== -1) {
            // Update quantity if item already exists
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                productId: productId,
                name: productDetails.name,
                price: productDetails.price,
                quantity: quantity,
                image: productDetails.image
            });
        }

        saveCart(cart);
        updateCartBadge();
        return cart[existingItemIndex !== -1 ? existingItemIndex : cart.length - 1];
    }

    /**
     * Remove product from cart
     * @param {number} productId - Product ID to remove
     * @returns {boolean} True if item was removed
     */
    function removeFromCart(productId) {
        const cart = getCart();
        const initialLength = cart.length;
        const updatedCart = cart.filter(function(item) {
            return item.productId !== productId;
        });

        if (updatedCart.length !== initialLength) {
            saveCart(updatedCart);
            updateCartBadge();
            return true;
        }
        return false;
    }

    /**
     * Update quantity of a product in cart
     * @param {number} productId - Product ID
     * @param {number} quantity - New quantity (removes item if 0 or less)
     * @returns {boolean} True if cart was updated
     */
    function updateQuantity(productId, quantity) {
        const cart = getCart();
        const itemIndex = cart.findIndex(function(item) {
            return item.productId === productId;
        });

        if (itemIndex === -1) {
            return false;
        }

        // Remove item if quantity is 0 or less
        if (quantity <= 0) {
            return removeFromCart(productId);
        }

        // Update quantity
        cart[itemIndex].quantity = quantity;
        saveCart(cart);
        updateCartBadge();
        return true;
    }

    /**
     * Get total number of items in cart
     * @returns {number} Total item count
     */
    function getTotalItems() {
        const cart = getCart();
        return cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);
    }

    /**
     * Get total price of all items in cart
     * @returns {number} Total price
     */
    function getTotalPrice() {
        const cart = getCart();
        return cart.reduce(function(total, item) {
            return total + (item.price * item.quantity);
        }, 0);
    }

    /**
     * Clear all items from cart
     */
    function clearCart() {
        saveCart([]);
        updateCartBadge();
    }

    /**
     * Update cart badge in navigation
     * Updates within 200ms as per requirement 6.5
     */
    function updateCartBadge() {
        // Use requestAnimationFrame for efficient DOM update
        requestAnimationFrame(function() {
            const totalItems = getTotalItems();
            const badge = $('.cart-badge');
            
            if (badge.length > 0) {
                if (totalItems > 0) {
                    badge.text(totalItems).show();
                } else {
                    badge.text('0').hide();
                }
            }
        });
    }

    /**
     * Get cart item by product ID
     * @param {number} productId - Product ID
     * @returns {Object|null} Cart item or null if not found
     */
    function getCartItem(productId) {
        const cart = getCart();
        return cart.find(function(item) {
            return item.productId === productId;
        }) || null;
    }

    // Export functions to global scope
    window.CartModule = {
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        updateQuantity: updateQuantity,
        getCart: getCart,
        getTotalItems: getTotalItems,
        getTotalPrice: getTotalPrice,
        clearCart: clearCart,
        updateCartBadge: updateCartBadge,
        getCartItem: getCartItem
    };

})(window);
