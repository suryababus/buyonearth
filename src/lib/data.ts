export type ProductCategory = "Men" | "Women" | "Children" | "Perfume"

export type ProductBadge = "New" | "Best Seller" | "Premium" | "Limited Drop" | "Eco Packaged" | "AI Pick" | "Selling Fast" | "Sale"

export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  category: ProductCategory
  subcategory: string
  description: string
  longDescription: string
  price: number
  compareAtPrice?: number
  currency: string
  images: string[]
  hoverImage?: string
  sizes: string[]
  colors: string[]
  material?: string
  fit?: string
  care?: string
  stock: number
  rating: number
  reviewCount: number
  badges: ProductBadge[]
  tags: string[]
  seoTitle: string
  seoDescription: string
  isFeatured: boolean
  isNewArrival: boolean
  isBestSeller: boolean
  collection?: string
  aiMatchScore?: number
  // Perfume specific
  fragranceFamily?: string
  topNotes?: string[]
  heartNotes?: string[]
  baseNotes?: string[]
  longevity?: string
  projection?: string
  occasion?: string[]
  season?: string[]
  concentration?: string
  bottleSize?: string
  gender?: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  publishDate: string
  image: string
  tags: string[]
  readTime: number
}

export const products: Product[] = [
  // MEN'S PRODUCTS
  {
    id: "m001",
    name: "Earth Luxe Oversized Shirt",
    slug: "earth-luxe-oversized-shirt",
    brand: "Buy On Earth",
    category: "Men",
    subcategory: "Shirts",
    description: "A premium oversized shirt crafted from organic cotton blend, featuring a relaxed silhouette and refined details.",
    longDescription: "The Earth Luxe Oversized Shirt represents the pinnacle of casual luxury. Crafted from our signature 100% organic cotton blend, this shirt features a relaxed fit that drapes beautifully. The fabric is pre-washed for ultimate softness and features mother-of-pearl buttons, a curved hem, and subtle branding. Perfect for smart-casual occasions.",
    price: 2999,
    compareAtPrice: 3999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
      "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=600&q=80",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Earth Sand", "Soft Silver"],
    material: "100% Organic Cotton Blend",
    fit: "Oversized",
    care: "Machine wash cold, tumble dry low",
    stock: 150,
    rating: 4.8,
    reviewCount: 234,
    badges: ["New", "Premium"],
    tags: ["oversized", "shirt", "men", "premium", "casual", "organic"],
    seoTitle: "Earth Luxe Oversized Shirt | Premium Men's Shirts | Buy On Earth",
    seoDescription: "Shop the Earth Luxe Oversized Shirt - premium organic cotton men's shirt. Available in multiple colors and sizes.",
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    collection: "Earth Luxe Collection",
    aiMatchScore: 94
  },
  {
    id: "m002",
    name: "Future Fit Black T-Shirt",
    slug: "future-fit-black-t-shirt",
    brand: "Buy On Earth",
    category: "Men",
    subcategory: "T-Shirts",
    description: "A precision-cut premium black t-shirt with moisture-wicking technology and a modern fit.",
    longDescription: "The Future Fit Black T-Shirt is engineered for the modern man. Made from our advanced pima cotton-modal blend, it features moisture-wicking properties, anti-odor treatment, and a precision-cut silhouette that flatters every body type. The reinforced seams ensure lasting durability.",
    price: 1499,
    compareAtPrice: 1999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Charcoal", "Earth Sand"],
    material: "Pima Cotton-Modal Blend",
    fit: "Regular",
    care: "Machine wash cold",
    stock: 300,
    rating: 4.7,
    reviewCount: 567,
    badges: ["Best Seller", "AI Pick"],
    tags: ["t-shirt", "black", "men", "premium", "everyday"],
    seoTitle: "Future Fit Black T-Shirt | Premium Men's T-Shirts | Buy On Earth",
    seoDescription: "Premium black t-shirt for men with moisture-wicking technology. Shop now at Buy On Earth.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    collection: "Monochrome Essentials",
    aiMatchScore: 91
  },
  {
    id: "m003",
    name: "Premium Sand Linen Shirt",
    slug: "premium-sand-linen-shirt",
    brand: "Buy On Earth",
    category: "Men",
    subcategory: "Shirts",
    description: "Elegant linen shirt in earth sand, perfect for warm weather and resort occasions.",
    longDescription: "The Premium Sand Linen Shirt embodies relaxed luxury. Woven from European linen, this shirt breathes beautifully in warm weather while maintaining its elegant drape. Features include a spread collar, chest pocket, and coconut shell buttons.",
    price: 2499,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Earth Sand", "White", "Soft Silver"],
    material: "100% European Linen",
    fit: "Regular",
    care: "Hand wash or dry clean",
    stock: 80,
    rating: 4.9,
    reviewCount: 189,
    badges: ["Premium", "New"],
    tags: ["linen", "shirt", "men", "summer", "resort", "sand"],
    seoTitle: "Premium Sand Linen Shirt | Luxury Men's Shirts | Buy On Earth",
    seoDescription: "Shop the Premium Sand Linen Shirt. European linen, perfect for resort and warm weather.",
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    collection: "Earth Luxe Collection",
    aiMatchScore: 88
  },
  {
    id: "m004",
    name: "Orbit Tailored Blazer",
    slug: "orbit-tailored-blazer",
    brand: "Buy On Earth",
    category: "Men",
    subcategory: "Blazers",
    description: "A precision-tailored blazer with a modern cut, ideal for formal and smart-casual occasions.",
    longDescription: "The Orbit Tailored Blazer redefines modern formalwear. Constructed from a premium wool-polyester blend, it features a slim two-button closure, notch lapels, and a half-lined interior for comfort. The structured shoulders and nipped waist create a flattering silhouette.",
    price: 7999,
    compareAtPrice: 9999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4f6d?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f6d?w=600&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal", "Navy"],
    material: "Wool-Polyester Blend",
    fit: "Slim",
    care: "Dry clean only",
    stock: 50,
    rating: 4.9,
    reviewCount: 123,
    badges: ["Premium", "Best Seller"],
    tags: ["blazer", "formal", "men", "tailored", "premium", "office"],
    seoTitle: "Orbit Tailored Blazer | Premium Men's Blazers | Buy On Earth",
    seoDescription: "Premium tailored blazer for men. Perfect for formal occasions and office wear.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    collection: "Premium Workwear",
    aiMatchScore: 96
  },
  {
    id: "m005",
    name: "Midnight Tech Hoodie",
    slug: "midnight-tech-hoodie",
    brand: "Buy On Earth",
    category: "Men",
    subcategory: "Hoodies",
    description: "A futuristic hoodie with technical fabric, kangaroo pocket, and premium drawstring details.",
    longDescription: "The Midnight Tech Hoodie blends street style with technical precision. Made from our performance fleece blend, it features a reinforced kangaroo pocket, adjustable drawstring, ribbed cuffs, and a smooth phone-compatible interior pocket. The fabric is both warm and breathable.",
    price: 3499,
    compareAtPrice: 4499,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80",
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal", "Deep Forest"],
    material: "Performance Fleece Blend",
    fit: "Relaxed",
    care: "Machine wash warm",
    stock: 120,
    rating: 4.8,
    reviewCount: 342,
    badges: ["Best Seller", "AI Pick"],
    tags: ["hoodie", "men", "casual", "tech", "streetwear"],
    seoTitle: "Midnight Tech Hoodie | Premium Men's Hoodies | Buy On Earth",
    seoDescription: "Shop the Midnight Tech Hoodie - premium performance fleece hoodie for men.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    collection: "Future Formal",
    aiMatchScore: 89
  },
  {
    id: "m006",
    name: "Signature Slim Trousers",
    slug: "signature-slim-trousers",
    brand: "Buy On Earth",
    category: "Men",
    subcategory: "Trousers",
    description: "Premium slim-fit trousers in premium stretch fabric for all-day comfort and style.",
    longDescription: "The Signature Slim Trousers offer uncompromising style and comfort. Crafted from a technical stretch fabric, they maintain their shape throughout the day while allowing full freedom of movement. Features include a French fly, deep pockets, and subtle chain-stitch detailing.",
    price: 3999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Black", "Charcoal", "Earth Sand", "Navy"],
    material: "Stretch Wool Blend",
    fit: "Slim",
    care: "Dry clean recommended",
    stock: 90,
    rating: 4.7,
    reviewCount: 198,
    badges: ["Premium"],
    tags: ["trousers", "slim", "formal", "men", "premium", "office"],
    seoTitle: "Signature Slim Trousers | Premium Men's Trousers | Buy On Earth",
    seoDescription: "Premium slim-fit trousers in stretch wool blend. Available in multiple colors.",
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    collection: "Premium Workwear",
    aiMatchScore: 85
  },

  // WOMEN'S PRODUCTS
  {
    id: "w001",
    name: "Luna Satin Evening Dress",
    slug: "luna-satin-evening-dress",
    brand: "Buy On Earth",
    category: "Women",
    subcategory: "Dresses",
    description: "An ethereal satin evening dress with fluid drape and an elegant cowl neck.",
    longDescription: "The Luna Satin Evening Dress is a masterpiece of modern femininity. Crafted from premium silk-satin, it features a bias-cut silhouette that drapes beautifully, a cowl neckline, and adjustable spaghetti straps. The fluid fabric catches light exquisitely, making it ideal for formal events.",
    price: 8999,
    compareAtPrice: 12999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Champagne", "Black", "Silver", "Earth Sand"],
    material: "Silk-Satin",
    fit: "Bias Cut",
    care: "Dry clean only",
    stock: 40,
    rating: 4.9,
    reviewCount: 156,
    badges: ["Premium", "Limited Drop"],
    tags: ["dress", "evening", "satin", "women", "luxury", "formal"],
    seoTitle: "Luna Satin Evening Dress | Premium Women's Dresses | Buy On Earth",
    seoDescription: "Shop the Luna Satin Evening Dress - premium silk-satin for formal occasions.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    collection: "Earth Luxe Collection",
    aiMatchScore: 97
  },
  {
    id: "w002",
    name: "Earth Muse Co-ord Set",
    slug: "earth-muse-coord-set",
    brand: "Buy On Earth",
    category: "Women",
    subcategory: "Co-ord Sets",
    description: "A versatile earth-toned co-ord set with a crop top and wide-leg trousers.",
    longDescription: "The Earth Muse Co-ord Set embodies effortless sophistication. The set includes a structured crop top with subtle ruching and matching wide-leg trousers in our signature Earth Sand hue. Both pieces can be worn separately or together for maximum versatility.",
    price: 5999,
    compareAtPrice: 7999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Earth Sand", "White", "Black"],
    material: "Premium Viscose Blend",
    fit: "Regular",
    care: "Hand wash cold",
    stock: 60,
    rating: 4.8,
    reviewCount: 289,
    badges: ["Best Seller", "New"],
    tags: ["coord set", "women", "casual", "elegant", "earth tones"],
    seoTitle: "Earth Muse Co-ord Set | Premium Women's Sets | Buy On Earth",
    seoDescription: "Shop the Earth Muse Co-ord Set - versatile premium viscose set for women.",
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    collection: "Earth Luxe Collection",
    aiMatchScore: 92
  },
  {
    id: "w003",
    name: "Nova White Premium Shirt",
    slug: "nova-white-premium-shirt",
    brand: "Buy On Earth",
    category: "Women",
    subcategory: "Shirts",
    description: "A crisp white premium shirt with architectural collar and relaxed silhouette.",
    longDescription: "The Nova White Premium Shirt is the ultimate capsule wardrobe essential. Made from 100% Supima cotton, it features an architectural spread collar, a relaxed body with a flattering taper at the hem, and hidden placket buttons. The fabric is wrinkle-resistant and maintains its pristine appearance all day.",
    price: 2999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Earth Sand", "Soft Silver"],
    material: "100% Supima Cotton",
    fit: "Relaxed",
    care: "Machine wash cold",
    stock: 110,
    rating: 4.7,
    reviewCount: 312,
    badges: ["Premium", "AI Pick"],
    tags: ["shirt", "white", "women", "office", "premium", "supima"],
    seoTitle: "Nova White Premium Shirt | Luxury Women's Shirts | Buy On Earth",
    seoDescription: "Premium women's white shirt in 100% Supima cotton. Shop now at Buy On Earth.",
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    collection: "Monochrome Essentials",
    aiMatchScore: 87
  },
  {
    id: "w004",
    name: "Celeste Luxury Blazer",
    slug: "celeste-luxury-blazer",
    brand: "Buy On Earth",
    category: "Women",
    subcategory: "Blazers",
    description: "An impeccably tailored women's blazer in premium fabric with a modern silhouette.",
    longDescription: "The Celeste Luxury Blazer is a statement piece for the modern woman. Crafted from a premium bouclé-wool blend, it features structured shoulders, a single-button closure, flap pockets, and a slightly cropped length that pairs beautifully with both trousers and skirts.",
    price: 9999,
    compareAtPrice: 13999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4f6d?w=600&q=80",
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Champagne Gold", "Soft Silver"],
    material: "Bouclé-Wool Blend",
    fit: "Structured",
    care: "Dry clean only",
    stock: 30,
    rating: 4.9,
    reviewCount: 87,
    badges: ["Premium", "Limited Drop"],
    tags: ["blazer", "luxury", "women", "formal", "premium", "bouclé"],
    seoTitle: "Celeste Luxury Blazer | Premium Women's Blazers | Buy On Earth",
    seoDescription: "Premium women's blazer in bouclé-wool blend. Shop the Celeste Luxury Blazer.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    collection: "Future Formal",
    aiMatchScore: 95
  },
  {
    id: "w005",
    name: "Noir Minimal Dress",
    slug: "noir-minimal-dress",
    brand: "Buy On Earth",
    category: "Women",
    subcategory: "Dresses",
    description: "A sleek minimal black dress with architectural seaming and a modern midi length.",
    longDescription: "The Noir Minimal Dress is the modern little black dress reimagined. Crafted from premium crepe, it features architectural seaming that creates a flattering shape, a scoop neck, and a midi length that's both elegant and versatile. Available with optional belt for a more defined waist.",
    price: 5499,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Earth Sand", "Deep Forest"],
    material: "Premium Crepe",
    fit: "Semi-fitted",
    care: "Machine wash delicate",
    stock: 75,
    rating: 4.8,
    reviewCount: 234,
    badges: ["Best Seller"],
    tags: ["dress", "black", "minimal", "women", "midi", "elegant"],
    seoTitle: "Noir Minimal Dress | Premium Women's Dresses | Buy On Earth",
    seoDescription: "Shop the Noir Minimal Dress - premium crepe midi dress for women. Modern and elegant.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    collection: "Monochrome Essentials",
    aiMatchScore: 90
  },

  // CHILDREN'S PRODUCTS
  {
    id: "c001",
    name: "Mini Earth Cotton Set",
    slug: "mini-earth-cotton-set",
    brand: "Buy On Earth",
    category: "Children",
    subcategory: "Sets",
    description: "A premium organic cotton set for children, featuring a top and comfortable bottoms.",
    longDescription: "The Mini Earth Cotton Set is designed for little ones who deserve the best. Made from GOTS-certified organic cotton, it's hypoallergenic, ultra-soft, and breathable. The set includes a printed top and elasticated waist bottoms. Safe dyes and toxin-free materials throughout.",
    price: 1999,
    compareAtPrice: 2499,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    sizes: ["1-2Y", "3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["Earth Sand", "White", "Soft Blue", "Mint"],
    material: "GOTS Organic Cotton",
    fit: "Regular",
    care: "Machine wash cold, gentle cycle",
    stock: 200,
    rating: 4.9,
    reviewCount: 456,
    badges: ["Best Seller", "Eco Packaged"],
    tags: ["children", "set", "organic", "cotton", "baby", "kids"],
    seoTitle: "Mini Earth Cotton Set | Premium Children's Clothing | Buy On Earth",
    seoDescription: "Premium organic cotton clothing set for children. GOTS certified, hypoallergenic.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    collection: "Mini Earth Kids",
    aiMatchScore: 93
  },
  {
    id: "c002",
    name: "Earth Kids Party Dress",
    slug: "earth-kids-party-dress",
    brand: "Buy On Earth",
    category: "Children",
    subcategory: "Dresses",
    description: "A premium party dress for girls with elegant detailing and comfortable fabric.",
    longDescription: "The Earth Kids Party Dress makes every little girl feel like royalty. Crafted from a silk-cotton blend with an organza overlay, it features delicate embroidery at the bodice, a tulle skirt, and a concealed back zip. Machine washable for convenience despite its luxurious appearance.",
    price: 2999,
    compareAtPrice: 3999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&q=80",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    colors: ["White", "Blush Pink", "Champagne", "Mint"],
    material: "Silk-Cotton Blend with Organza",
    fit: "A-line",
    care: "Machine wash delicate",
    stock: 80,
    rating: 4.8,
    reviewCount: 178,
    badges: ["New", "Premium"],
    tags: ["dress", "girls", "party", "children", "occasion wear"],
    seoTitle: "Earth Kids Party Dress | Premium Children's Occasion Wear | Buy On Earth",
    seoDescription: "Premium party dress for girls. Silk-cotton blend with organza overlay.",
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    collection: "Mini Earth Kids",
    aiMatchScore: 91
  },
  {
    id: "c003",
    name: "Little Orbit Hoodie",
    slug: "little-orbit-hoodie",
    brand: "Buy On Earth",
    category: "Children",
    subcategory: "Jackets",
    description: "A premium soft-fleece hoodie for children with fun futuristic details.",
    longDescription: "The Little Orbit Hoodie keeps kids warm and stylish. Made from super-soft organic fleece, it features a kangaroo pocket, adjustable drawstring (safety-tested for children), and a signature Earth emblem. The fabric is pre-washed for extra softness and holds its shape after multiple washes.",
    price: 1799,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
      "https://images.unsplash.com/photo-1519278409-1f56ab241a4e?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1519278409-1f56ab241a4e?w=600&q=80",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
    colors: ["Black", "Deep Forest", "Earth Sand", "Charcoal"],
    material: "Organic Fleece",
    fit: "Regular",
    care: "Machine wash warm",
    stock: 150,
    rating: 4.7,
    reviewCount: 234,
    badges: ["Best Seller"],
    tags: ["hoodie", "children", "fleece", "casual", "boys", "girls"],
    seoTitle: "Little Orbit Hoodie | Premium Children's Hoodies | Buy On Earth",
    seoDescription: "Premium organic fleece hoodie for children. Warm, soft and stylish.",
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    collection: "Mini Earth Kids",
    aiMatchScore: 88
  },

  // PERFUME PRODUCTS
  {
    id: "p001",
    name: "Earth Noir Eau De Parfum",
    slug: "earth-noir-eau-de-parfum",
    brand: "Buy On Earth",
    category: "Perfume",
    subcategory: "Unisex Perfume",
    description: "A sophisticated woody-amber fragrance with dark, mysterious notes for evening wear.",
    longDescription: "Earth Noir is a bold statement of modern luxury. This complex fragrance opens with the brightness of Bergamot and Pink Pepper before revealing a rich heart of Lavender and Saffron. The base settles into a deeply sensual blend of Amber, Oud, and Musk that lingers beautifully for hours. A fragrance for those who command attention.",
    price: 4999,
    compareAtPrice: 6999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
    sizes: ["50ml", "100ml"],
    colors: ["Black"],
    stock: 100,
    rating: 4.9,
    reviewCount: 345,
    badges: ["Best Seller", "Premium"],
    tags: ["perfume", "unisex", "woody", "amber", "evening", "luxury", "oud"],
    seoTitle: "Earth Noir Eau De Parfum | Luxury Unisex Perfume | Buy On Earth",
    seoDescription: "Shop Earth Noir EDP - a sophisticated woody-amber fragrance for evening wear.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    fragranceFamily: "Woody Amber",
    topNotes: ["Bergamot", "Pink Pepper", "Cardamom"],
    heartNotes: ["Lavender", "Saffron", "Rose"],
    baseNotes: ["Amber", "Oud", "Musk", "Sandalwood"],
    longevity: "8-10 hours",
    projection: "Strong",
    occasion: ["Evening", "Formal", "Luxury"],
    season: ["Autumn", "Winter"],
    concentration: "EDP",
    bottleSize: "100ml",
    gender: "Unisex",
    collection: "Signature Scents",
    aiMatchScore: 98
  },
  {
    id: "p002",
    name: "Luna Bloom Parfum",
    slug: "luna-bloom-parfum",
    brand: "Buy On Earth",
    category: "Perfume",
    subcategory: "Women's Perfume",
    description: "A radiant floral fragrance with light, luminous notes perfect for daytime elegance.",
    longDescription: "Luna Bloom is a celebration of feminine grace. It opens with sparkling Neroli and Peach, leading to a heart of Bulgarian Rose and Jasmine. The base of White Musk and Cedarwood provides warmth and longevity without heaviness. The perfect daytime signature scent.",
    price: 3999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
    sizes: ["30ml", "50ml", "100ml"],
    colors: ["Pink"],
    stock: 120,
    rating: 4.8,
    reviewCount: 278,
    badges: ["Best Seller", "AI Pick"],
    tags: ["perfume", "women", "floral", "daytime", "rose", "jasmine"],
    seoTitle: "Luna Bloom Parfum | Women's Floral Perfume | Buy On Earth",
    seoDescription: "Shop Luna Bloom Parfum - a radiant floral fragrance for women. Bulgarian Rose and Jasmine.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    fragranceFamily: "Floral",
    topNotes: ["Neroli", "Peach", "Bergamot"],
    heartNotes: ["Bulgarian Rose", "Jasmine", "Peony"],
    baseNotes: ["White Musk", "Cedarwood", "Ambrette"],
    longevity: "6-8 hours",
    projection: "Moderate",
    occasion: ["Daytime", "Office", "Casual"],
    season: ["Spring", "Summer"],
    concentration: "Parfum",
    bottleSize: "50ml",
    gender: "Women",
    collection: "Signature Scents",
    aiMatchScore: 95
  },
  {
    id: "p003",
    name: "Orbit Oud Intense",
    slug: "orbit-oud-intense",
    brand: "Buy On Earth",
    category: "Perfume",
    subcategory: "Men's Perfume",
    description: "A powerful oud-based masculine fragrance with smoky, resinous depth.",
    longDescription: "Orbit Oud Intense is a bold declaration of masculine luxury. The opening of Black Pepper and Nutmeg sets a spicy tone, leading to a heart dominated by rare Agarwood (Oud) and Leather. The dry-down reveals Labdanum, Vetiver, and Dark Resins for extraordinary lasting power.",
    price: 5999,
    compareAtPrice: 7999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    sizes: ["50ml", "100ml"],
    colors: ["Black"],
    stock: 60,
    rating: 4.9,
    reviewCount: 167,
    badges: ["Premium", "Limited Drop"],
    tags: ["perfume", "men", "oud", "intense", "masculine", "evening"],
    seoTitle: "Orbit Oud Intense | Men's Luxury Perfume | Buy On Earth",
    seoDescription: "Shop Orbit Oud Intense - premium oud-based masculine perfume for evening wear.",
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    fragranceFamily: "Oriental Woody",
    topNotes: ["Black Pepper", "Nutmeg", "Bergamot"],
    heartNotes: ["Agarwood (Oud)", "Leather", "Incense"],
    baseNotes: ["Labdanum", "Vetiver", "Dark Resins", "Ambergris"],
    longevity: "10-12 hours",
    projection: "Very Strong",
    occasion: ["Evening", "Formal", "Special Occasion"],
    season: ["Autumn", "Winter"],
    concentration: "EDP",
    bottleSize: "100ml",
    gender: "Men",
    collection: "Signature Scents",
    aiMatchScore: 96
  },
  {
    id: "p004",
    name: "Solar Musk",
    slug: "solar-musk",
    brand: "Buy On Earth",
    category: "Perfume",
    subcategory: "Unisex Perfume",
    description: "A clean, radiant musk fragrance with solar warmth, perfect for everyday wear.",
    longDescription: "Solar Musk captures the warmth of sunlight in a bottle. A modern clean fragrance that opens with Aldehydes and Yuzu, transitions to a heart of Skin Musk and Violet Leaf, and dries down to a warm base of Cashmeran and Solar Notes. Effortlessly wearable from morning to night.",
    price: 2999,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80"
    ],
    hoverImage: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80",
    sizes: ["30ml", "50ml", "100ml"],
    colors: ["White"],
    stock: 200,
    rating: 4.7,
    reviewCount: 423,
    badges: ["Best Seller", "New"],
    tags: ["perfume", "unisex", "musk", "clean", "everyday", "fresh"],
    seoTitle: "Solar Musk | Clean Unisex Fragrance | Buy On Earth",
    seoDescription: "Shop Solar Musk - a radiant clean musk fragrance perfect for everyday wear.",
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    fragranceFamily: "Musk",
    topNotes: ["Aldehydes", "Yuzu", "Bergamot"],
    heartNotes: ["Skin Musk", "Violet Leaf", "Iris"],
    baseNotes: ["Cashmeran", "Solar Notes", "White Amber"],
    longevity: "4-6 hours",
    projection: "Light",
    occasion: ["Everyday", "Office", "Casual"],
    season: ["Spring", "Summer", "Year-round"],
    concentration: "EDT",
    bottleSize: "50ml",
    gender: "Unisex",
    collection: "Signature Scents",
    aiMatchScore: 87
  }
]

