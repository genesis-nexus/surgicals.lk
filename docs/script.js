// Modern JavaScript for Hettiarachchi Surgicals Website

// Product and location image data
const productImages = [
  {
    src: "images/products/IMG_2812 2.jpg",
    alt: "Surgical consumables and medical equipment",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2813 2.jpg",
    alt: "Medical supplies and surgical instruments",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2815 2.jpg",
    alt: "High-quality surgical consumables",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2816 2.jpg",
    alt: "Professional medical equipment",
    category: "equipment"
  },
  {
    src: "images/products/IMG_2818 2.jpg",
    alt: "Surgical supplies for healthcare facilities",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2823 2.jpg",
    alt: "Medical devices and surgical instruments",
    category: "equipment"
  },
  {
    src: "images/products/IMG_2829 2.jpg",
    alt: "Quality surgical consumables",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2830 2.jpg",
    alt: "Professional medical supplies",
    category: "supplies"
  },
  {
    src: "images/products/IMG_2832 2.jpg",
    alt: "Surgical equipment and instruments",
    category: "equipment"
  },
  {
    src: "images/products/IMG_2833 2.jpg",
    alt: "Medical consumables for hospitals",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2834 2.jpg",
    alt: "High-quality surgical supplies",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2836 2.jpg",
    alt: "Professional medical equipment",
    category: "equipment"
  },
  {
    src: "images/products/IMG_2837 2.jpg",
    alt: "Surgical consumables and medical devices",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2838 2.jpg",
    alt: "Medical supplies for healthcare",
    category: "supplies"
  },
  {
    src: "images/products/IMG_2839 2.jpg",
    alt: "Quality surgical instruments",
    category: "equipment"
  },
  {
    src: "images/products/IMG_2841 2.jpg",
    alt: "Professional surgical consumables",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2842 2.jpg",
    alt: "Medical equipment and supplies",
    category: "equipment"
  },
  {
    src: "images/products/IMG_2844 2.jpg",
    alt: "Surgical supplies for medical facilities",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2847 2.jpg",
    alt: "High-quality medical consumables",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2848 2.jpg",
    alt: "Professional surgical equipment",
    category: "equipment"
  },
  {
    src: "images/products/IMG_2849 2.jpg",
    alt: "Medical supplies and surgical instruments",
    category: "supplies"
  },
  {
    src: "images/products/IMG_2851 2.jpg",
    alt: "Quality surgical consumables",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2852 2.jpg",
    alt: "Professional medical equipment",
    category: "equipment"
  },
  {
    src: "images/products/IMG_2854 2.jpg",
    alt: "Surgical supplies for healthcare",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2857 2.jpg",
    alt: "Medical consumables and instruments",
    category: "surgical"
  },
  {
    src: "images/products/IMG_2859 2.jpg",
    alt: "High-quality surgical equipment",
    category: "equipment"
  },
  {
    src: "images/products/IMG_2860 2.jpg",
    alt: "Professional medical supplies",
    category: "supplies"
  }
];

const locationImages = [
  {
    src: "images/location/IMG_2799 2.jpg",
    alt: "Hettiarachchi Surgicals facility exterior in Galle"
  },
  {
    src: "images/location/IMG_2801 2.jpg",
    alt: "Our medical supply facility entrance"
  },
  {
    src: "images/location/IMG_2808 2.jpg",
    alt: "Hettiarachchi Surgicals location in Galle"
  },
  {
    src: "images/location/IMG_2810 2.jpg",
    alt: "Our surgical supplies facility"
  }
];

// Search functionality
class ProductSearch {
  constructor() {
    this.searchInput = null;
    this.searchResults = null;
    this.allProducts = productImages;
    this.filteredProducts = [...this.allProducts];
    this.init();
  }

  init() {
    this.createSearchInterface();
    this.bindEvents();
    this.loadInitialGallery();
  }

