/**
 * Represents a product with its details.
 */
export interface Product {
  /**
   * The unique identifier for the product.
   */
  id: string;
  /**
   * The title of the product.
   */
  title: string;
  /**
   * The URL of the product image. Should be a Picsum URL.
   */
  image: string;
  /**
   * The original price of the product.
   */
  originalPrice: number;
  /**
   * The discounted price of the product, if any.
   */
  discountedPrice?: number; // Optional discounted price
  /**
   * The rating of the product (0-5).
   */
  rating: number;
  /**
   * The category of the product.
   */
  category: string;
  /**
   * The brand of the product.
   */
  brand: string;
  /**
   * The color of the product.
   */
  color: string;
  /**
   * The size of the product.
   */
  size: string;
  /**
   * Timestamp when the product was created/added.
   */
  createdAt: number;
}

// Updated mock data with new categories, brands, and colors, consistent title, fixed original price, and some discounted prices
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/1.jpg',
    originalPrice: 25.0,
    discountedPrice: 20.0, // 20% discount
    rating: 4.5,
    category: 'Moisturizers',
    brand: 'Cerave',
    color: 'White',
    size: '150ml',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
  },
  {
    id: '2',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/2.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.2,
    category: 'Personal Care',
    brand: 'Dove',
    color: 'Blue',
    size: '250ml',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
  },
  {
    id: '3',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/3.jpg',
    originalPrice: 25.0,
    discountedPrice: 22.5, // 10% discount
    rating: 4.8,
    category: 'Eye Care',
    brand: 'Olay',
    color: 'Aqua',
    size: '30ml',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1, // 1 day ago
  },
  {
    id: '4',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/4.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.0,
    category: 'Hair Care',
    brand: 'Loreal',
    color: 'Green',
    size: '300ml',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
  },
  {
    id: '5',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/5.jpg',
    originalPrice: 25.0,
    discountedPrice: 18.75, // 25% discount
    rating: 4.6,
    category: 'Night Care',
    brand: 'Neutrogena',
    color: 'Blue',
    size: '50g',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
  },
  {
    id: '6',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/6.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.1,
    category: 'Personal Care',
    brand: 'Nivea',
    color: 'Aqua',
    size: '100g',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
  },
  {
    id: '7',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/1.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.7,
    category: 'Seller Picks',
    brand: 'The Body Shop',
    color: 'Black',
    size: '50ml',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4, // 4 days ago
  },
  {
    id: '8',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/3.jpg',
    originalPrice: 25.0,
    discountedPrice: 21.25, // 15% discount
    rating: 4.3,
    category: 'Sun Care',
    brand: 'Skinfood',
    color: 'Green',
    size: '200ml',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6, // 6 days ago
  },
  {
    id: '9',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/5.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.4,
    category: 'Masks',
    brand: 'Neogen',
    color: 'Neogen',
    size: '100g', // Same as product 6
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8, // 8 days ago
  },
   {
    id: '10',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/2.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.2,
    category: 'Hair Care',
    brand: 'Loreal',
    color: 'White',
    size: '250ml', // Same as product 2
    createdAt: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
  },
   {
    id: '11',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/4.jpg',
    originalPrice: 25.0,
    discountedPrice: 17.50, // 30% discount
    rating: 4.5,
    category: 'Personal Care',
    brand: 'Dove',
    color: 'Pink',
    size: '200g',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.5, // 1.5 days ago
  },
   {
    id: '12',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/1.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.0,
    category: 'Personal Care',
    brand: 'Nivea',
    color: 'Blue',
    size: '500ml',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9, // 9 days ago
  },
  {
    id: '13',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/2.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.4,
    category: 'Seller Picks',
    brand: 'The Body Shop',
    color: 'Black',
    size: '120ml',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11, // 11 days ago
  },
  {
    id: '14',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/2.jpg',
    originalPrice: 25.0,
    discountedPrice: 12.50, // 50% discount
    rating: 4.9,
    category: 'Sun Care',
    brand: 'Neutrogena',
    color: 'Red',
    size: '100ml',
    createdAt: Date.now() - 1000 * 60 * 30, // 30 minutes ago
  },
  {
    id: '15',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/6.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.3,
    category: 'Hair Care',
    brand: 'Loreal',
    color: 'Loreal',
    size: '150ml', // Same as product 1
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12, // 12 days ago
  },
  {
    id: '16',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/3.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.8,
    category: 'Personal Care',
    brand: 'Cerave',
    color: 'White',
    size: '300ml', // Same as product 4
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.2, // 1.2 days ago
  },
  {
    id: '17',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/2.jpg',
    originalPrice: 25.0, // No discount
    rating: 4.0,
    category: 'Personal Care',
    brand: 'Nivea',
    color: 'Black',
    size: '2 Pack',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15, // 15 days ago
  },
  {
    id: '18',
    title: 'Nivea Soft Jar Moisturising Cream',
    image: '/5.jpg',
    originalPrice: 25.0,
    discountedPrice: 20.0, // 20% discount
    rating: 4.6,
    category: 'On Sale',
    brand: 'Olay',
    color: 'Red',
    size: '150g',
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
];

