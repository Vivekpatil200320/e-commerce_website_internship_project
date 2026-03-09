// Main JavaScript file for E-Commerce Website

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart badge on page load
$(document).ready(function() {
    // Initialize cart badge using CartModule if available
    // Requirement 11.2: Update badge on page load
    if (window.CartModule) {
        window.CartModule.updateCartBadge();
    } else {
        updateCartBadge();
    }
});

// Function to update cart badge count
// Requirement 11.3: Update badge after cart modifications
// Requirement 11.4: Hide badge when cart is empty
function updateCartBadge() {
    const startTime = performance.now();
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('.cart-badge').text(totalItems);
    
    // Hide badge if cart is empty (Requirement 11.4)
    if (totalItems === 0) {
        $('.cart-badge').hide();
    } else {
        $('.cart-badge').show();
    }
    
    const duration = performance.now() - startTime;
    // Requirement 11.2: Ensure updates complete within 200ms
    if (duration > 200) {
        console.warn('Cart badge update took longer than 200ms: ' + duration.toFixed(2) + 'ms');
    }
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Requirement 11.3: Update badge after cart modifications
    updateCartBadge();
}

// Function to add item to cart
function addToCart(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification('Product added to cart!', 'success');
}

// Function to show notification
function showNotification(message, type = 'info') {
    const alertClass = `alert-${type}`;
    const notification = $(`
        <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
             style="top: 80px; right: 20px; z-index: 9999; min-width: 250px;" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `);
    
    $('body').append(notification);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        notification.alert('close');
    }, 3000);
}

/**
 * Show loading indicator for operations over 300ms
 * Requirement 10.4: Add loading indicators for operations over 300ms
 * @param {string} targetElement - jQuery selector for the element to show loading in
 */
function showLoadingIndicator(targetElement) {
    const loadingHtml = '<div class="text-center py-4 loading-indicator">' +
        '<div class="spinner-border text-primary" role="status">' +
            '<span class="sr-only">Loading...</span>' +
        '</div>' +
        '<p class="mt-2 text-muted">Loading...</p>' +
    '</div>';
    
    $(targetElement).html(loadingHtml);
}

/**
 * Hide loading indicator
 * @param {string} targetElement - jQuery selector for the element
 */
function hideLoadingIndicator(targetElement) {
    $(targetElement).find('.loading-indicator').remove();
}

/**
 * Add loading state to button
 * Requirement 10.4: Visual feedback for long operations
 * @param {jQuery} button - Button element
 */
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.addClass('loading').prop('disabled', true);
        button.data('original-text', button.html());
    } else {
        button.removeClass('loading').prop('disabled', false);
        const originalText = button.data('original-text');
        if (originalText) {
            button.html(originalText);
        }
    }
}
