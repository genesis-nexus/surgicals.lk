// surgicals.lk — static redesign interactivity
// Implements the quote-cart spine and WhatsApp-first CTAs from the design spec.

const WHATSAPP_NUMBER = "94718208654";   // Galle
const WHATSAPP_COLOMBO = "94719249267"; // Colombo (WhatsApp only)

const PRODUCT_CATEGORIES = {
  "mobility-aids": "Mobility Aids",
  diagnostics: "Diagnostics",
  supports: "Supports & Braces",
  beds: "Beds & Mattresses",
  surgical: "Surgical",
  "home-care": "Home Care"
};

// Products surfaced first on the page — the most-requested items.
const FEATURED_SKUS = ["WC03", "CO03", "CN01", "DM01", "DM07", "DI02", "BD02", "DM02"];

// Catalog is quote-only; no prices.
// `folder` selects the image directory; `bases` is one stem for single-image products, or
// [primary, alt] for multi-angle products that should cross-fade on hover.
const products = [
  // ---- Mobility Aids (docs/images/new-cat) ----
  { sku: "WC01", title: "Adult Wheelchair", category: "mobility-aids", folder: "new-cat", bases: ["adult-wheel-chair"] },
  { sku: "WC02", title: "Functional Wheelchair", category: "mobility-aids", folder: "new-cat", bases: ["functional-wheel-chair-1", "functional-wheel-chair-2"] },
  { sku: "WC03", title: "Fully Functional Wheelchair", category: "mobility-aids", folder: "new-cat", bases: ["fully-functional-wheel-chair-1", "fully-functional-wheel-chair-2"] },
  { sku: "WC04", title: "Commode Wheelchair", category: "mobility-aids", folder: "new-cat", bases: ["commode-wheelchair-angle-1", "commode-wheelchair-angle-2"] },

  { sku: "CO01", title: "Commode Chair", category: "mobility-aids", folder: "new-cat", bases: ["commode-chair"] },
  { sku: "CO02", title: "High Commode Chair", category: "mobility-aids", folder: "new-cat", bases: ["commode-chair-high"] },
  { sku: "CO03", title: "Commode Chair with Wheels", category: "mobility-aids", folder: "new-cat", bases: ["commode-chair-with-wheel"] },
  { sku: "CO04", title: "Padded Commode Chair with Wheels", category: "mobility-aids", folder: "new-cat", bases: ["commode-chair-padded-with-wheel"] },
  { sku: "CO05", title: "Toilet Chair", category: "mobility-aids", folder: "new-cat", bases: ["toilet-chair"] },

  { sku: "CN01", title: "Walking Cane", category: "mobility-aids", folder: "new-cat", bases: ["walking-cane"] },
  { sku: "CN02", title: "Walking Cane (Curved Handle)", category: "mobility-aids", folder: "new-cat", bases: ["walking-cane-curved-handle"] },
  { sku: "CN03", title: "Walking Cane (Shaped Handle)", category: "mobility-aids", folder: "new-cat", bases: ["walking-cane-shaped-handle"] },
  { sku: "CN04", title: "Quad Cane", category: "mobility-aids", folder: "new-cat", bases: ["quad-cane"] },
  { sku: "CN05", title: "Tripod Cane", category: "mobility-aids", folder: "new-cat", bases: ["tripod-cane"] },

  { sku: "CR01", title: "Elbow Crutches", category: "mobility-aids", folder: "new-cat", bases: ["elbow-crutches"] },
  { sku: "CR02", title: "Under-arm Crutches", category: "mobility-aids", folder: "new-cat", bases: ["under-arm-crutches"] },

  { sku: "WF01", title: "Walking Frame", category: "mobility-aids", folder: "new-cat", bases: ["walking-frame"] },

  // ---- Diagnostics (docs/images/products) ----
  { sku: "DM01", title: "Norditalia BP-1000 Blood Pressure Monitor", category: "diagnostics", folder: "products", bases: ["IMG_2823 2"] },
  { sku: "DM02", title: "Berrcom Non-contact Infrared Thermometer", category: "diagnostics", folder: "products", bases: ["IMG_2829 2"] },
  { sku: "DM03", title: "3M Littmann Classic III Stethoscope", category: "diagnostics", folder: "products", bases: ["IMG_2834 2", "IMG_2836 2"] },
  { sku: "DM04", title: "Blood Glucose Meters (FreeStyle Optium, Accu-Chek Active, VivaChek Ino)", category: "diagnostics", folder: "products", bases: ["IMG_2844 2"] },
  { sku: "DM07", title: "Fingertip Pulse Oximeter (X1805)", category: "diagnostics", folder: "products", bases: ["IMG_2851 2"] },

  // ---- Orthopaedic Supports ----
  { sku: "SU01", title: "DYNA Clavicle Brace", category: "supports", folder: "products", bases: ["IMG_2830 2"] },
  { sku: "SU02", title: "DYNA Arm Sling", category: "supports", folder: "products", bases: ["IMG_2830 2"] },
  { sku: "SU03", title: "DYNA Soft Cervical Collar", category: "supports", folder: "products", bases: ["IMG_2830 2"] },
  { sku: "SU04", title: "I-M Breathable Lumbar Support (4 Stays)", category: "supports", folder: "products", bases: ["IMG_2838 2"] },

  // ---- Beds & Mattresses ----
  { sku: "BD01", title: "Anti-Decubitus Bubble Mattress", category: "beds", folder: "products", bases: ["IMG_2837 2"] },
  { sku: "BD02", title: "Medtech AB-03 Air Pressure Mattress", category: "beds", folder: "products", bases: ["IMG_2839 2"] },

  // ---- Adult Diapers (grouped under Home Care) ----
  { sku: "DI01", title: "Marvel Guard Adult Diapers (Medium, 10pcs)", category: "home-care", folder: "products", bases: ["IMG_2847 2"] },
  { sku: "DI02", title: "Easy Friends Adult Diapers (Medium, 10pcs)", category: "home-care", folder: "products", bases: ["IMG_2848 2"] },
  { sku: "DI03", title: "Safe Guard Premium Adult Diapers (M/L, 10pcs)", category: "home-care", folder: "products", bases: ["IMG_2849 2"] },

  // ---- Surgical Instruments ----
  { sku: "SG01", title: "Orthopaedic Implant Kit (Plates, Screws & Wires)", category: "surgical", folder: "products", bases: ["IMG_2818 2"] },
  { sku: "SG02", title: "Panther Hemorrhoidal Surgical Stapler (FCSSME33)", category: "surgical", folder: "products", bases: ["IMG_2857 2"] },
  { sku: "SG03", title: "Panther Linear Cutter Stapler (SSAB-80)", category: "surgical", folder: "products", bases: ["IMG_2859 2"] },
  { sku: "SG04", title: "Reloading Unit for Linear Cutter Stapler (SADB-80D)", category: "surgical", folder: "products", bases: ["IMG_2860 2"] },

  // ---- Home Care ----
  { sku: "HC01", title: "Portable Phlegm Suction Unit (9E-A)", category: "home-care", folder: "products", bases: ["IMG_2832 2", "IMG_2833 2"] },
  { sku: "HC02", title: "Benice Facial Steamer (BNS-016)", category: "home-care", folder: "products", bases: ["IMG_2841 2", "IMG_2842 2"] },
  { sku: "HC03", title: "Beta Diabetic Footwear", category: "home-care", folder: "products", bases: ["IMG_2852 2"] },
  { sku: "HC04", title: "TexStretch Rehabilitation Bands & Accessories", category: "home-care", folder: "products", bases: ["IMG_2854 2"] }
].map(p => {
  // new-cat: PNG (transparent) fallback + WebP-with-alpha primary.
  // products: JPG (opaque) fallback + WebP primary.
  const isNewCat = p.folder === "new-cat";
  const dir = isNewCat ? "images/new-cat/optimized" : "images/products/optimized";
  const ext = isNewCat ? "png" : "jpg";
  const images = p.bases.map((base, i) => ({
    src: `${dir}/${base}.${ext}`,
    webp: `${dir}/${base}.webp`,
    alt: `${p.title}${p.bases.length > 1 ? ` — view ${i + 1}` : ""}`
  }));
  return {
    id: p.sku,
    sku: p.sku,
    title: p.title,
    category: p.category,
    summary: PRODUCT_CATEGORIES[p.category] || p.category,
    images,
    image: images[0]
  };
});