/**
 * Possible sorting options for products.
 */
export type SortOption = 'latest' | 'oldest';


/**
 * Asynchronously retrieves a list of products based on specified filters and sorting.
 * Simulates an API call with a delay.
 * NOTE: Filters (category, brand, color, size, min/max price) are currently ignored
 *       as per the latest request, returning all products up to the limit.
 *
 * @param categories Ignored. An array of categories to filter products by.
 * @param brands Ignored. An array of brands to filter products by.
 * @param colors Ignored. An array of colors to filter products by.
 * @param sizes Ignored. An array of sizes to filter products by.
 * @param minPrice Ignored. The minimum price to filter products by.
 * @param maxPrice Ignored. The maximum price to filter products by.
 * @param sortBy The sorting order ('latest' or 'oldest'). Defaults to 'latest'.
 * @param limit The maximum number of products to return. Defaults to 18.
 * @returns A promise that resolves to an array of Product objects.
 */
export async function getProducts(
  categories?: string[],
  brands?: string[],
  colors?: string[],
  sizes?: string[],
  minPrice?: number,
  maxPrice?: number,
  sortBy: SortOption = 'latest', // Added sortBy parameter with default
  limit: number = 18 // Default limit is 18
): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let productsToReturn = [...mockProducts]; // Copy mock data to allow sorting

  // --- Filtering Logic (Currently Disabled based on request) ---
  /*
  // NOTE: The following filter logic is disabled as per user request.
  // To re-enable filtering, uncomment this block.

  if (categories && categories.length > 0) {
    productsToReturn = productsToReturn.filter((product) =>
      categories.includes(product.category)
    );
  }

  if (brands && brands.length > 0) {
    productsToReturn = productsToReturn.filter((product) =>
      brands.includes(product.brand)
    );
  }

  if (colors && colors.length > 0) {
    productsToReturn = productsToReturn.filter((product) =>
      colors.includes(product.color)
    );
  }

  if (sizes && sizes.length > 0) {
    productsToReturn = productsToReturn.filter((product) =>
      sizes.includes(product.size)
    );
  }

  if (minPrice !== undefined) {
    productsToReturn = productsToReturn.filter(
      (product) => (product.discountedPrice ?? product.originalPrice) >= minPrice
    );
  }

  if (maxPrice !== undefined) {
    productsToReturn = productsToReturn.filter(
      (product) => (product.discountedPrice ?? product.originalPrice) <= maxPrice
    );
  }
  */
  // --- End of Disabled Filtering Logic ---

  // --- Sorting Logic ---
  if (sortBy === 'latest') {
    productsToReturn.sort((a, b) => b.createdAt - a.createdAt); // Sort descending by createdAt
  } else if (sortBy === 'oldest') {
    productsToReturn.sort((a, b) => a.createdAt - b.createdAt); // Sort ascending by createdAt
  }

  // Return the limited number of products
  return productsToReturn.slice(0, limit);
}


/**
 * Retrieves distinct values for filter options from the product data.
 * In a real app, this might come from a separate API endpoint.
 */
export async function getFilterOptions(): Promise<{
  categories: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
  maxPrice: number;
}> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Define the specific order/list for categories, brands, and colors
    const categories = [
        'Sun Care',
        'Night Care',
        'Moisturizers',
        'Eye Care',
        'Masks',
        'Personal Care',
        'Hair Care',
        'On Sale',
        'Seller Picks',
    ];
    const brands = [
        'The Body Shop',
        'Nivea',
        'Skinfood',
        'Neutrogena',
        'Cerave',
        'Olay',
        'Dove',
        'Neogen',
        'Loreal',
    ];
    const colors = [
        'Red',
        'Pink',
        'White',
        'Black',
        'Aqua',
        'Green',
        'Blue',
        'Neogen', // Included as requested
        'Loreal', // Included as requested
    ];

    // Get unique sizes, sort them, and take the first 5
    const sizes = [...new Set(mockProducts.map(p => p.size))]
        .sort() // Sort sizes alphabetically/numerically
        .slice(0, 5); // Limit to the first 5 sizes

    // Set max price to 10000 as requested
    const maxPrice = 10000;

    return { categories, brands, colors, sizes, maxPrice };
}
