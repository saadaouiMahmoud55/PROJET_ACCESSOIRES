import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AccessoryService } from './services/accessory.service';
import { BrandService } from './services/brand.service';
import { CategoryService } from './services/category.service';
import { Accessory, Brand, Category } from './models';
import { ALL_IMAGES } from './image-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  accessories: Accessory[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];

  searchQuery = '';
  selectedCategoryId: number | null | undefined = null;
  selectedBrandId: number | null | undefined = null;
  selectedType = '';
  selectedStorage: string[] = [];
  selectedColors: string[] = [];
  selectedNav = 'Accueil';
  sortOption: 'popular' | 'priceAsc' | 'priceDesc' = 'popular';
  inStockOnly = false;

  cartItems: Accessory[] = [];
  error = '';
  showCartSummary = false;
  paymentMethod: 'online' | 'cash' = 'online';
  orderConfirmed = false;
  successMessage = '';

  sampleProducts: Accessory[] = [
    {
      id: 101,
      name: 'IPhone 15 Pro Max Caché',
      price: 4550,
      stock: 8,
      type: 'Smartphone',
      storage: '512 Go',
      color: 'Noir',
      brand: { id: 1, name: 'Apple' },
      category: { id: 1, name: 'Smartphone' },
      image: 'iphone/Apple-iPhone-15-Pro-Max-6-7-5G-Double-SI_SWSGk27.webp',
      images: [
        'iphone/Apple-iPhone-15-Pro-Max-6-7-5G-Double-SI_SWSGk27.webp',
        'iphone/Apple-iPhone-16-Plus-6-7-5G-128-Go-Double-SIM-Sarcelle.webp'
      ]
    },
    {
      id: 102,
      name: 'AirTag (2e génération)',
      price: 199,
      stock: 18,
      type: 'Accessoire',
      storage: '64 Go',
      color: 'Blanc Titane',
      brand: { id: 1, name: 'Apple' },
      category: { id: 4, name: 'Traqueurs' },
      image: 'iphone/Apple-iPhone-Air-6-5-5G-e-SIM-256-Go-Noir-sideral.webp',
      images: [
        'iphone/Apple-iPhone-Air-6-5-5G-e-SIM-256-Go-Noir-sideral.webp',
        'iphone/Apple-iPhone-14-Pro-6-1-5G-Double-SIM-128-Go-Noir-sideral.webp'
      ]
    },
    {
      id: 103,
      name: 'Étui Smartphone',
      price: 79,
      stock: 22,
      type: 'Accessoire',
      storage: '128 Go',
      color: 'Vert Menthe',
      brand: { id: 2, name: 'Generic' },
      category: { id: 2, name: 'Coques & Protections' },
      image: 'cache telephone/iphone-17-pro-circle-grip-shield-mag-phone-case-1000x1000_2.webp',
      images: [
        'cache telephone/iphone-17-pro-circle-grip-shield-mag-phone-case-1000x1000_2.webp',
        'cache telephone/Ha8e3918821d747efa68f9e01caf97f92s.avif'
      ]
    },
    {
      id: 111,
      name: 'Coque MagSafe Élégante',
      price: 149,
      stock: 18,
      type: 'Accessoire',
      color: 'Orange',
      brand: { id: 2, name: 'Generic' },
      category: { id: 2, name: 'Coques & Protections' },
      image: 'cache telephone/4_1kospGk.webp',
      images: [
        'cache telephone/4_1kospGk.webp'
      ]
    },
    {
      id: 112,
      name: 'Coque Grip Magnétique',
      price: 119,
      stock: 23,
      type: 'Accessoire',
      color: 'Noir',
      brand: { id: 2, name: 'Generic' },
      category: { id: 2, name: 'Coques & Protections' },
      image: 'cache telephone/2_nI9lWYT.webp',
      images: [
        'cache telephone/2_nI9lWYT.webp'
      ]
    },
    {
      id: 113,
      name: 'Étui Cuir Premium',
      price: 189,
      stock: 10,
      type: 'Accessoire',
      color: 'Marron',
      brand: { id: 2, name: 'Generic' },
      category: { id: 2, name: 'Coques & Protections' },
      image: 'cache telephone/leather_280f12ed-1ebd-4568-9c9b-4bcf923854e3.webp',
      images: [
        'cache telephone/leather_280f12ed-1ebd-4568-9c9b-4bcf923854e3.webp'
      ]
    },
    {
      id: 104,
      name: 'Tablette Android 11"',
      price: 2399,
      stock: 5,
      type: 'Tablette',
      storage: '256 Go',
      color: 'Ice Bleu',
      brand: { id: 3, name: 'Samsung' },
      category: { id: 3, name: 'Tablette' },
      image: 'iPade/Apple-iPad-11-A16-128-Go-Bleu-Wifi-2025.webp',
      images: [
        'iPade/Apple-iPad-11-A16-128-Go-Bleu-Wifi-2025.webp',
        'iPade/Apple-iPad-11-A16-128-Go-Bleu-Wifi-2025 (1).webp'
      ]
    },
    {
      id: 105,
      name: 'Montre Connectée Galaxy Watch5 44mm',
      price: 1299,
      stock: 12,
      type: 'SmartWatch',
      storage: '16 Go',
      color: 'Noir',
      brand: { id: 3, name: 'Samsung' },
      category: { id: 5, name: 'SmartWatch' },
      image: 'watch/montre-connecte-samsung-galaxy-watch5-bt-44mm-saphir_2.webp',
      images: [
        'watch/montre-connecte-samsung-galaxy-watch5-bt-44mm-saphir_2.webp',
        'watch/05-_2.webp'
      ]
    },
    {
      id: 106,
      name: 'Montre Sport GPS Résistante',
      price: 799,
      stock: 8,
      type: 'SmartWatch',
      storage: '8 Go',
      color: 'Bleu',
      brand: { id: 4, name: 'SportX' },
      category: { id: 5, name: 'SmartWatch' },
      image: 'watch/05-_2.webp',
      images: [
        'watch/05-_2.webp',
        'watch/WhatsApp_Image_2026-04-17_at_142150.webp'
      ]
    },
    {
      id: 107,
      name: 'Montre Intelligente Élégante',
      price: 1099,
      stock: 6,
      type: 'SmartWatch',
      storage: '16 Go',
      color: 'Gris',
      brand: { id: 5, name: 'UrbanTech' },
      category: { id: 5, name: 'SmartWatch' },
      image: 'watch/99_jeIWFHy.webp',
      images: [
        'watch/99_jeIWFHy.webp',
        'watch/Capture_dcran_2026-05-05_153345.webp'
      ]
    },
    {
      id: 108,
      name: 'Enceinte Bluetooth Portable Z5 Mini',
      price: 349,
      stock: 14,
      type: 'Audio',
      storage: '8 Go',
      color: 'Bleu',
      brand: { id: 6, name: 'SoundWave' },
      category: { id: 6, name: 'Audio' },
      image: 'audio/Z5-Mini-Haut-parleur-Bluetooth-Sans-Fil-2.webp',
      images: [
        'audio/Z5-Mini-Haut-parleur-Bluetooth-Sans-Fil-2.webp',
        'audio/produit-58.webp'
      ]
    },
    {
      id: 109,
      name: 'Enceinte Nomade NDR-1098',
      price: 799,
      stock: 10,
      type: 'Audio',
      storage: '16 Go',
      color: 'Noir',
      brand: { id: 7, name: 'Golons' },
      category: { id: 6, name: 'Audio' },
      image: 'audio/haut-parleurs-sans-fil-portable-ndr-1098_1.webp',
      images: [
        'audio/haut-parleurs-sans-fil-portable-ndr-1098_1.webp',
        'audio/41JeDPQnapL_AC_.webp'
      ]
    },
    {
      id: 110,
      name: 'Radio Portable RX-5170',
      price: 289,
      stock: 5,
      type: 'Audio',
      storage: '4 Go',
      color: 'Gris',
      brand: { id: 8, name: 'RetroSound' },
      category: { id: 6, name: 'Audio' },
      image: 'audio/41JeDPQnapL_AC_.webp',
      images: [
        'audio/41JeDPQnapL_AC_.webp',
        'audio/Z5-Mini-Haut-parleur-Bluetooth-Sans-Fil-2.webp'
      ]
    }
  ];

  // All images available in the assets/image folder (generated list)
  allImages: string[] = ALL_IMAGES;

  /**
   * Retourne la liste complète de produits comprenant les produits existants
   * plus les produits virtuels générés à partir des images présentes.
   */
  getAllProductsFromImages(): Accessory[] {
    const fromImages = this.allImages.map(img => this.getProductForImage(img.replace(/^\/?image\//, '')));
    // Merge unique by image path (relative)
    const map = new Map<string, Accessory>();
    // existing accessories (from backend or samples)
    [...this.accessories, ...this.sampleProducts].forEach(p => {
      const key = (p.image || '').toLowerCase();
      if (key) map.set(key, p);
    });
    // images-generated products (if not already present)
    fromImages.forEach(p => {
      const key = (p.image || '').toLowerCase();
      if (!map.has(key)) map.set(key, p);
    });
    return Array.from(map.values());
  }

  constructor(
    private accessoryService: AccessoryService,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadAccessories();
    this.loadBrands();
    this.loadCategories();
  }

  loadAccessories(): void {
    this.accessoryService.getAccessories().subscribe({
      next: (accessories: Accessory[]) => {
        this.accessories = accessories;
        this.error = '';
      },
      error: () => {
        this.error = 'Impossible de charger les produits. Affichage d’une sélection locale.';
        this.accessories = this.sampleProducts;
      }
    });
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (brands: Brand[]) => {
        this.brands = brands;
      },
      error: () => {
        this.error = 'Impossible de charger les marques. Utilisation d’une sélection locale.';
        // Fallback: derive brands from local sampleProducts so dropdown still shows options
        const fromSamples = this.sampleProducts
          .map(p => p.brand)
          .filter((b): b is Brand => !!b);
        const unique = Array.from(new Map(fromSamples.map(b => [b.id, b])).values());
        this.brands = unique;
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: () => {
        this.error = 'Impossible de charger les catégories.';
      }
    });
  }

  get allProducts(): Accessory[] {
    return this.getAllProductsFromImages();
  }

  get types(): string[] {
    const allTypes = this.allProducts.map(product => product.type || 'Autre');
    return Array.from(new Set(allTypes)).sort();
  }

  get storageOptions(): string[] {
    const allStorages = this.allProducts.map(product => product.storage || 'Autre');
    return Array.from(new Set(allStorages)).sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }));
  }

  get colorOptions(): string[] {
    const allColors = this.allProducts.map(product => product.color || 'Autre');
    return Array.from(new Set(allColors)).sort((a, b) => a.localeCompare(b, 'fr'));
  }

  get cartCount(): number {
    return this.cartItems.length;
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price || 0), 0);
  }

  get cartSummary(): Array<{ accessory: Accessory; quantity: number }> {
    const summary = new Map<number, { accessory: Accessory; quantity: number }>();
    this.cartItems.forEach(item => {
      if (!item.id) {
        return;
      }
      const existing = summary.get(item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        summary.set(item.id, { accessory: item, quantity: 1 });
      }
    });
    return Array.from(summary.values());
  }

  get filteredAccessories(): Accessory[] {
    const sourceProducts = this.getAllProductsFromImages();
    return this.applyFilters(sourceProducts);
  }

  getSelectedCategoryName(): string | undefined {
    const selected = this.categories.find(category => category.id === this.selectedCategoryId);
    if (selected) {
      return selected.name;
    }
    const sampleCategory = this.sampleProducts
      .map(product => product.category)
      .find(category => category?.id === this.selectedCategoryId);
    return sampleCategory?.name;
  }

  applyFilters(products: Accessory[]): Accessory[] {
    let list = [...products];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      list = list.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.brand?.name.toLowerCase().includes(query) ||
        item.category?.name.toLowerCase().includes(query)
      );
    }
    if (this.selectedCategoryId) {
      const selectedCategoryName = this.getSelectedCategoryName();
      list = list.filter(item =>
        item.category?.id === this.selectedCategoryId ||
        (selectedCategoryName ? item.category?.name === selectedCategoryName : false)
      );
    }
    if (this.selectedBrandId) {
      list = list.filter(item => item.brand?.id === this.selectedBrandId);
    }
    if (this.selectedType) {
      list = list.filter(item => item.type === this.selectedType);
    }
    if (this.selectedStorage.length) {
      list = list.filter(item => this.selectedStorage.includes(item.storage || ''));
    }
    if (this.selectedColors.length) {
      list = list.filter(item => this.selectedColors.includes(item.color || ''));
    }
    if (this.inStockOnly) {
      list = list.filter(item => item.stock > 0);
    }
    if (this.selectedNav && this.selectedNav !== 'Accueil' && this.selectedNav !== 'Promotions') {
      // Additional nav filtering when a specific category/tab is active
      const typeMap: Record<string, string> = {
        Smartphone: 'Smartphone',
        Tablettes: 'Tablette',
        SmartWatch: 'SmartWatch',
        Audio: 'Audio',
        Gamer: 'Gamer',
        Accessoires: 'Accessoire'
      };
      const navType = typeMap[this.selectedNav];
      if (navType) {
        list = list.filter(item => item.type === navType || item.category?.name === this.selectedNav);
      }
    }

    if (this.sortOption === 'priceAsc') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'priceDesc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }

  /** Nombre total de produits (existants + images générées) */
  get totalProductsCount(): number {
    return this.getAllProductsFromImages().length;
  }

  private normalizeImagePath(imagePath: string): string {
    let relative = imagePath;
    if (relative.startsWith('/')) {
      relative = relative.slice(1);
    }
    if (relative.startsWith('image/')) {
      relative = relative.slice(6);
    }

    try {
      relative = decodeURIComponent(relative);
    } catch {
      // ignore invalid encoded sequences and keep original text
    }

    return `/image/${relative
      .split('/')
      .map(segment => encodeURIComponent(segment))
      .join('/')}`;
  }

  getProductImages(accessory: Accessory): string[] {
    const imagePaths = accessory.images?.length ? accessory.images : accessory.image ? [accessory.image] : [];
    return imagePaths.map(path => this.normalizeImagePath(path));
  }

  getImageUrl(accessory: Accessory): string {
    const urls = this.getProductImages(accessory);
    if (urls.length > 0) {
      return urls[0];
    }

    const label = encodeURIComponent(accessory.name.replace(/\s+/g, '+'));
    return `https://placehold.co/420x420/ffffff/0f172a?font=mulish&text=${label}`;
  }

  getSecondaryImageUrl(accessory: Accessory): string | undefined {
    const urls = this.getProductImages(accessory);
    return urls.length > 1 ? urls[1] : undefined;
  }

  setImageFallback(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (!target || target.dataset['fallbackApplied'] === 'true') {
      return;
    }
    target.dataset['fallbackApplied'] = 'true';
    target.src = this.getPlaceholderUrl(target.alt || 'Produit');
  }

  getPlaceholderUrl(label: string = 'Produit'): string {
    const encodedLabel = encodeURIComponent(label.trim().replace(/\s+/g, '+'));
    return `https://placehold.co/420x420/ffffff/0f172a?font=mulish&text=${encodedLabel}`;
  }

  /**
   * Retourne le produit correspondant à un chemin d'image s'il existe
   */
  findProductByImage(imageUrl: string): Accessory | undefined {
    const rel = imageUrl.replace(/^\/?image\//, '').replace(/^\//, '');
    // Cherche dans les accessoires chargés puis dans les samples
    const list = [...this.accessories, ...this.sampleProducts];
    return list.find(p => (p.image || '').toLowerCase() === rel.toLowerCase());
  }

  /**
   * Convertit un chemin d'image en un nom lisible (ex: 'iphone/Apple-iPhone-15-Pro.webp' -> 'Apple iPhone 15 Pro')
   */
  formatNameFromImage(imageUrl: string): string {
    try {
      const path = imageUrl.replace(/^\/?image\//, '');
      const parts = path.split('/');
      const folder = parts.length > 1 ? parts[parts.length - 2] : '';
      const file = parts[parts.length - 1];
      const withoutExt = file.replace(/\.[^.]+$/, '');
      const decoded = decodeURIComponent(withoutExt);

      let cleaned = decoded
        .replace(/\(.*?\)/g, '')
        .replace(/[_\-]+/g, ' ')
        .replace(/\b(?:image|photo|img|resized|edited|copy)\b/gi, '')
        .replace(/\b[a-f0-9]{8,}\b/gi, '')
        .replace(/\b\d{2,}\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      cleaned = cleaned
        .split(' ')
        .filter(word => !!word)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      if (!cleaned || cleaned.length < 3 || !/[aeiouyAEIOUY]/.test(cleaned) || /^[0-9]+$/.test(cleaned)) {
        return this.getDefaultNameForImageFolder(folder);
      }

      return cleaned;
    } catch {
      return this.getDefaultNameForImageFolder('');
    }
  }

  getDefaultNameForImageFolder(folder: string): string {
    const folderNameMap: Record<string, string> = {
      iphone: 'Smartphone Apple',
      samsung: 'Smartphone Samsung',
      watch: 'Montre connectée',
      audio: 'Enceinte Bluetooth',
      game: 'Accessoire gaming',
      'cache telephone': 'Étui de téléphone',
      iPade: 'Tablette',
      'cache%20telephone': 'Étui de téléphone'
    };

    return folderNameMap[folder] || 'Produit Galerie';
  }

  /**
   * Crée ou retourne un produit pour une image (produit existant ou virtuel avec prix par défaut)
   */
  getProductForImage(imageUrl: string): Accessory {
    const existing = this.findProductByImage(imageUrl);
    if (existing) return existing;

    // Créer un produit virtuel pour cette image
    const name = this.formatNameFromImage(imageUrl);
    const path = imageUrl.replace(/^\/?image\//, '');
    const folder = path.split('/')[path.split('/').length - 2] || 'image';
    const categoryMap: Record<string, string> = {
      iphone: 'Smartphone',
      samsung: 'Smartphone',
      watch: 'SmartWatch',
      audio: 'Audio',
      game: 'Gamer',
      'cache telephone': 'Coques & Protections',
      iPade: 'Tablette'
    };

    const type = categoryMap[folder] || 'Accessoire';

    return {
      id: Math.random() * 10000, // ID temporaire
      name: name,
      price: 299, // prix par défaut
      stock: 5, // stock par défaut
      type,
      storage: '128 Go',
      color: 'Noir',
      brand: { id: 0, name: 'Galerie' },
      category: { id: 0, name: type },
      image: imageUrl
    };
  }

  addToCart(accessory: Accessory): void {
    if (accessory.stock === 0) {
      return;
    }
    this.cartItems = [...this.cartItems, accessory];
  }

  selectCategory(categoryId: number | null | undefined): void {
    this.selectedCategoryId = categoryId;
  }

  selectNav(navItem: string, event: Event): void {
    event.preventDefault();
    this.selectedNav = navItem;

    if (navItem === 'Accueil') {
      this.clearFilters();
      return;
    }

    if (navItem === 'Promotions') {
      this.selectedType = '';
      this.selectedCategoryId = null;
      this.sortOption = 'popular';
      return;
    }

    const typeMap: Record<string, string> = {
      Smartphone: 'Smartphone',
      Tablettes: 'Tablette',
      SmartWatch: 'SmartWatch',
      Audio: 'Audio',
      Gamer: 'Gamer',
      Accessoires: 'Accessoire'
    };

    this.selectedType = typeMap[navItem] || '';
    this.selectedCategoryId = null;
    this.selectedStorage = [];
    this.selectedColors = [];
    this.inStockOnly = false;
  }

  toggleStorage(storage: string): void {
    if (this.selectedStorage.includes(storage)) {
      this.selectedStorage = this.selectedStorage.filter(item => item !== storage);
    } else {
      this.selectedStorage = [...this.selectedStorage, storage];
    }
  }

  toggleColor(color: string): void {
    if (this.selectedColors.includes(color)) {
      this.selectedColors = this.selectedColors.filter(item => item !== color);
    } else {
      this.selectedColors = [...this.selectedColors, color];
    }
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedBrandId = null;
    this.selectedCategoryId = null;
    this.selectedType = '';
    this.selectedStorage = [];
    this.selectedColors = [];
    this.inStockOnly = false;
    this.sortOption = 'popular';
  }

  filterSmartphoneBrand(brandName: string): void {
    const brand = this.brands.find(b => b.name.toLowerCase() === brandName.toLowerCase()) ||
      this.sampleProducts
        .map(p => p.brand)
        .filter((b): b is Brand => !!b)
        .find(b => b.name.toLowerCase() === brandName.toLowerCase());

    this.selectedNav = 'Smartphone';
    this.selectedType = 'Smartphone';
    this.selectedBrandId = brand?.id ?? null;
    this.selectedCategoryId = null;
    this.selectedStorage = [];
    this.selectedColors = [];
    this.inStockOnly = false;
    this.sortOption = 'popular';
  }

  viewCart(): void {
    this.orderConfirmed = false;
    this.successMessage = '';
    this.showCartSummary = true;
  }

  closeCart(): void {
    this.showCartSummary = false;
  }

  confirmOrder(): void {
    if (this.cartItems.length === 0) {
      this.error = 'Votre panier est vide. Ajoutez un produit pour continuer.';
      return;
    }
    this.successMessage = `Commande confirmée (${this.paymentMethod === 'online' ? 'Paiement en ligne' : 'Paiement sur place'}). Livraison sous 24h.`;
    this.orderConfirmed = true;
    this.showCartSummary = false;
    this.cartItems = [];
    this.paymentMethod = 'online';
    this.error = '';
  }

  modifyProduct(accessory: Accessory): void {
    alert(`Demande de modification : ${accessory.name}`);
  }
}
