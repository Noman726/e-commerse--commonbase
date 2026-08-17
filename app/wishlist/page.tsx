"use client";

import Link from 'next/link';
import { Heart } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const wishlistIds = [1, 5, 9];
  const wishlistItems = products.filter((p) => wishlistIds.includes(Number(p.id)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={28} />
        <h1 className="text-2xl font-bold">My Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="border border-border rounded-lg p-6 text-center">
          <p className="mb-4 text-muted-foreground">Your wishlist is empty.</p>
          <Link href="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">Items you saved for later</p>
            <Link href="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>

          <ProductGrid products={wishlistItems} />
        </div>
      )}
    </div>
  );
}