const locationImages = [
  { base: "IMG_2799 2", alt: "Hettiarachchi Surgicals facility exterior in Galle" },
  { base: "IMG_2801 2", alt: "Our medical supply facility entrance" },
  { base: "IMG_2808 2", alt: "Hettiarachchi Surgicals location in Galle" },
  { base: "IMG_2810 2", alt: "Our surgical supplies facility" }
].map(({ base, alt }) => ({
  src: `images/location/optimized/${base}.jpg`,
  webp: `images/location/optimized/${base}.webp`,
  alt
}));


// ---------- Quote store ----------

const QuoteStore = {
  key: "surgicals-quote-v1",
  lines: [],
  listeners: new Set(),

  load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw) this.lines = JSON.parse(raw);
    } catch (_) {
      this.lines = [];
    }
  },
  save() {
    try { localStorage.setItem(this.key, JSON.stringify(this.lines)); } catch (_) { /* ignore */ }
    this.listeners.forEach(fn => fn(this.lines));
  },
  subscribe(fn) {
    this.listeners.add(fn);
    fn(this.lines);
    return () => this.listeners.delete(fn);
  },
  add(product, qty = 1) {
    const existing = this.lines.find(l => l.sku === product.sku);
    if (existing) {
      existing.qty += qty;
    } else {
      this.lines.push({ sku: product.sku, title: product.title, image: product.image, qty });
    }
    this.save();
  },
  remove(sku) {
    this.lines = this.lines.filter(l => l.sku !== sku);
    this.save();
  },
  setQty(sku, qty) {
    const line = this.lines.find(l => l.sku === sku);
    if (!line) return;
    if (qty <= 0) return this.remove(sku);
    line.qty = qty;
    this.save();
  },
  totalUnits() { return this.lines.reduce((s, l) => s + l.qty, 0); },
  totalLines() { return this.lines.length; }
};

