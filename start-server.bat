@echo off
echo ========================================
echo E-Commerce Website - Local Server
echo ========================================
echo.
echo Starting local web server on port 8000...
echo.
echo Once started, open your browser to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Try Python first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python HTTP Server...
    python -m http.server 8000
    goto :end
)

REM Try PHP if Python not found
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using PHP Built-in Server...
    php -S localhost:8000
    goto :end
)

REM If neither found, show error
echo ERROR: Neither Python nor PHP found!
echo.
echo Please install one of the following:
echo - Python: https://www.python.org/downloads/
echo - PHP: https://www.php.net/downloads
echo - Node.js: https://nodejs.org/ (then run: npx http-server -p 8000)
echo.
pause

:end