  createSearchInterface() {
    const productsSection = document.getElementById('products');
    const productsHeading = document.getElementById('products-heading');
    
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
      <div class="search-box">
        <input type="text" id="product-search" placeholder="Search products..." aria-label="Search products">
        <button type="button" id="search-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
      <div class="filter-buttons">
        <button class="filter-btn active" data-category="all">All Products</button>
        <button class="filter-btn" data-category="surgical">Surgical</button>
        <button class="filter-btn" data-category="equipment">Equipment</button>
        <button class="filter-btn" data-category="supplies">Supplies</button>
      </div>
    `;
    
    // Insert search container after the heading
    productsHeading.insertAdjacentElement('afterend', searchContainer);
    
    this.searchInput = document.getElementById('product-search');
    this.searchResults = document.getElementById('products-gallery');
  }

  bindEvents() {
    // Search input event
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    // Search button event
    document.getElementById('search-btn').addEventListener('click', () => {
      this.handleSearch(this.searchInput.value);
    });

    // Filter button events
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleFilter(e.target.dataset.category);
        this.updateActiveFilter(e.target);
      });
    });

    // Enter key on search input
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSearch(e.target.value);
      }
    });
  }

  handleSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(product => 
        product.alt.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }
    
    this.renderGallery();
  }

  handleFilter(category) {
    if (category === 'all') {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(product => 
        product.category === category
      );
    }
    
    this.renderGallery();
  }

  updateActiveFilter(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
  }

  loadInitialGallery() {
    this.renderGallery();
  }

  renderGallery() {
    this.searchResults.innerHTML = '';
    
    if (this.filteredProducts.length === 0) {
      this.searchResults.innerHTML = `
        <div class="no-results">
          <p>No products found matching your search criteria.</p>
        </div>
      `;
      return;
    }

    this.filteredProducts.forEach(product => {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'gallery-item';
      imgContainer.innerHTML = `
        <img src="${product.src}" 
             alt="${product.alt}" 
             loading="lazy"
             onerror="this.style.display='none'">
        <div class="image-overlay">
          <span class="category-tag">${product.category}</span>
        </div>
      `;
      this.searchResults.appendChild(imgContainer);
    });
  }
}

// Image lazy loading and error handling
class ImageLoader {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupImageModal();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  setupImageModal() {
    // Create modal for image viewing
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img class="modal-image" src="" alt="">
        <div class="modal-caption"></div>
      </div>
    `;
    document.body.appendChild(modal);

    // Add click events to gallery images
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG' && e.target.closest('.gallery')) {
        this.openModal(e.target);
      }
    });

    // Close modal events
    modal.querySelector('.close-modal').addEventListener('click', () => {
      this.closeModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        this.closeModal();
      }
    });
  }

  openModal(img) {
    const modal = document.querySelector('.image-modal');
    const modalImg = modal.querySelector('.modal-image');
    const caption = modal.querySelector('.modal-caption');
    
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    caption.textContent = img.alt;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.querySelector('.image-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Smooth scrolling for navigation links
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Load location images
  const locationGallery = document.getElementById('location-gallery');
  locationImages.forEach(location => {
    const img = document.createElement('img');
    img.src = location.src;
    img.alt = location.alt;
    img.loading = 'lazy';
    img.onerror = () => img.style.display = 'none';
    locationGallery.appendChild(img);
  });

  // Initialize all features
  new ProductSearch();
  new ImageLoader();
  new SmoothScroll();
  new PerformanceMonitor();

  // Add loading states
  document.body.classList.add('loaded');
});

// Add CSS for search functionality and modal
const additionalStyles = `
  .search-container {
    margin: 2rem 0;
    text-align: center;
  }

  .search-box {
    display: flex;
    max-width: 500px;
    margin: 0 auto 1.5rem;
    position: relative;
  }

  .search-box input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 50px 0 0 50px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .search-box input:focus {
    border-color: #2563eb;
  }

  .search-box button {
    padding: 0.75rem 1.5rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 0 50px 50px 0;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .search-box button:hover {
    background: #1d4ed8;
  }

  .filter-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    border: 2px solid #e5e7eb;
    background: white;
    color: #374151;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .filter-btn:hover,
  .filter-btn.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
  }

  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    padding: 1rem;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .gallery-item:hover .image-overlay {
    transform: translateY(0);
  }

  .category-tag {
    background: #2563eb;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: capitalize;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: #6b7280;
  }

  .image-modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(5px);
  }

  .modal-content {
    position: relative;
    margin: auto;
    padding: 2rem;
    width: 90%;
    max-width: 800px;
    top: 50%;
    transform: translateY(-50%);
  }

  .modal-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  }

  .modal-caption {
    color: white;
    text-align: center;
    margin-top: 1rem;
    font-size: 1.1rem;
  }

  .close-modal {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    z-index: 1001;
  }

  .close-modal:hover {
    color: #ccc;
  }

  @media (max-width: 768px) {
    .search-box {
      flex-direction: column;
    }

    .search-box input {
      border-radius: 50px;
      margin-bottom: 0.5rem;
    }

    .search-box button {
      border-radius: 50px;
    }

    .filter-buttons {
      gap: 0.25rem;
    }

    .filter-btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
    }
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);