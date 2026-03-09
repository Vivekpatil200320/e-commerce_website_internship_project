# E-Commerce Website - Setup Instructions

## Problem
The website shows "Failed to load products" because browsers block loading JSON files when opening HTML files directly (CORS security policy).

## Solution Options

### Option 1: Install Python (Recommended - Easiest)

1. **Download Python**:
   - Go to: https://www.python.org/downloads/
   - Click "Download Python" (latest version)
   - **IMPORTANT**: During installation, check the box "Add Python to PATH"

2. **After Installation**:
   - Open Command Prompt or PowerShell
   - Navigate to your project folder:
     ```
     cd C:\Users\New\Desktop\PROJECTS\istudio_proj
     ```
   - Run:
     ```
     python -m http.server 8000
     ```
   - Open browser to: http://localhost:8000

### Option 2: Install Node.js

1. **Download Node.js**:
   - Go to: https://nodejs.org/
   - Download the LTS version
   - Install with default settings

2. **After Installation**:
   - Open Command Prompt or PowerShell
   - Navigate to your project folder:
     ```
     cd C:\Users\New\Desktop\PROJECTS\istudio_proj
     ```
   - Run:
     ```
     npx http-server -p 8000
     ```
   - Open browser to: http://localhost:8000

### Option 3: Use VS Code Live Server (If you use VS Code)

1. Open VS Code
2. Install "Live Server" extension by Ritwick Dey
3. Right-click on `index.html`
4. Select "Open with Live Server"
5. Website opens automatically in your browser

### Option 4: Use the Standalone Version (No Installation Required)

I've created a standalone version that works without a server:

1. Open `index-standalone.html` in your browser
2. This version has the product data embedded directly

**Note**: The standalone version works but has limitations:
- Cannot test the full AJAX functionality
- Some features may behave differently
- Use this only for quick preview

## Verifying Installation

### Check if Python is installed:
```
python --version
```
Should show: Python 3.x.x

### Check if Node is installed:
```
node --version
```
Should show: v18.x.x or similar

## Troubleshooting

**Problem**: "python is not recognized" or "node is not recognized"
**Solution**: 
1. Restart your computer after installation
2. Make sure you checked "Add to PATH" during installation
3. Reinstall and ensure PATH option is selected

**Problem**: Port 8000 already in use
**Solution**: Use a different port:
- Python: `python -m http.server 8080`
- Node: `npx http-server -p 8080`
Then open: http://localhost:8080

**Problem**: Still not working
**Solution**: Try the standalone version (index-standalone.html) or contact support

## Quick Test

After starting the server, test these URLs:
- Home: http://localhost:8000/index.html
- Products: http://localhost:8000/products.html
- Data file: http://localhost:8000/data/products.json

If the data file loads in your browser, the server is working correctly!