export const collections: Collection[] = [
  {
    id: "col001",
    name: "Earth Luxe Collection",
    slug: "earth-luxe",
    description: "Premium everyday luxuries crafted from the finest materials, designed for those who appreciate understated elegance.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    productCount: 24
  },
  {
    id: "col002",
    name: "Future Formal",
    slug: "future-formal",
    description: "Reimagining formal dressing for the modern age. Sharp silhouettes, premium fabrics, and forward-thinking details.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    productCount: 18
  },
  {
    id: "col003",
    name: "Monochrome Essentials",
    slug: "monochrome-essentials",
    description: "The power of black, white, and grey. Essential pieces in achromatic perfection.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    productCount: 16
  },
  {
    id: "col004",
    name: "Mini Earth Kids",
    slug: "mini-earth-kids",
    description: "Premium clothing for the next generation. Safe, sustainable, and stylish.",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
    productCount: 22
  },
  {
    id: "col005",
    name: "Signature Scents",
    slug: "signature-scents",
    description: "Our curated perfume collection. Each fragrance tells a story, leaves a memory.",
    image: "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&q=80",
    productCount: 12
  },
  {
    id: "col006",
    name: "Premium Workwear",
    slug: "premium-workwear",
    description: "Elevate your professional wardrobe. Premium fabrics, refined silhouettes, and lasting quality.",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80",
    productCount: 20
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: "b001",
    title: "How to Build a Premium Capsule Wardrobe",
    slug: "how-to-build-premium-capsule-wardrobe",
    excerpt: "A capsule wardrobe is the foundation of effortless style. Learn how to build yours with premium essentials.",
    content: "Creating a capsule wardrobe is about investing in quality pieces that work together seamlessly...",
    category: "Men's Style",
    author: "Earth Editorial Team",
    publishDate: "2026-04-15",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    tags: ["capsule wardrobe", "men's style", "premium fashion"],
    readTime: 8
  },
  {
    id: "b002",
    title: "Best Perfumes for Evening Wear",
    slug: "best-perfumes-for-evening-wear",
    excerpt: "The right fragrance completes any evening look. Discover our curated selection of evening perfumes.",
    content: "Evening fragrances are all about depth, mystery, and lasting power...",
    category: "Perfume Guide",
    author: "Earth Editorial Team",
    publishDate: "2026-04-10",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80",
    tags: ["perfume", "evening wear", "fragrance guide"],
    readTime: 6
  },
  {
    id: "b003",
    title: "Perfume Notes Explained: Top, Heart, and Base",
    slug: "perfume-notes-explained",
    excerpt: "Understanding fragrance notes helps you choose the perfect perfume. Here's your complete guide.",
    content: "Every perfume is composed of three layers of notes that evolve over time...",
    category: "Perfume Guide",
    author: "Earth Editorial Team",
    publishDate: "2026-04-05",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    tags: ["perfume notes", "fragrance education", "buying guide"],
    readTime: 10
  }
]

