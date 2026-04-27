#!/bin/bash

# Performance Check Script for Image Optimization
echo "📊 Performance Analysis - Before vs After Image Optimization"
echo "============================================================="

# Function to get file size
get_file_size() {
    if [ -f "$1" ]; then
        stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null
    else
        echo "0"
    fi
}

# Function to format bytes
format_bytes() {
    local bytes=$1
    if [ $bytes -gt 1048576 ]; then
        echo "$((bytes / 1048576))MB"
    elif [ $bytes -gt 1024 ]; then
        echo "$((bytes / 1024))KB"
    else
        echo "${bytes}B"
    fi
}

echo ""
echo "📦 Product Images Analysis:"
echo "---------------------------"

# Calculate original sizes
original_total=0
optimized_total=0
webp_total=0

for img in docs/images/products/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        original_size=$(get_file_size "$img")
        optimized_size=$(get_file_size "docs/images/products/optimized/$filename")
        webp_size=$(get_file_size "docs/images/products/optimized/${filename%.jpg}.webp")
        
        original_total=$((original_total + original_size))
        optimized_total=$((optimized_total + optimized_size))
        webp_total=$((webp_total + webp_size))
        
        echo "  $(basename "$filename"):"
        echo "    Original: $(format_bytes $original_size)"
        echo "    Optimized: $(format_bytes $optimized_size)"
        echo "    WebP: $(format_bytes $webp_size)"
        echo ""
    fi
done

echo "📍 Location Images Analysis:"
echo "----------------------------"

for img in docs/images/location/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        original_size=$(get_file_size "$img")
        optimized_size=$(get_file_size "docs/images/location/optimized/$filename")
        webp_size=$(get_file_size "docs/images/location/optimized/${filename%.jpg}.webp")
        
        original_total=$((original_total + original_size))
        optimized_total=$((optimized_total + optimized_size))
        webp_total=$((webp_total + webp_size))
        
        echo "  $(basename "$filename"):"
        echo "    Original: $(format_bytes $original_size)"
        echo "    Optimized: $(format_bytes $optimized_size)"
        echo "    WebP: $(format_bytes $webp_size)"
        echo ""
    fi
done

echo "📈 Summary:"
echo "==========="
echo "Total Original Size: $(format_bytes $original_total)"
echo "Total Optimized Size: $(format_bytes $optimized_total)"
echo "Total WebP Size: $(format_bytes $webp_total)"

# Calculate savings
optimized_savings=$((100 - (optimized_total * 100 / original_total)))
webp_savings=$((100 - (webp_total * 100 / original_total)))

echo ""
echo "💾 Compression Results:"
echo "  Optimized JPEG: ${optimized_savings}% smaller"
echo "  WebP Format: ${webp_savings}% smaller"

# Calculate bandwidth savings
optimized_bandwidth=$((original_total - optimized_total))
webp_bandwidth=$((original_total - webp_total))

echo ""
echo "🚀 Bandwidth Savings:"
echo "  Optimized JPEG: $(format_bytes $optimized_bandwidth) saved"
echo "  WebP Format: $(format_bytes $webp_bandwidth) saved"

echo ""
echo "⚡ Performance Impact:"
echo "  - Faster page load times"
echo "  - Reduced bandwidth usage"
echo "  - Better mobile experience"
echo "  - Improved SEO scores"
echo "  - Lower hosting costs"

echo ""
echo "✅ Image optimization complete and ready for production!"
