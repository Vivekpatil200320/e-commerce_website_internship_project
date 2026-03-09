/**
 * Products Module
 * Provides data access functions for product management
 */

(function(window) {
    'use strict';

    // Cache for loaded products
    let productsCache = null;

    /**
     * Load products from JSON file
     * @returns {Promise} Promise that resolves with products array
     */
    function loadProducts() {
        // Return cached data if available
        if (productsCache !== null) {
            return Promise.resolve(productsCache);
        }

        return $.ajax({
            url: 'data/products.json',
            method: 'GET',
            dataType: 'json'
        }).then(function(data) {
            productsCache = data;
            return data;
        }).catch(function(error) {
            console.error('Error loading products:', error);
            throw new Error('Failed to load products');
        });
    }

    /**
     * Filter products based on criteria
     * @param {Object} filters - Filter criteria
     * @param {string} filters.category - Category to filter by
     * @param {number} filters.minPrice - Minimum price
     * @param {number} filters.maxPrice - Maximum price
     * @param {boolean} filters.availableOnly - Show only available products
     * @returns {Promise} Promise that resolves with filtered products array
     */
    function filterProducts(filters) {
        return loadProducts().then(function(products) {
            let filtered = products;

            // Filter by category
            if (filters.category && filters.category !== '') {
                filtered = filtered.filter(function(product) {
                    return product.category === filters.category;
                });
            }

            // Filter by minimum price
            if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== '') {
                const minPrice = parseFloat(filters.minPrice);
                if (!isNaN(minPrice)) {
                    filtered = filtered.filter(function(product) {
                        return product.price >= minPrice;
                    });
                }
            }

            // Filter by maximum price
            if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== '') {
                const maxPrice = parseFloat(filters.maxPrice);
                if (!isNaN(maxPrice)) {
                    filtered = filtered.filter(function(product) {
                        return product.price <= maxPrice;
                    });
                }
            }

            // Filter by availability
            if (filters.availableOnly === true) {
                filtered = filtered.filter(function(product) {
                    return product.availability === true;
                });
            }

            return filtered;
        });
    }

    /**
     * Get a single product by ID
     * @param {number} id - Product ID
     * @returns {Promise} Promise that resolves with product object or null
     */
    function getProductById(id) {
        return loadProducts().then(function(products) {
            const productId = parseInt(id);
            const product = products.find(function(p) {
                return p.id === productId;
            });
            return product || null;
        });
    }

    /**
     * Get list of unique categories
     * @returns {Promise} Promise that resolves with array of category names
     */
    function getCategories() {
        return loadProducts().then(function(products) {
            const categories = [];
            products.forEach(function(product) {
                if (product.category && categories.indexOf(product.category) === -1) {
                    categories.push(product.category);
                }
            });
            return categories.sort();
        });
    }

    /**
     * Get products marked as featured
     * @returns {Promise} Promise that resolves with array of featured products
     */
    function getFeaturedProducts() {
        return loadProducts().then(function(products) {
            return products.filter(function(product) {
                return product.featured === true;
            });
        });
    }

    /**
     * Clear the products cache (useful for testing or forcing reload)
     */
    function clearCache() {
        productsCache = null;
    }

    // Export functions to global scope
    window.ProductsModule = {
        loadProducts: loadProducts,
        filterProducts: filterProducts,
        getProductById: getProductById,
        getCategories: getCategories,
        getFeaturedProducts: getFeaturedProducts,
        clearCache: clearCache
    };

})(window);
