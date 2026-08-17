'use client';

import { useState, Suspense } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar, { FilterState } from '@/components/FilterSidebar';

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    rating: null,
  });

  // Filter and sort products
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(product.category);

    const matchesPrice =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

    const matchesRating = !filters.rating || product.rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    // Reverse order as newer items are at the end of the array
    filteredProducts = filteredProducts.reverse();
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-2">Shop</h1>
        <p className="text-muted-foreground">
          Discover our collection of premium fashion pieces
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar onFilterChange={setFilters} />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* Drawer */}
              <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-lg max-h-[85vh] overflow-y-auto">
                <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6">
                  <FilterSidebar onFilterChange={(newFilters) => {
                    setFilters(newFilters);
                    setIsFilterOpen(false);
                  }} />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2 flex-col sm:flex-row">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden gap-2"
                  >
                    <Filter size={18} />
                    Filters
                  </Button>

                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(filters.categories.length > 0 || filters.rating) && (
                <div className="flex flex-wrap gap-2">
                  {filters.categories.map((cat) => (
                    <div
                      key={cat}
                      className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {cat}
                      <button
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            categories: prev.categories.filter((c) => c !== cat),
                          }))
                        }
                        className="hover:text-accent"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {filters.rating && (
                    <div className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {filters.rating}+ Rating
                      <button
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            rating: null,
                          }))
                        }
                        className="hover:text-accent"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} products
            </p>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-semibold mb-2">No products found</p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      categories: [],
                      priceRange: [0, 500],
                      rating: null,
                    });
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
