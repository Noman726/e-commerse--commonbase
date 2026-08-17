'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, categories } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  const newArrivals = products.slice(0, 8);
  const trendingProducts = products.slice(8, 16);
  const bestSellers = products.filter((p) => p.reviews > 100).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-br from-foreground to-muted flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-background mb-4 tracking-tight">
            Premium Fashion Essentials
          </h1>
          <p className="text-lg md:text-xl text-background/90 mb-8">
            Curated collections of luxury minimalist clothing for the modern woman
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg">Explore our premium collections</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/shop?category=${category}`}
              className="group"
            >
              <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center hover:bg-muted transition-colors cursor-pointer">
                <span className="text-sm md:text-base font-semibold text-center group-hover:text-accent transition-colors px-2">
                  {category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh styles just added to our collection</p>
            </div>
            <Link href="/shop?sort=newest">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Customer favorites and most loved pieces</p>
          </div>
          <Link href="/shop?sort=popular">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <ProductGrid products={bestSellers} />
      </section>

      {/* Trending Section */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Now</h2>
              <p className="text-muted-foreground">What everyone is shopping this season</p>
            </div>
            <Link href="/shop?sort=trending">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <ProductGrid products={trendingProducts} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="bg-foreground text-background rounded-lg p-8 md:p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-background/80 mb-6">
              Be the first to know about new collections, exclusive offers, and style tips.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background text-foreground border-border"
                required
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Free Shipping',
                description: 'On orders over $50. Fast and reliable delivery.',
              },
              {
                title: 'Easy Returns',
                description: '30-day return policy. No questions asked.',
              },
              {
                title: 'Quality Guaranteed',
                description: 'Premium materials and expert craftsmanship.',
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
