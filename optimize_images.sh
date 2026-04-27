#!/bin/bash

# Image Optimization Script for Hettiarachchi Surgicals Website
# This script compresses and optimizes all images for web delivery

echo "🖼️  Starting image optimization..."

# Create optimized directories
mkdir -p docs/images/products/optimized
mkdir -p docs/images/location/optimized

# Function to optimize images
optimize_image() {
    local input_file="$1"
    local output_file="$2"
    local max_width="$3"
    local quality="$4"
    
    echo "Processing: $(basename "$input_file")"
    
    # Get original file size
    original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
    
    # Convert and optimize the image
    convert "$input_file" \
        -resize "${max_width}x${max_width}>" \
        -quality "$quality" \
        -strip \
        -interlace JPEG \
        -colorspace sRGB \
        "$output_file"
    
    # Get optimized file size
    optimized_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
    
    # Calculate compression ratio
    if [ "$original_size" -gt 0 ]; then
        compression_ratio=$((100 - (optimized_size * 100 / original_size)))
        echo "  ✅ Compressed by ${compression_ratio}% (${original_size} → ${optimized_size} bytes)"
    else
        echo "  ✅ Optimized: ${optimized_size} bytes"
    fi
}

# Optimize product images (higher quality for product showcase)
echo "📦 Optimizing product images..."
for img in docs/images/products/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        optimize_image "$img" "docs/images/products/optimized/$filename" 800 85
    fi
done

# Optimize location images (standard quality)
echo "📍 Optimizing location images..."
for img in docs/images/location/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        optimize_image "$img" "docs/images/location/optimized/$filename" 600 80
    fi
done

# Create WebP versions for better compression
echo "🌐 Creating WebP versions..."
for img in docs/images/products/optimized/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)
        convert "$img" -quality 85 "docs/images/products/optimized/${filename}.webp"
        echo "  ✅ Created WebP: ${filename}.webp"
    fi
done

for img in docs/images/location/optimized/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)
        convert "$img" -quality 80 "docs/images/location/optimized/${filename}.webp"
        echo "  ✅ Created WebP: ${filename}.webp"
    fi
done

# Calculate total savings
echo ""
echo "📊 Optimization Summary:"
echo "========================"

# Count files
product_count=$(ls docs/images/products/optimized/*.jpg 2>/dev/null | wc -l)
location_count=$(ls docs/images/location/optimized/*.jpg 2>/dev/null | wc -l)
webp_count=$(ls docs/images/products/optimized/*.webp docs/images/location/optimized/*.webp 2>/dev/null | wc -l)

echo "✅ Optimized $product_count product images"
echo "✅ Optimized $location_count location images"
echo "✅ Created $webp_count WebP versions"
echo ""
echo "🎉 Image optimization complete!"
echo ""
echo "Next steps:"
echo "1. Update the JavaScript to use optimized images"
echo "2. Consider implementing WebP support with fallbacks"
echo "3. Test the website to ensure faster loading times"
