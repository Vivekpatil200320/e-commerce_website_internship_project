#!/bin/bash

echo "========================================"
echo "E-Commerce Website - Local Server"
echo "========================================"
echo ""
echo "Starting local web server on port 8000..."
echo ""
echo "Once started, open your browser to:"
echo "http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

# Try Python first
if command -v python3 &> /dev/null; then
    echo "Using Python HTTP Server..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Using Python HTTP Server..."
    python -m http.server 8000
# Try PHP if Python not found
elif command -v php &> /dev/null; then
    echo "Using PHP Built-in Server..."
    php -S localhost:8000
else
    echo "ERROR: Neither Python nor PHP found!"
    echo ""
    echo "Please install one of the following:"
    echo "- Python: https://www.python.org/downloads/"
    echo "- PHP: https://www.php.net/downloads"
    echo "- Node.js: https://nodejs.org/ (then run: npx http-server -p 8000)"
    echo ""
    exit 1
fi
