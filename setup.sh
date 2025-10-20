#!/bin/bash

# Personal CV Website Setup Script
# This script sets up the development environment and installs all dependencies

set -e

echo "🚀 Setting up Personal CV Website..."
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION detected. Please upgrade to Node.js 18+"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set up Husky git hooks
echo "🔧 Setting up git hooks..."
npm run prepare

# Make sure pre-commit hook is executable
chmod +x .husky/pre-commit

# Copy environment variables
if [ ! -f ".env.local" ]; then
    echo "🔑 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your actual API keys"
fi

# Create placeholder images if they don't exist
echo "🖼️  Setting up placeholder assets..."

# Convert SVG avatar to JPG placeholder if ImageMagick is available
if command -v convert &> /dev/null; then
    if [ -f "public/avatar.svg" ] && [ ! -f "public/avatar.jpg" ]; then
        convert public/avatar.svg -background white -flatten public/avatar.jpg
        echo "✅ Created avatar.jpg from SVG placeholder"
    fi
else
    echo "⚠️  ImageMagick not found. You'll need to manually replace public/avatar.jpg"
fi

# Create favicon if it doesn't exist
if [ ! -f "public/favicon.ico" ]; then
    echo "🎯 Creating favicon placeholder..."
    # Create a simple 32x32 favicon
    cat > public/favicon.ico << 'EOF'
# This is a placeholder favicon file
# Replace this with your actual favicon.ico (32x32 pixels)
# You can generate one at: https://favicon.io/
EOF
fi

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run tests
echo "🧪 Running tests..."
npm run test -- --run

# Run linting
echo "🔧 Running linting..."
npm run lint

# Build the project
echo "🏗️  Building project..."
npm run build

echo ""
echo "🎉 Setup completed successfully!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Edit data/profile.ts with your personal information"
echo "2. Replace public/avatar.jpg with your actual profile photo"
echo "3. Replace public/cv.pdf with your actual CV"
echo "4. Edit .env.local with your API keys for the contact form"
echo "5. Start the development server: npm run dev"
echo ""
echo "For deployment:"
echo "- Vercel: Connect your GitHub repository at vercel.com"
echo "- Netlify: Connect your GitHub repository at netlify.com"
echo ""
echo "Documentation: See README.md for detailed instructions"
echo ""
echo "Happy coding! 🚀"
