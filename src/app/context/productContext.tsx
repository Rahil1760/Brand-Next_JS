// context/ProductsContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  size: string[];
  // Add other product fields from your API
}

interface ProductsContextType {
  products: Product[];
  filteredProducts: Product[];
  filters: {
    categories: string[];
    priceRange: [number, number];
    searchQuery: string;
  };
  updateFilters: (newFilters: Partial<ProductsContextType['filters']>) => void;
  clearFilters: () => void;
  loading: boolean;
  refetchProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const initialFilters = {
  categories: [] as string[],
  priceRange: [0, 1000] as [number, number],
  searchQuery: "",
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState(initialFilters);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    
    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Search query filter
    if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      filteredProducts,
      filters,
      updateFilters,
      clearFilters,
      loading,
      refetchProducts: fetchProducts,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}