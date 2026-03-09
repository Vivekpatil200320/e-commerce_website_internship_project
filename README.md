# E-Commerce Website

A fully functional multi-page e-commerce website built with Bootstrap 4.5, jQuery, and Font-Awesome 5.10.0.

## Features

- **Home Page**: Featured products and navigation
- **Product Listing**: Browse all products with filters (category, price range, availability)
- **Product Details**: View product information with image carousel
- **Categories**: Browse products by category
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout**: Complete order with shipping and payment information
- **Order Confirmation**: View order details after successful purchase
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Technologies Used

- HTML5
- CSS3
- Bootstrap 4.5.2
- jQuery 3.5.1
- Font Awesome 5.10.0
- localStorage for cart persistence

## Project Structure

```
├── index.html              # Home page
├── products.html           # Product listing page
├── product-detail.html     # Product detail page
├── categories.html         # Categories page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout page
├── confirmation.html      # Order confirmation page
├── css/
│   └── custom.css         # Custom styles
├── js/
│   ├── app.js            # Application controller
│   ├── cart.js           # Cart management module
│   ├── products.js       # Product data module
│   ├── filters.js        # Filter functionality
│   └── main.js           # Utility functions
├── data/
│   └── products.json     # Product data
└── images/
    └── placeholder.jpg   # Placeholder image
```

## How to Run

The website requires a local web server to function properly (browsers block loading JSON files via file:// protocol).

### Option 1: Python (Recommended)

```bash
python -m http.server 8000
```

Then open: http://localhost:8000

### Option 2: Node.js

```bash
npx http-server -p 8000
```

Then open: http://localhost:8000

### Option 3: PHP

```bash
php -S localhost:8000
```

Then open: http://localhost:8000

### Option 4: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Quick Start Scripts

For convenience, you can use the provided startup scripts:

- **Windows**: Double-click `start-server.bat`
- **Mac/Linux**: Run `./start-server.sh`

## Features Implemented

✅ Responsive navigation with cart badge
✅ Product filtering (category, price, availability)
✅ Image carousel on product details
✅ Add to cart functionality
✅ Cart quantity controls with +/- buttons
✅ Form validation on checkout
✅ Order confirmation with order number
✅ localStorage cart persistence
✅ Mobile-friendly design (44px minimum touch targets)
✅ Accessibility features (keyboard navigation, ARIA labels)
✅ Performance optimized (filter updates <500ms, cart updates <200ms)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Product images are placeholders. Add actual images to `images/products/` folder
- Cart data persists in browser localStorage during session
- No backend server required - fully client-side application
- All 12 requirements from specification are implemented

## Author

Created as part of an e-commerce website development project.

## License

This project is for educational purposes.
