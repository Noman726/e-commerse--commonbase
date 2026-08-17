'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Heart, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductById, getRelatedProducts } from '@/lib/products';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductGrid from '@/components/ProductGrid';

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const product = getProductById(params.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(product?.sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(product?.colors[0] || null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.category, product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link href="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <ChevronRight size={16} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <ProductImageGallery images={product.images || [product.image]} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category and Title */}
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-accent' : 'text-muted'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-600 font-medium">In Stock</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-3">Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-3">Color</label>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-lg border-2 font-medium transition-all ${
                        selectedColor === color
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-accent'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-foreground text-background hover:bg-foreground/90 gap-2 h-12 text-lg"
              >
                <ShoppingCart size={20} />
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              <Button
                onClick={() => setIsWishlisted(!isWishlisted)}
                variant="outline"
                className="px-4"
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  className={isWishlisted ? 'text-accent' : ''}
                />
              </Button>
              <Button variant="outline" className="px-4">
                <Share2 size={20} />
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-border pt-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Delivery & Returns</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Free shipping on orders over $50</li>
                  <li>✓ 30-day return policy</li>
                  <li>✓ Fast and reliable delivery</li>
                  <li>✓ Size guide available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-border mt-16 pt-16">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b border-border pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">Customer {i + 1}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className={`text-sm ${j < 5 - i ? 'text-accent' : 'text-muted'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">2 weeks ago</span>
                </div>
                <p className="text-muted-foreground">
                  {i === 0
                    ? 'Excellent quality! The fabric is premium and the fit is perfect.'
                    : i === 1
                      ? 'Very happy with my purchase. Fast shipping and great customer service.'
                      : 'Love this piece! It&apos;s exactly as described and even better in person.'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border mt-16 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link href={`/shop?category=${product.category}`}>
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
