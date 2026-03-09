# How to Run the E-Commerce Website

The website needs to be served through a web server to work properly. Browsers block loading JSON files when opening HTML files directly (file:// protocol).

## Quick Start Options

### Option 1: Python (Easiest if you have Python installed)

Open a terminal in the project directory and run:

```bash
python -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

### Option 2: Node.js (If you have Node.js installed)

Open a terminal in the project directory and run:

```bash
npx http-server -p 8000
```

Then open your browser to: **http://localhost:8000**

### Option 3: PHP (If you have PHP installed)

Open a terminal in the project directory and run:

```bash
php -S localhost:8000
```

Then open your browser to: **http://localhost:8000**

### Option 4: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your browser will open automatically

## Testing the Website

Once the server is running, you can:

1. **Home Page**: http://localhost:8000/index.html
2. **Products Page**: http://localhost:8000/products.html
3. **Categories Page**: http://localhost:8000/categories.html
4. **Cart Page**: http://localhost:8000/cart.html
5. **Checkout Page**: http://localhost:8000/checkout.html

## Running Tests

- **Performance Tests**: http://localhost:8000/test-performance.html
- **Accessibility Tests**: http://localhost:8000/test-accessibility.html
- **E2E Tests**: http://localhost:8000/test-e2e-complete.html

## Troubleshooting

**Problem**: "Failed to load products" error
**Solution**: Make sure you're accessing the site through http://localhost:8000 and NOT by opening the HTML file directly in your browser.

**Problem**: Port 8000 already in use
**Solution**: Use a different port number (e.g., 8080, 3000, 5000):
- Python: `python -m http.server 8080`
- Node: `npx http-server -p 8080`
- PHP: `php -S localhost:8080`

**Problem**: Command not found
**Solution**: Install the required software:
- Python: https://www.python.org/downloads/
- Node.js: https://nodejs.org/
- PHP: https://www.php.net/downloads

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.
