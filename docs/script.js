// Modern JavaScript for Hettiarachchi Surgicals Website

// Product and location image data
const productImages = [
  {
    src: "images/products/optimized/IMG_2812 2.jpg",
    webp: "images/products/optimized/IMG_2812 2.webp",
    alt: "Surgical consumables and medical equipment",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2813 2.jpg",
    webp: "images/products/optimized/IMG_2813 2.webp",
    alt: "Medical supplies and surgical instruments",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2815 2.jpg",
    webp: "images/products/optimized/IMG_2815 2.webp",
    alt: "High-quality surgical consumables",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2816 2.jpg",
    webp: "images/products/optimized/IMG_2816 2.webp",
    alt: "Professional medical equipment",
    category: "equipment"
  },
  {
    src: "images/products/optimized/IMG_2818 2.jpg",
    webp: "images/products/optimized/IMG_2818 2.webp",
    alt: "Surgical supplies for healthcare facilities",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2823 2.jpg",
    webp: "images/products/optimized/IMG_2823 2.webp",
    alt: "Medical devices and surgical instruments",
    category: "equipment"
  },
  {
    src: "images/products/optimized/IMG_2829 2.jpg",
    webp: "images/products/optimized/IMG_2829 2.webp",
    alt: "Quality surgical consumables",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2830 2.jpg",
    webp: "images/products/optimized/IMG_2830 2.webp",
    alt: "Professional medical supplies",
    category: "supplies"
  },
  {
    src: "images/products/optimized/IMG_2832 2.jpg",
    webp: "images/products/optimized/IMG_2832 2.webp",
    alt: "Surgical equipment and instruments",
    category: "equipment"
  },
  {
    src: "images/products/optimized/IMG_2833 2.jpg",
    webp: "images/products/optimized/IMG_2833 2.webp",
    alt: "Medical consumables for hospitals",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2834 2.jpg",
    webp: "images/products/optimized/IMG_2834 2.webp",
    alt: "High-quality surgical supplies",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2836 2.jpg",
    webp: "images/products/optimized/IMG_2836 2.webp",
    alt: "Professional medical equipment",
    category: "equipment"
  },
  {
    src: "images/products/optimized/IMG_2837 2.jpg",
    webp: "images/products/optimized/IMG_2837 2.webp",
    alt: "Surgical consumables and medical devices",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2838 2.jpg",
    webp: "images/products/optimized/IMG_2838 2.webp",
    alt: "Medical supplies for healthcare",
    category: "supplies"
  },
  {
    src: "images/products/optimized/IMG_2839 2.jpg",
    webp: "images/products/optimized/IMG_2839 2.webp",
    alt: "Quality surgical instruments",
    category: "equipment"
  },
  {
    src: "images/products/optimized/IMG_2841 2.jpg",
    webp: "images/products/optimized/IMG_2841 2.webp",
    alt: "Professional surgical consumables",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2842 2.jpg",
    webp: "images/products/optimized/IMG_2842 2.webp",
    alt: "Medical equipment and supplies",
    category: "equipment"
  },
  {
    src: "images/products/optimized/IMG_2844 2.jpg",
    webp: "images/products/optimized/IMG_2844 2.webp",
    alt: "Surgical supplies for medical facilities",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2847 2.jpg",
    webp: "images/products/optimized/IMG_2847 2.webp",
    alt: "High-quality medical consumables",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2848 2.jpg",
    webp: "images/products/optimized/IMG_2848 2.webp",
    alt: "Professional surgical equipment",
    category: "equipment"
  },
  {
    src: "images/products/optimized/IMG_2849 2.jpg",
    webp: "images/products/optimized/IMG_2849 2.webp",
    alt: "Medical supplies and surgical instruments",
    category: "supplies"
  },
  {
    src: "images/products/optimized/IMG_2851 2.jpg",
    webp: "images/products/optimized/IMG_2851 2.webp",
    alt: "Quality surgical consumables",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2852 2.jpg",
    webp: "images/products/optimized/IMG_2852 2.webp",
    alt: "Professional medical equipment",
    category: "equipment"
  },
  {
    src: "images/products/optimized/IMG_2854 2.jpg",
    webp: "images/products/optimized/IMG_2854 2.webp",
    alt: "Surgical supplies for healthcare",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2857 2.jpg",
    webp: "images/products/optimized/IMG_2857 2.webp",
    alt: "Medical consumables and instruments",
    category: "surgical"
  },
  {
    src: "images/products/optimized/IMG_2859 2.jpg",
    webp: "images/products/optimized/IMG_2859 2.webp",
    alt: "High-quality surgical equipment",
    category: "equipment"
  },
  {
    src: "images/products/optimized/IMG_2860 2.jpg",
    webp: "images/products/optimized/IMG_2860 2.webp",
    alt: "Professional medical supplies",
    category: "supplies"
  }
];

