export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

export const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Toys",
  "Beauty",
] as const;

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    description: "Premium noise-cancelling headphones with 30-hour battery life",
    price: 299.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Watch Ultra",
    description: "Advanced fitness tracking with GPS and health monitoring",
    price: 449.99,
    category: "Electronics",
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    description: "Sustainable, soft, and breathable everyday essential",
    price: 34.99,
    category: "Clothing",
    rating: 4.5,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    description: "Adjustable LED lamp with wireless charging base",
    price: 89.99,
    category: "Home & Garden",
    rating: 4.7,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Yoga Mat Premium",
    description: "Extra thick, non-slip mat for all yoga practices",
    price: 59.99,
    category: "Sports",
    rating: 4.9,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    badge: "Top Rated",
  },
  {
    id: 6,
    name: "Bestseller Novel Collection",
    description: "Set of 5 award-winning contemporary fiction books",
    price: 79.99,
    category: "Books",
    rating: 4.4,
    reviews: 334,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop",
  },
  {
    id: 7,
    name: "Building Block Set",
    description: "Creative 500-piece construction set for all ages",
    price: 49.99,
    category: "Toys",
    rating: 4.7,
    reviews: 1823,
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&h=500&fit=crop",
  },
  {
    id: 8,
    name: "Skincare Essentials Kit",
    description: "Complete daily skincare routine with natural ingredients",
    price: 129.99,
    category: "Beauty",
    rating: 4.6,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
  },
  {
    id: 9,
    name: "4K Webcam Pro",
    description: "Ultra HD webcam with auto-focus and noise reduction",
    price: 159.99,
    category: "Electronics",
    rating: 4.5,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
  },
  {
    id: 10,
    name: "Denim Jacket Vintage",
    description: "Classic style denim jacket with modern comfort fit",
    price: 89.99,
    category: "Clothing",
    rating: 4.3,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1551028919-ac76c9028d1b?w=500&h=500&fit=crop",
  },
  {
    id: 11,
    name: "Indoor Plant Set",
    description: "Low-maintenance houseplants with decorative pots",
    price: 45.99,
    category: "Home & Garden",
    rating: 4.8,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop",
  },
  {
    id: 12,
    name: "Running Shoes Elite",
    description: "Lightweight performance shoes with responsive cushioning",
    price: 179.99,
    category: "Sports",
    rating: 4.7,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
  },
];
