// components/PageComponents/HomeContent.tsx
"use client";
import React from "react";
import { useProducts } from '../../context/productContext';
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation"; 
import CustomLoader from "../../../components/loader/CustomLoader";
import { IndianRupee } from 'lucide-react';
import { useParams } from "next/navigation";
const Page = () => {
  const { filteredProducts, loading, products } = useProducts();
  const router = useRouter(); 
  const params = useParams();
  
  // Get category from params safely
  const category = params.category as string;
  let filterByCategory;
// Safe filtering with null checks
  if(category === "all"){
    filterByCategory = filteredProducts
  }else{
     filterByCategory = category 
  ? filteredProducts.filter((product: any) => {
      // Check both category and type safely
      const productCategory = (product?.category ?? "").toLowerCase();
      const productType = (product?.type ?? "").toLowerCase();
      const targetCategory = category?.toLowerCase();
      return productCategory === targetCategory || productType === targetCategory;
    })
  : filteredProducts;
  }
 // Return all products if no category specified
  if (loading) {
    return <CustomLoader />;
  }

  // Rest of your component remains the same...
  return (
    <div className="min-h-screen bg-white to-black py-8 px-4 sm:px-6 md:mt-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          <p className="text-sm">
            Showing {filterByCategory.length} of {products.length} products
          </p>
        </div>

        {filterByCategory.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No products found matching your filters.</p>
            <Button 
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filterByCategory.map((item) => (
              <div
                key={item._id}
                className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 cursor-pointer"
                onClick={() => router.push(`/products/${item._id}`)}
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4 text-white">
                  <h2 className="font-semibold text-lg truncate">{item.name}</h2>
                  <p className="text-gray-300 text-sm mt-1 capitalize">
                    Category: {item.category}
                  </p>
                  <p className="text-white font-bold mt-2 text-lg flex items-center">
                    <IndianRupee size={17} />{item.price}
                  </p>

                  {/* CTA Button */}
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm transition-colors"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;