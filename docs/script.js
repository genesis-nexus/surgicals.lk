// surgicals.lk — static redesign interactivity
// Implements the quote-cart spine and WhatsApp-first CTAs from the design spec.

const WHATSAPP_NUMBER = "94718208654";  // Galle WhatsApp
const WHATSAPP_COLOMBO = "94789669666"; // Colombo WhatsApp

const PRODUCT_CATEGORIES = {
  "mobility-aids": "Mobility Aids",
  furniture: "Hospital Furniture",
  diagnostics: "Diagnostics",
  supports: "Supports & Braces",
  beds: "Beds & Mattresses",
  surgical: "Surgical",
  "home-care": "Home Care"
};

// Products surfaced first on the page — the most-requested items.
const FEATURED_SKUS = ["WC03", "CO03", "CN01", "DM01", "DM07", "DI02", "BD02", "DM02"];

// Search synonym tables. Tokens added to each product's haystack so visitors can find products
// by category, alternate names, brand names, or related terms — not just the literal title.
const CATEGORY_KEYWORDS = {
  "mobility-aids": ["mobility", "rehab", "rehabilitation"],
  furniture: ["hospital furniture", "ward furniture", "medical furniture"],
  diagnostics: ["diagnostic", "monitoring", "vitals"],
  supports: ["orthopaedic", "orthopedic", "brace", "splint", "support belt"],
  beds: ["mattress", "bedding"],
  surgical: ["surgical instrument", "ot instrument", "operation theatre"],
  "home-care": ["home care", "elder care", "personal care"]
};
const SKU_PREFIX_KEYWORDS = {
  WC: ["wheelchair", "wheel chair", "wc"],
  CO: ["commode", "toilet chair"],
  CN: ["cane", "stick", "walking stick", "walking aid"],
  CR: ["crutch", "crutches", "walking aid"],
  WF: ["walker", "rollator", "zimmer", "zimmer frame", "walking frame"],
  MG10: ["hospital bed", "patient bed", "icu bed", "ward bed", "manual bed"],
  MG20: ["examination table", "exam table", "examination couch", "exam couch", "treatment table"],
  MG40: ["trolley", "stretcher", "gurney", "transport trolley", "patient trolley"],
  DM: ["diagnostic", "monitor"],
  SU: ["orthopaedic support", "brace", "splint", "support"],
  BD: ["mattress", "ripple mattress", "anti-bedsore", "anti bedsore", "pressure relief", "decubitus"],
  DI: ["adult diaper", "diapers", "incontinence", "adult pants", "adult brief", "underwear"],
  SG: ["surgical", "ot instrument", "operation theatre"],
  HC: ["home care"]
};
// Specific extras for individual products
const SKU_KEYWORDS = {
  MG2010: ["gynaecological", "gynecological", "obgyn", "ob-gyn", "ob gyn", "labour bed", "labor bed", "delivery bed"],
  MG2011: ["tilt table", "trendelenburg"],
  MG2012: ["examination bed", "treatment couch"],
  MG2013A: ["examination bed with cabinet", "exam bed cabinet"],
  MG2014: ["gynaecological", "gynecological", "obgyn", "delivery bed"],
  MG2015: ["examination bed"],
  MG4010: ["transport trolley", "patient stretcher"],
  MG4011: ["transport trolley"],
  MG4012: ["transfer trolley", "removable top"],
  MG4013: ["stretcher trolley", "removable top"],
  MG4017: ["recovery trolley", "post-op trolley"],
  MG4019: ["recovery trolley", "post-op trolley"],
  MG1016: ["three function bed", "icu bed manual"],
  MG1017: ["five function bed", "hydraulic bed", "icu bed hydraulic"],
  MG1022: ["electric bed", "motorised bed", "motorized bed", "powered bed"],
  DM01: ["bp", "bp monitor", "blood pressure", "sphygmomanometer", "norditalia"],
  DM02: ["thermometer", "infrared", "non-contact", "non contact", "fever", "berrcom"],
  DM03: ["stethoscope", "littmann", "3m", "classic iii"],
  DM04: ["glucose meter", "glucometer", "diabetes", "blood sugar", "freestyle", "optium", "accu-chek", "accu chek", "vivachek", "ino", "ketone"],
  DM07: ["oximeter", "spo2", "oxygen saturation", "fingertip pulse oximeter", "x1805"],
  SU01: ["clavicle brace", "shoulder support", "shoulder brace", "dyna"],
  SU02: ["arm sling", "shoulder sling", "dyna"],
  SU03: ["cervical collar", "neck brace", "neck collar", "soft collar", "dyna"],
  SU04: ["lumbar support", "back brace", "back support", "lumbar belt", "i-m"],
  BD01: ["bubble mattress", "anti-decubitus", "ripple mattress"],
  BD02: ["air mattress", "air pressure mattress", "medtech", "ab-03"],
  HC01: ["suction unit", "phlegm suction", "respiratory", "9e-a"],
  HC02: ["facial steamer", "benice", "bns-016"],
  HC03: ["diabetic shoes", "diabetic footwear", "beta", "diabetic sandals"],
  HC04: ["resistance bands", "rehabilitation bands", "texstretch", "physio bands", "exercise bands"],
  SG01: ["orthopaedic implant", "bone plates", "bone screws", "k wire", "cerclage"],
  SG02: ["hemorrhoidal stapler", "hemorrhoid stapler", "haemorrhoidal", "panther"],
  SG03: ["linear cutter stapler", "surgical stapler", "panther"],
  SG04: ["stapler reload", "linear cutter reload", "panther"]
};