export const testimonials = [
  {
    id: "t001",
    name: "Arjun Mehta",
    location: "Mumbai",
    rating: 5,
    review: "The quality feels truly international. The Earth Luxe Shirt is unlike anything I've owned — the fabric, the cut, everything is perfect.",
    product: "Earth Luxe Oversized Shirt",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
  },
  {
    id: "t002",
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    review: "The AI stylist helped me find my perfect wedding guest outfit in minutes. The Luna Satin Dress was exactly what I needed.",
    product: "Luna Satin Evening Dress",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80"
  },
  {
    id: "t003",
    name: "Rohan Krishnan",
    location: "Bangalore",
    rating: 5,
    review: "Earth Noir has incredible longevity — still strong after 10 hours. Worth every rupee. The packaging is also stunning.",
    product: "Earth Noir Eau De Parfum",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
  },
  {
    id: "t004",
    name: "Kavya Reddy",
    location: "Hyderabad",
    rating: 5,
    review: "The children's clothing quality is exceptional. The Mini Earth Cotton Set is so soft and my daughter loves it. Will definitely buy more.",
    product: "Mini Earth Cotton Set",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
  }
]

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(p => p.category === category)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.isFeatured)
}

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.isNewArrival)
}

export const getBestSellers = (): Product[] => {
  return products.filter(p => p.isBestSeller)
}

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug)
}

export const getProductsByCollection = (collection: string): Product[] => {
  return products.filter(p => p.collection === collection)
}

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, limit)
}