// ---------- Rendering ----------

function renderFeaturedGrid() {
  const grid = document.getElementById("featured-gallery");
  if (!grid) return;
  const featured = FEATURED_SKUS.map(sku => products.find(p => p.sku === sku)).filter(Boolean);
  const frag = document.createDocumentFragment();
  featured.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.id = `product-${p.sku}`;
    card.innerHTML = renderCardInner(p);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

function renderProductGrid(filter = "all") {
  const grid = document.getElementById("products-gallery");
  const count = document.getElementById("results-count");
  if (!grid) return;

  const list = filter === "all" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; color: var(--ink-500);">
        <p>No products match. Try a different filter or message us on WhatsApp.</p>
      </div>`;
    if (count) count.textContent = "0 products";
    return;
  }

  const frag = document.createDocumentFragment();
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.id = `product-${p.sku}`;
    card.innerHTML = renderCardInner(p);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
  if (count) count.textContent = `${list.length} products`;
}

function renderCardInner(p) {
  const imgs = p.images || [p.image];
  const multi = imgs.length > 1;
  const pictures = imgs.map((img, i) => `
    <picture class="product-card__img${i > 0 ? " product-card__img--alt" : ""}">
      ${img.webp ? `<source srcset="${img.webp}" type="image/webp">` : ""}
      <img src="${img.src}" alt="${img.alt}" loading="lazy">
    </picture>`).join("");
  return `
    <div class="product-card__media${multi ? " product-card__media--multi" : ""}">
      <span class="product-card__tag">${PRODUCT_CATEGORIES[p.category] || p.category}</span>
      ${pictures}
      ${multi ? `<span class="product-card__views" aria-label="${imgs.length} views available">↻ ${imgs.length} views</span>` : ""}
    </div>
    <div class="product-card__body">
      <h3 class="product-card__title">${p.title}</h3>
      <span class="product-card__sku">Code ${p.sku}</span>
      <span class="product-card__status"><span class="dot"></span>Available to quote</span>
    </div>
    <div class="product-card__actions">
      <button type="button" class="btn btn--primary btn--sm" data-add-sku="${p.sku}">Add to quote</button>
      <button type="button" class="btn btn--ghost btn--sm" data-ask-sku="${p.sku}" aria-label="Ask on WhatsApp about ${p.title}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 0 1 2.166 11.89c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
        Ask
      </button>
      <button type="button" class="product-card__share" data-share-sku="${p.sku}" aria-label="Copy link to ${p.title}" title="Copy shareable link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>
    </div>`;
}

function renderLocationGallery() {
  const gallery = document.getElementById("location-gallery");
  if (!gallery) return;
  gallery.innerHTML = "";
  locationImages.forEach(img => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `
      <picture>
        <source srcset="${img.webp}" type="image/webp">
        <img src="${img.src}" alt="${img.alt}" loading="lazy">
      </picture>`;
    gallery.appendChild(item);
  });
}

function renderQuoteDrawer(lines) {
  const body = document.getElementById("quote-drawer-body");
  const summary = document.getElementById("quote-drawer-summary");
  const badge = document.getElementById("quote-badge");
  const toggle = document.getElementById("quote-toggle");

  const units = QuoteStore.totalUnits();
  const lineCount = QuoteStore.totalLines();

  if (badge) badge.textContent = units;
  if (toggle) toggle.setAttribute("data-count", String(units));
  if (summary) summary.textContent = lineCount === 0 ? "0 items" : `${lineCount} product${lineCount > 1 ? "s" : ""} · ${units} unit${units > 1 ? "s" : ""}`;

  if (!body) return;
  if (lines.length === 0) {
    body.innerHTML = `<p class="quote-drawer__empty">Your quote is empty. Add products or a solution bundle to get started.</p>`;
    return;
  }

  body.innerHTML = "";
  lines.forEach(line => {
    const el = document.createElement("div");
    el.className = "quote-line";
    el.innerHTML = `
      <div class="quote-line__thumb">
        <picture>
          ${line.image?.webp ? `<source srcset="${line.image.webp}" type="image/webp">` : ""}
          <img src="${line.image?.src || ""}" alt="">
        </picture>
      </div>
      <div class="quote-line__info">
        <div class="quote-line__title">${line.title}</div>
        <div class="quote-line__sku">Code ${line.sku}</div>
        <div class="quote-line__controls">
          <div class="qty-stepper" role="group" aria-label="Quantity for ${line.title}">
            <button type="button" data-dec="${line.sku}" aria-label="Decrease">−</button>
            <span>${line.qty}</span>
            <button type="button" data-inc="${line.sku}" aria-label="Increase">+</button>
          </div>
          <button type="button" class="quote-line__remove" data-remove="${line.sku}">Remove</button>
        </div>
      </div>`;
    body.appendChild(el);
  });
}

// ---------- Quote drawer behavior ----------

const Drawer = {
  el: null, backdrop: null, lastFocus: null,
  init() {
    this.el = document.getElementById("quote-drawer");
    this.backdrop = document.getElementById("quote-backdrop");
    const toggle = document.getElementById("quote-toggle");
    const close = document.getElementById("quote-drawer-close");

    toggle?.addEventListener("click", () => this.open());
    close?.addEventListener("click", () => this.close());
    this.backdrop?.addEventListener("click", () => this.close());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) this.close();
    });

    // Delegate qty / remove inside drawer
    this.el?.addEventListener("click", (e) => {
      const inc = e.target.closest("[data-inc]");
      const dec = e.target.closest("[data-dec]");
      const rem = e.target.closest("[data-remove]");
      if (inc) {
        const sku = inc.dataset.inc;
        const line = QuoteStore.lines.find(l => l.sku === sku);
        QuoteStore.setQty(sku, (line?.qty || 0) + 1);
      } else if (dec) {
        const sku = dec.dataset.dec;
        const line = QuoteStore.lines.find(l => l.sku === sku);
        QuoteStore.setQty(sku, (line?.qty || 0) - 1);
      } else if (rem) {
        QuoteStore.remove(rem.dataset.remove);
      }
    });

    // Checkout → auto-fill quote form
    document.getElementById("quote-drawer-checkout")?.addEventListener("click", () => {
      prefillQuoteForm();
      this.close();
    });
  },
  isOpen() { return this.el?.classList.contains("is-open"); },
  open() {
    if (!this.el) return;
    this.lastFocus = document.activeElement;
    this.el.classList.add("is-open");
    this.el.setAttribute("aria-hidden", "false");
    if (this.backdrop) {
      this.backdrop.hidden = false;
      requestAnimationFrame(() => this.backdrop.classList.add("is-visible"));
    }
    document.body.style.overflow = "hidden";
    document.getElementById("quote-drawer-close")?.focus();
  },
  close() {
    if (!this.el) return;
    this.el.classList.remove("is-open");
    this.el.setAttribute("aria-hidden", "true");
    if (this.backdrop) {
      this.backdrop.classList.remove("is-visible");
      setTimeout(() => { this.backdrop.hidden = true; }, 200);
    }
    document.body.style.overflow = "";
    this.lastFocus?.focus?.();
  }
};

// ---------- WhatsApp deep-link builder ----------

function productDeepLink(sku) {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}?product=${sku}#product-${sku}`;
}

function buildWhatsAppQuoteMessage() {
  const lines = QuoteStore.lines;
  if (lines.length === 0) {
    return `Hi, I'd like a quote from surgicals.lk. ${window.location.origin}`;
  }
  const body = lines.map(l => `• ${l.title} (Code ${l.sku}) × ${l.qty}\n  ${productDeepLink(l.sku)}`).join("\n");
  return `Hi Hettiarachchi Surgicals, I'd like a quote for:\n${body}\n\nSent from ${window.location.origin}`;
}

function openWhatsAppWithQuote(extraMessage) {
  const msg = extraMessage ? `${buildWhatsAppQuoteMessage()}\n\n${extraMessage}` : buildWhatsAppQuoteMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}

function buildAskWhatsAppMessage(product, qty = 1) {
  const msg = `Hi, I'd like info on ${product.title} (Code ${product.sku}). Qty: ${qty}.\n${productDeepLink(product.sku)}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ---------- Toast ----------

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => { toast.hidden = true; }, 200);
  }, 2400);
}

// ---------- Deep link to a product ----------

function focusProductFromUrl() {
  const params = new URLSearchParams(window.location.search);
  let sku = params.get("product");
  if (!sku && window.location.hash.startsWith("#product-")) {
    sku = window.location.hash.slice("#product-".length);
  }
  if (!sku) return;
  const product = products.find(p => p.sku.toLowerCase() === sku.toLowerCase());
  if (!product) return;

  // If the current filter hides this product, reset to "all" so it renders.
  const card = document.getElementById(`product-${product.sku}`);
  if (!card) {
    const allChip = document.querySelector('.toolbar__chips .chip[data-category="all"]');
    allChip?.click();
  }
  requestAnimationFrame(() => {
    const el = document.getElementById(`product-${product.sku}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("product-card--highlight");
    setTimeout(() => el.classList.remove("product-card--highlight"), 2600);
  });
}

