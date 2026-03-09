/**
 * Filters Module
 * Provides filtering functionality for product listings
 */

(function(window) {
    'use strict';

    /**
     * Get current filter values from the form
     * @returns {Object} Filter values object
     */
    function getFilterValues() {
        const category = $('#category-filter').val();
        const minPrice = $('#min-price').val();
        const maxPrice = $('#max-price').val();
        const availableOnly = $('#availability-filter').is(':checked');

        return {
            category: category,
            minPrice: minPrice,
            maxPrice: maxPrice,
            availableOnly: availableOnly
        };
    }

    /**
     * Apply filters to products and return filtered results
     * @param {Object} filters - Filter criteria
     * @returns {Promise} Promise that resolves with filtered products array
     */
    function applyFilters(filters) {
        const startTime = performance.now();

        return window.ProductsModule.filterProducts(filters)
            .then(function(filteredProducts) {
                const endTime = performance.now();
                const duration = endTime - startTime;

                // Log performance for monitoring (requirement 3.5: within 500ms)
                console.log('Filter operation completed in ' + duration.toFixed(2) + 'ms');

                // Ensure filter updates complete within 500ms as per requirement 3.5
                if (duration > 500) {
                    console.warn('Filter operation took longer than 500ms: ' + duration.toFixed(2) + 'ms');
                }

                return filteredProducts;
            });
    }

    /**
     * Clear all filter inputs and reset to default state
     */
    function clearFilters() {
        // Reset category dropdown to "All Categories"
        $('#category-filter').val('');
        
        // Clear price range inputs
        $('#min-price').val('');
        $('#max-price').val('');
        
        // Uncheck availability checkbox
        $('#availability-filter').prop('checked', false);
    }

    // Export functions to global scope
    window.FiltersModule = {
        getFilterValues: getFilterValues,
        applyFilters: applyFilters,
        clearFilters: clearFilters
    };

})(window);