// Furniture spec sheets — derived from the MG product line photos.
const FURNITURE_SPECS = {
  MG1010: { material: "Epoxy Powder Coated Steel", dimensions: "L 2100 × W 970 × H 540 mm", features: ["Two-section back & knee adjustment", "Collapsible side rails", "Optional baggage rack"] },
  MG1011: { material: "Epoxy Powder Coated Steel", dimensions: "L 2100 × W 970 × H 540 mm", features: ["Head section adjustment", "Collapsible side rails"] },
  MG1012: { material: "Epoxy Powder Coated Steel", dimensions: "L 2100 × W 970 × H 540 mm", features: ["Head section adjustment", "Collapsible side rails", "Designed for home use"] },
  MG1013: { material: "Epoxy Powder Coated Steel", dimensions: "L 2100 × W 970 × H 540 mm", features: ["Two-section back & knee adjustment", "Collapsible side rails", "Designed for home use"] },
  MG1014: { material: "Stainless Steel", dimensions: "L 1850 × W 810 × H 630 mm", features: ["Stainless steel frame", "Head section adjustment"] },
  MG1015: { material: "Epoxy Powder Coated Steel", dimensions: "L 1850 × W 810 × H 630 mm", features: ["Flat patient surface", "Steel frame with head/foot panels"] },
  MG1016: { material: "Epoxy Powder Coated Steel", dimensions: "L 2130 × W 910 × H 430–700 mm", features: ["Three-section adjustment", "Manual crank operation", "Height adjustable", "Collapsible side rails"] },
  MG1017: { material: "Epoxy Powder Coated Steel", dimensions: "L 2010 × W 910 × H 430–700 mm", features: ["Five-function adjustment (Trendelenburg + back/knee/feet)", "Hydraulic lift", "Collapsible side rails", "IV pole included"] },
  MG1018: { material: "Epoxy Powder Coated Steel", dimensions: "L 1950 × W 970 × H 460 mm", features: ["Two-section back & knee adjustment", "Wood-style head/foot panels", "Collapsible stainless steel side rails"] },
  MG1019: { material: "Epoxy Powder Coated Steel", dimensions: "L 1950 × W 970 × H 460 mm", features: ["Head section adjustment", "Wood-style head/foot panels", "Collapsible stainless steel side rails"] },
  MG1020: { material: "Epoxy Powder Coated Steel", dimensions: "L 2010 × W 910 × H 430–700 mm", features: ["Three-section adjustment", "Wood-style head/foot panels", "Collapsible stainless steel side rails", "Height adjustable"] },
  MG1021: { material: "Epoxy Powder Coated Steel", dimensions: "L 2010 × W 910 × H 430–700 mm", features: ["Five-function adjustment", "Wood-style panels", "Collapsible stainless steel side rails", "IV pole included"] },
  MG1022: { material: "Epoxy Powder Coated Steel", dimensions: "L 2010 × W 910 × H 430–700 mm", features: ["Three-function electric adjustment", "Powered backrest & knee", "Mattress included", "Side rails"] },

  MG2010:   { material: "Epoxy Powder Coated Steel", dimensions: "L 1900 × W 620 × H 790 mm", features: ["Reclining backrest", "Adjustable leg supports", "Examination stirrups"] },
  MG2011:   { material: "Epoxy Powder Coated Steel", dimensions: "L 1950 × W 610 × H 950 mm", features: ["Tilt operation (Trendelenburg)", "Single-column base", "Padded surface"] },
  MG2012:   { material: "Epoxy Powder Coated Steel", dimensions: "L 1850 × W 560 × H 780 mm", features: ["Reclining backrest", "Padded examination surface", "Open frame"] },
  MG2013A:  { material: "Epoxy Powder Coated Steel", dimensions: "L 1890 × W 560 × H 840 mm", features: ["Reclining backrest", "Built-in storage cabinets", "Step stool included"] },
  MG2014:   { material: "Stainless Steel", dimensions: "L 1900 × W 620 × H 790 mm", features: ["Stainless steel frame", "Reclining backrest", "Adjustable leg supports", "Examination stirrups"] },
  MG2015:   { material: "Stainless Steel", dimensions: "L 1850 × W 560 × H 780 mm", features: ["Stainless steel frame", "Reclining backrest", "Padded surface"] },

  MG4010: { material: "Stainless Steel", dimensions: "L 1900 × W 660 × H 500–800 mm", features: ["Stainless steel frame", "Adjustable backrest", "Side rails", "Heavy-duty castors", "Height adjustable"] },
  MG4011: { material: "Epoxy Powder Coated Steel", dimensions: "L 1900 × W 660 × H 500–800 mm", features: ["Adjustable backrest", "Side rails", "Heavy-duty castors", "Height adjustable", "IV pole"] },
  MG4012: { material: "Stainless Steel", dimensions: "L 1980 × W 560 × H 790 mm", features: ["Stainless steel frame", "Padded surface", "Removable top for easy patient transfer", "IV pole"] },
  MG4013: { material: "Stainless Steel", dimensions: "L 1980 × W 560 × H 790 mm", features: ["Stainless steel frame", "Removable top for easy transfer", "Heavy-duty castors", "IV pole"] },
  MG4014: { material: "Stainless Steel", dimensions: "L 1980 × W 560 × H 790 mm", features: ["Stainless steel frame", "Stainless top surface", "Side rails", "Heavy-duty castors"] },
  MG4015: { material: "Stainless Steel", dimensions: "L 1980 × W 560 × H 790 mm", features: ["Stainless steel frame", "Open lower shelf", "Heavy-duty castors"] },
  MG4016: { material: "Epoxy Powder Coated Steel", dimensions: "L 1980 × W 560 × H 790 mm", features: ["Removable aluminium top for easy transfer", "Side rails", "Heavy-duty castors"] },
  MG4017: { material: "Epoxy Powder Coated Steel", dimensions: "L 1870 × W 600 × H 550–780 mm", features: ["Height adjustable", "Adjustable backrest", "Heavy-duty castors", "IV pole"] },
  MG4019: { material: "Stainless Steel", dimensions: "L 1870 × W 600 × H 550–780 mm", features: ["Stainless steel frame", "Hydraulic height adjustment", "Adjustable backrest", "Side rails"] },
  MG4021: { material: "Stainless Steel", dimensions: "L 1980 × W 560 × H 790 mm", features: ["Stainless steel frame", "Open frame design", "Removable top", "Heavy-duty castors"] }
};

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
  { sku: "HC04", title: "TexStretch Rehabilitation Bands & Accessories", category: "home-care", folder: "products", bases: ["IMG_2854 2"] },

  // ---- Hospital Furniture (MG range — beds, exam tables, trolleys) ----
  { sku: "MG1010", title: "Two Function Bed", category: "furniture", folder: "furniture", bases: ["mg-1010"] },
  { sku: "MG1011", title: "Head Adjustable Bed", category: "furniture", folder: "furniture", bases: ["mg-1011"] },
  { sku: "MG1012", title: "Head Adjustable Bed — Home Use", category: "furniture", folder: "furniture", bases: ["mg-1012"] },
  { sku: "MG1013", title: "Two Function Bed — Home Use", category: "furniture", folder: "furniture", bases: ["mg-1013"] },
  { sku: "MG1014", title: "Head Adjustable Bed (Stainless Steel)", category: "furniture", folder: "furniture", bases: ["mg-1014"] },
  { sku: "MG1015", title: "Patient Bed — Basic", category: "furniture", folder: "furniture", bases: ["mg-1015"] },
  { sku: "MG1016", title: "Three Function Bed — Manual", category: "furniture", folder: "furniture", bases: ["mg-1016"] },
  { sku: "MG1017", title: "Five Function Bed — Hydraulic", category: "furniture", folder: "furniture", bases: ["mg-1017"] },
  { sku: "MG1018", title: "Two Function Bed — Classic", category: "furniture", folder: "furniture", bases: ["mg-1018"] },
  { sku: "MG1019", title: "Head Adjustable Bed — Classic", category: "furniture", folder: "furniture", bases: ["mg-1019"] },
  { sku: "MG1020", title: "Three Function Bed — Classic", category: "furniture", folder: "furniture", bases: ["mg-1020"] },
  { sku: "MG1021", title: "Five Function Bed — Classic", category: "furniture", folder: "furniture", bases: ["mg-1021"] },
  { sku: "MG1022", title: "Three Function Bed — Electric", category: "furniture", folder: "furniture", bases: ["mg-1022"] },

  { sku: "MG2010", title: "Gynecological Bed", category: "furniture", folder: "furniture", bases: ["mg-2010"] },
  { sku: "MG2011", title: "Tilt Bed", category: "furniture", folder: "furniture", bases: ["mg-2011"] },
  { sku: "MG2012", title: "Examination Bed", category: "furniture", folder: "furniture", bases: ["mg-2012"] },
  { sku: "MG2013A", title: "Examination Bed with Cabinet", category: "furniture", folder: "furniture", bases: ["mg-2013-a"] },
  { sku: "MG2014", title: "Gynecological Bed (Stainless Steel)", category: "furniture", folder: "furniture", bases: ["mg-2014"] },
  { sku: "MG2015", title: "Examination Bed (Stainless Steel)", category: "furniture", folder: "furniture", bases: ["mg-2015"] },

  { sku: "MG4010", title: "Patient Transport Trolley (Stainless Steel)", category: "furniture", folder: "furniture", bases: ["mg-4010"] },
  { sku: "MG4011", title: "Patient Transport Trolley (Epoxy Steel)", category: "furniture", folder: "furniture", bases: ["mg-4011"] },
  { sku: "MG4012", title: "Patient Transfer Trolley (Stainless Steel)", category: "furniture", folder: "furniture", bases: ["mg-4012"] },
  { sku: "MG4013", title: "Stretcher Trolley", category: "furniture", folder: "furniture", bases: ["mg-4013"] },
  { sku: "MG4014", title: "Patient Trolley (Stainless Steel)", category: "furniture", folder: "furniture", bases: ["mg-4014"] },
  { sku: "MG4015", title: "Patient Trolley — Open Frame", category: "furniture", folder: "furniture", bases: ["mg-4015"] },
  { sku: "MG4016", title: "Patient Trolley (Epoxy Steel)", category: "furniture", folder: "furniture", bases: ["mg-4016"] },
  { sku: "MG4017", title: "Recovery Trolley (Epoxy Steel)", category: "furniture", folder: "furniture", bases: ["mg-4017"] },
  { sku: "MG4019", title: "Recovery Trolley (Stainless Steel)", category: "furniture", folder: "furniture", bases: ["mg-4019"] },
  { sku: "MG4021", title: "Patient Transfer Trolley — Open Frame", category: "furniture", folder: "furniture", bases: ["mg-4021"] }
].map(p => {
  // Folder routing: each folder has its own optimized/ subdir + fallback extension.
  const FOLDER_CONFIG = {
    "new-cat":   { dir: "images/new-cat/optimized",   ext: "png" }, // transparent product cutouts
    products:    { dir: "images/products/optimized",  ext: "jpg" }, // opaque product photos
    furniture:   { dir: "images/furniture/optimized", ext: "png" }  // spec-sheet style w/ transparent border
  };
  const cfg = FOLDER_CONFIG[p.folder] || FOLDER_CONFIG.products;
  const categoryLabel = PRODUCT_CATEGORIES[p.category] || p.category;
  const images = p.bases.map((base, i) => ({
    src: `${cfg.dir}/${base}.${cfg.ext}`,
    webp: `${cfg.dir}/${base}.webp`,
    alt: `${p.title}${p.bases.length > 1 ? ` (view ${i + 1})` : ""} — ${categoryLabel} from Hettiarachchi Surgicals, Sri Lanka`
  }));
  const specs = FURNITURE_SPECS[p.sku] || {};
  const prefixKws = Object.entries(SKU_PREFIX_KEYWORDS)
    .filter(([prefix]) => p.sku.startsWith(prefix))
    .flatMap(([, kws]) => kws);
  const haystack = [
    p.title, p.sku, p.category, PRODUCT_CATEGORIES[p.category],
    specs.material, specs.dimensions,
    ...(specs.features || []),
    ...(CATEGORY_KEYWORDS[p.category] || []),
    ...prefixKws,
    ...(SKU_KEYWORDS[p.sku] || [])
  ].filter(Boolean).join(" ").toLowerCase();
  return {
    id: p.sku,
    sku: p.sku,
    title: p.title,
    category: p.category,
    summary: PRODUCT_CATEGORIES[p.category] || p.category,
    images,
    image: images[0],
    material: specs.material || null,
    dimensions: specs.dimensions || null,
    features: specs.features || null,
    _haystack: haystack
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
      ${p.material ? `<span class="product-card__material">${p.material}</span>` : ""}
      ${p.dimensions ? `<span class="product-card__dim">${p.dimensions}</span>` : ""}
      ${p.features?.length ? `<ul class="product-card__features">${p.features.slice(0, 3).map(f => `<li>${f}</li>`).join("")}</ul>` : ""}
      <span class="product-card__status"><span class="dot"></span>Available to quote</span>
    </div>
    <div class="product-card__actions">
      <button type="button" class="btn btn--primary btn--sm" data-add-sku="${p.sku}"><span class="btn-label">Add to quote</span><span class="btn-label--short">Add</span></button>
      <button type="button" class="btn btn--ghost btn--sm" data-ask-sku="${p.sku}" aria-label="Ask on WhatsApp about ${p.title}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 0 1 2.166 11.89c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
        <span class="btn-label">Ask</span>
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

function openWhatsAppWithQuote(extraMessage, number = WHATSAPP_NUMBER) {
  const msg = extraMessage ? `${buildWhatsAppQuoteMessage()}\n\n${extraMessage}` : buildWhatsAppQuoteMessage();
  const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}

function buildAskWhatsAppMessage(product, qty = 1) {
  const lines = [`Hi, I'd like info on ${product.title} (Code ${product.sku}). Qty: ${qty}.`];
  if (product.dimensions) lines.push(`Dimensions: ${product.dimensions}`);
  if (product.material) lines.push(`Material: ${product.material}`);
  lines.push(productDeepLink(product.sku));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
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
    const raw = e.target.value;
    const q = raw.toLowerCase().trim();

    // Empty query: restore whatever chip filter the user had active
    if (!q) {
      const activeChip = document.querySelector(".toolbar__chips .chip--active");
      renderProductGrid(activeChip?.dataset.category || "all");
      return;
    }

    // Tokenize: every whitespace-separated word must appear in the product haystack.
    const tokens = q.split(/\s+/).filter(Boolean);
    const list = products.filter(p => tokens.every(t => p._haystack.includes(t)));

    const grid = document.getElementById("products-gallery");
    const count = document.getElementById("results-count");
    if (!grid) return;
    grid.innerHTML = "";
    if (list.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px 16px;color:var(--ink-500);"><p>No products match "${raw}". <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">Ask us on WhatsApp →</a></p></div>`;
      if (count) count.textContent = "0 products";
      return;
    }
    list.forEach(p => grid.insertAdjacentHTML("beforeend", renderCardHtml(p)));
    if (count) count.textContent = `${list.length} matching`;
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

  const buildLeadMsg = () => {
    const data = Object.fromEntries(new FormData(form));
    const lead = [
      data.name && `Name: ${data.name}`,
      data.phone && `Phone: ${data.phone}`,
      data.persona && `Buyer: ${data.persona}`
    ].filter(Boolean).join("\n");
    const notes = (data.notes || "").trim();
    return [lead, notes].filter(Boolean).join("\n\n");
  };

  document.getElementById("quote-whatsapp-galle")?.addEventListener("click", () => {
    openWhatsAppWithQuote(buildLeadMsg(), WHATSAPP_NUMBER);
  });
  document.getElementById("quote-whatsapp-colombo")?.addEventListener("click", () => {
    openWhatsAppWithQuote(buildLeadMsg(), WHATSAPP_COLOMBO);
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
  applySearchFromUrl();
  injectProductStructuredData();
});

// ---------- SEO: structured data + URL-driven search ----------

function injectProductStructuredData() {
  const origin = window.location.origin && window.location.origin.startsWith("http")
    ? window.location.origin
    : "https://surgicals.lk";

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hettiarachchi Surgicals — Product Catalog",
    "numberOfItems": products.length,
    "itemListElement": products.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${origin}/?product=${p.sku}`,
      "name": p.title
    }))
  };

  const productSchemas = products.map(p => {
    const description = [p.material, p.dimensions, ...(p.features || [])].filter(Boolean).join(" · ") || `${p.title} — available from Hettiarachchi Surgicals.`;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.title,
      "sku": p.sku,
      "image": `${origin}/${p.image.src}`,
      "description": description,
      "brand": { "@type": "Brand", "name": "Hettiarachchi Surgicals" },
      "category": p.summary,
      "url": `${origin}/?product=${p.sku}`,
      "offers": {
        "@type": "Offer",
        "url": `${origin}/?product=${p.sku}`,
        "availability": "https://schema.org/InStock",
        "priceCurrency": "LKR",
        "seller": { "@id": `${origin}/#business` }
      }
    };
  });

  const inject = obj => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  };

  inject(itemList);
  productSchemas.forEach(inject);
}

// If a visitor lands on /?q=foo (e.g. from Google's SearchAction), pre-fill the search box.
function applySearchFromUrl() {
  const q = new URLSearchParams(window.location.search).get("q");
  if (!q) return;
  const input = document.getElementById("product-search");
  if (!input) return;
  input.value = q;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  // Also open the search panel and scroll to results
  document.getElementById("search-panel")?.removeAttribute("hidden");
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