// ---------- Announcement bar ----------

function initAnnouncementBar() {
  const bar = document.getElementById("announcement-bar");
  const close = document.getElementById("announcement-close");
  if (!bar) return;
  const KEY = "surgicals-announce-colombo-v1";
  if (localStorage.getItem(KEY) === "dismissed") return;
  bar.hidden = false;
  close?.addEventListener("click", () => {
    bar.hidden = true;
    try { localStorage.setItem(KEY, "dismissed"); } catch (_) { /* ignore */ }
  });
}

// ---------- Header / nav ----------

function initHeader() {
  const header = document.getElementById("site-header");
  const update = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 4);
  };
  window.addEventListener("scroll", update, { passive: true });
  update();

  // Mobile menu
  const toggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  toggle?.addEventListener("click", () => {
    const open = mobileNav.hasAttribute("hidden");
    if (open) mobileNav.removeAttribute("hidden"); else mobileNav.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", String(open));
  });
  mobileNav?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileNav.setAttribute("hidden", "");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });

  // Search panel
  const searchToggle = document.getElementById("search-toggle");
  const searchPanel = document.getElementById("search-panel");
  const searchClose = document.getElementById("search-close");
  const searchInput = document.getElementById("product-search");
  const openSearch = () => {
    searchPanel?.removeAttribute("hidden");
    searchToggle?.setAttribute("aria-expanded", "true");
    searchInput?.focus();
  };
  const closeSearch = () => {
    searchPanel?.setAttribute("hidden", "");
    searchToggle?.setAttribute("aria-expanded", "false");
  };
  searchToggle?.addEventListener("click", openSearch);
  searchClose?.addEventListener("click", closeSearch);
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape" && searchPanel && !searchPanel.hasAttribute("hidden")) closeSearch();
  });

  searchInput?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    const list = !q ? products : products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
    const grid = document.getElementById("products-gallery");
    const count = document.getElementById("results-count");
    if (!grid) return;
    grid.innerHTML = "";
    if (list.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px 16px;color:var(--ink-500);"><p>No products match "${e.target.value}". <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">Ask us on WhatsApp →</a></p></div>`;
      if (count) count.textContent = "0 products";
      return;
    }
    list.forEach(p => grid.insertAdjacentHTML("beforeend", renderCardHtml(p)));
    if (count) count.textContent = `${list.length} products`;
  });
}

function renderCardHtml(p) {
  return `<article class="product-card" id="product-${p.sku}">${renderCardInner(p)}</article>`;
}

// ---------- Filters ----------

function initFilters() {
  const chips = document.querySelectorAll(".toolbar__chips .chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => { c.classList.remove("chip--active"); c.setAttribute("aria-selected", "false"); });
      chip.classList.add("chip--active");
      chip.setAttribute("aria-selected", "true");
      renderProductGrid(chip.dataset.category);
    });
  });
}

// ---------- Product interactions ----------

function initProductGridInteractions() {
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add-sku]");
    const ask = e.target.closest("[data-ask-sku]");
    const share = e.target.closest("[data-share-sku]");

    if (share) {
      const sku = share.dataset.shareSku;
      const url = productDeepLink(sku);
      const copy = async () => {
        try {
          if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
          else {
            const ta = document.createElement("textarea");
            ta.value = url; ta.style.position = "fixed"; ta.style.opacity = "0";
            document.body.appendChild(ta); ta.select();
            document.execCommand("copy"); document.body.removeChild(ta);
          }
          showToast("Product link copied to clipboard");
        } catch (_) {
          window.prompt("Copy this product link:", url);
        }
      };
      copy();
      return;
    }

    if (add) {
      const p = products.find(p => p.sku === add.dataset.addSku);
      if (p) {
        QuoteStore.add(p, 1);
        showToast(`Added ${p.title} to your quote`);
        const badge = document.getElementById("quote-toggle");
        badge?.animate([{ transform: "scale(1)" }, { transform: "scale(1.12)" }, { transform: "scale(1)" }], { duration: 220 });
      }
    } else if (ask) {
      const p = products.find(p => p.sku === ask.dataset.askSku);
      if (p) window.open(buildAskWhatsAppMessage(p), "_blank", "noopener");
    }
  });
}

// ---------- Quote form ----------

function prefillQuoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;
  const textarea = form.querySelector("textarea[name='notes']");
  if (textarea && QuoteStore.lines.length > 0) {
    const summary = QuoteStore.lines.map(l => `- ${l.title} (Code ${l.sku}) × ${l.qty}`).join("\n");
    textarea.value = `From my quote cart:\n${summary}\n\nNotes: `;
  }
  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => textarea?.focus(), 400);
}

function initQuoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;

  const waBtn = document.getElementById("quote-whatsapp");
  waBtn?.addEventListener("click", () => {
    const data = Object.fromEntries(new FormData(form));
    const lead = [
      data.name && `Name: ${data.name}`,
      data.phone && `Phone: ${data.phone}`,
      data.persona && `Buyer: ${data.persona}`
    ].filter(Boolean).join("\n");
    const notes = (data.notes || "").trim();
    openWhatsAppWithQuote([lead, notes].filter(Boolean).join("\n\n"));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.phone || !data.notes) {
      showToast("Please fill your name, phone and what you need.");
      return;
    }
    // Static-site fallback: no backend — hand off to WhatsApp so the team actually gets the message.
    const lead = [`Name: ${data.name}`, `Phone: ${data.phone}`, `Buyer: ${data.persona}`].join("\n");
    openWhatsAppWithQuote([lead, data.notes].join("\n\n"));
    showToast("Opening WhatsApp to send your quote…");
  });

  // Hero "Request a quote" button — if the cart has items, prefill before scrolling
  document.getElementById("hero-request-quote")?.addEventListener("click", () => {
    if (QuoteStore.totalLines() > 0) prefillQuoteForm();
  });
}

// ---------- Init ----------

document.addEventListener("DOMContentLoaded", () => {
  QuoteStore.load();
  renderFeaturedGrid();
  renderProductGrid("all");
  renderLocationGallery();

  initAnnouncementBar();
  initHeader();
  initFilters();
  initProductGridInteractions();
  Drawer.init();
  initQuoteForm();

  QuoteStore.subscribe(renderQuoteDrawer);

  focusProductFromUrl();
});
