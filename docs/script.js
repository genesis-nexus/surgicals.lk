// Dynamically load product and location images
const productImages = [
  "../images/products/IMG_2812 2.jpg",
  "../images/products/IMG_2813 2.jpg",
  "../images/products/IMG_2815 2.jpg",
  "../images/products/IMG_2816 2.jpg",
  "../images/products/IMG_2818 2.jpg",
  "../images/products/IMG_2823 2.jpg",
  "../images/products/IMG_2829 2.jpg",
  "../images/products/IMG_2830 2.jpg",
  "../images/products/IMG_2832 2.jpg",
  "../images/products/IMG_2833 2.jpg",
  "../images/products/IMG_2834 2.jpg",
  "../images/products/IMG_2836 2.jpg",
  "../images/products/IMG_2837 2.jpg",
  "../images/products/IMG_2838 2.jpg",
  "../images/products/IMG_2839 2.jpg",
  "../images/products/IMG_2841 2.jpg",
  "../images/products/IMG_2842 2.jpg",
  "../images/products/IMG_2844 2.jpg",
  "../images/products/IMG_2847 2.jpg",
  "../images/products/IMG_2848 2.jpg",
  "../images/products/IMG_2849 2.jpg",
  "../images/products/IMG_2851 2.jpg",
  "../images/products/IMG_2852 2.jpg",
  "../images/products/IMG_2854 2.jpg",
  "../images/products/IMG_2857 2.jpg",
  "../images/products/IMG_2859 2.jpg",
  "../images/products/IMG_2860 2.jpg"
];
const locationImages = [
  "../images/location/IMG_2799 2.jpg",
  "../images/location/IMG_2801 2.jpg",
  "../images/location/IMG_2808 2.jpg",
  "../images/location/IMG_2810 2.jpg"
];
function loadGallery(images, containerId) {
  const container = document.getElementById(containerId);
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    container.appendChild(img);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  loadGallery(productImages, 'products-gallery');
  loadGallery(locationImages, 'location-gallery');
});
