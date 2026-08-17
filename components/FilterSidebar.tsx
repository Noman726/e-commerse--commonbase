'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { categories } from '@/lib/products';

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number | null;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'price']);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleFilterChange = () => {
    onFilterChange?.({
      categories: selectedCategories,
      priceRange,
      rating: selectedRating,
    });
  };

  const applyFilters = () => {
    handleFilterChange();
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSelectedRating(null);
    onFilterChange?.({
      categories: [],
      priceRange: [0, 500],
      rating: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-accent hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-4 font-semibold"
        >
          Category
          <ChevronDown
            size={18}
            className={`transition-transform ${
              expandedSections.includes('category') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('category') && (
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                  className="border-border"
                />
                <span className="text-sm group-hover:text-accent transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4 font-semibold"
        >
          Price
          <ChevronDown
            size={18}
            className={`transition-transform ${
              expandedSections.includes('price') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('price') && (
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full cursor-pointer accent-accent"
            />
            <div className="flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-4 font-semibold"
        >
          Rating
          <ChevronDown
            size={18}
            className={`transition-transform ${
              expandedSections.includes('rating') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('rating') && (
          <div className="space-y-3">
            {[5, 4, 3].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedRating === rating}
                  onCheckedChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                  className="border-border"
                />
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < rating ? 'text-accent' : 'text-muted'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">& up</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply Button */}
      <Button
        onClick={applyFilters}
        className="w-full bg-foreground text-background hover:bg-foreground/90"
      >
        Apply Filters
      </Button>
    </div>
  );
}
