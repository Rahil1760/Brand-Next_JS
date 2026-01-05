// components/ui/app-sidebar.tsx
'use client';

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useProducts } from '../../../src/app/context/productContext';

export function AppSidebar() {
  const { products, filters, updateFilters, clearFilters } = useProducts();

  // Get unique categories from all products
  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    updateFilters({ categories: newCategories });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    updateFilters({ priceRange: [min, max] });
  };

  const handleSearchChange = (query: string) => {
    updateFilters({ searchQuery: query });
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        {/* Search Filter */}
        <SidebarGroup>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 border rounded text-sm"
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Category Filter */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map(category => (
                <SidebarMenuItem key={category}>
                  <label className="flex items-center space-x-2 cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="rounded"
                    />
                    <span className="capitalize text-sm">{category}</span>
                  </label>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Price Range Filter */}
        <SidebarGroup>
          <SidebarGroupLabel>Price Range</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full p-2 border rounded text-sm"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange[1])}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full p-2 border rounded text-sm"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number(e.target.value))}
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Clear Filters */}
        <SidebarGroup>
          <SidebarGroupContent>
            <button
              onClick={clearFilters}
              className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition-colors text-sm"
            >
              Clear Filters
            </button>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Results Count */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="text-sm text-gray-600 text-center">
              Showing {useProducts().filteredProducts.length} of {products.length} products
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}