const locationImages = [
  {
    src: "images/location/optimized/IMG_2799 2.jpg",
    webp: "images/location/optimized/IMG_2799 2.webp",
    alt: "Hettiarachchi Surgicals facility exterior in Galle"
  },
  {
    src: "images/location/optimized/IMG_2801 2.jpg",
    webp: "images/location/optimized/IMG_2801 2.webp",
    alt: "Our medical supply facility entrance"
  },
  {
    src: "images/location/optimized/IMG_2808 2.jpg",
    webp: "images/location/optimized/IMG_2808 2.webp",
    alt: "Hettiarachchi Surgicals location in Galle"
  },
  {
    src: "images/location/optimized/IMG_2810 2.jpg",
    webp: "images/location/optimized/IMG_2810 2.webp",
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
    // Elements are bound after creation
    this.searchInput = document.getElementById('product-search');
    this.searchResults = document.getElementById('products-gallery');

    if (this.searchInput && this.searchResults) {
      this.bindEvents();
      this.loadInitialGallery();
    }
  }

  createSearchInterface() {
    const placeholder = document.getElementById('search-interface-placeholder');
    if (!placeholder) return;

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

    placeholder.appendChild(searchContainer);
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
        <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
          <p>No products found matching your search criteria.</p>
        </div>
      `;
      return;
    }

    this.filteredProducts.forEach(product => {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'gallery-item';

      const picture = document.createElement('picture');

      if (product.webp) {
        const webpSource = document.createElement('source');
        webpSource.srcset = product.webp;
        webpSource.type = 'image/webp';
        picture.appendChild(webpSource);
      }

      const img = document.createElement('img');
      img.src = product.src;
      img.alt = product.alt;
      img.loading = 'lazy';
      img.onerror = () => img.style.display = 'none';
      picture.appendChild(img);

      imgContainer.innerHTML = `
        <div class="image-overlay">
          <span class="category-tag">${product.category}</span>
        </div>
      `;

      imgContainer.insertBefore(picture, imgContainer.firstChild);
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

    document.addEventListener('click', (e) => {
      // Handle clicks on images within gallery items
      if (e.target.tagName === 'IMG' && e.target.closest('.gallery-item')) {
        this.openModal(e.target);
      }
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
      this.closeModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
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
    modal.style.display = 'flex'; // Changed to flex for centering
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.querySelector('.image-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Mobile Menu Toggle
class MobileMenu {
  constructor() {
    this.toggle = document.querySelector('.mobile-menu-toggle');
    this.nav = document.querySelector('.main-nav');
    this.init();
  }

  init() {
    if (!this.toggle || !this.nav) return;

    this.toggle.addEventListener('click', () => {
      this.nav.classList.toggle('active');
      const isExpanded = this.nav.classList.contains('active');
      this.toggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking a link
    this.nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.nav.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Theme Toggle
class ThemeToggle {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);

    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (this.themeToggle) {
      this.themeToggle.setAttribute('aria-label',
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      );
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Load location images
  const locationGallery = document.getElementById('location-gallery');
  if (locationGallery) {
    locationImages.forEach(location => {
      const picture = document.createElement('picture');

      if (location.webp) {
        const webpSource = document.createElement('source');
        webpSource.srcset = location.webp;
        webpSource.type = 'image/webp';
        picture.appendChild(webpSource);
      }

      const img = document.createElement('img');
      img.src = location.src;
      img.alt = location.alt;
      img.loading = 'lazy';
      img.onerror = () => img.style.display = 'none';
      picture.appendChild(img);

      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.appendChild(picture);

      locationGallery.appendChild(item);
    });
  }

  // Initialize features
  new ProductSearch();
  new ImageLoader();
  new ThemeToggle();
  new MobileMenu();

  // Add loaded class
  document.body.classList.add('loaded');

  // Log performance
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }
    });
  }
});