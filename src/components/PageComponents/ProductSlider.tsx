// components/ProductSlider.tsx
'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import { productProps as ProductProps} from "@/app/props/productProps";
import Link from 'next/link';

interface ProductSliderProps {
  products: ProductProps[];
  title: string;
  autoPlay?: boolean;
  speed?: number;
}

export default function ProductSlider({ 
  products, 
  title, 
  autoPlay = true,
  speed = 1 
}: ProductSliderProps) {
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(!autoPlay);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const positionRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const startAnimation = useCallback(() => {
    if (!sliderRef.current || !containerRef.current || products.length <= 1) return;

    const slider = sliderRef.current;
    const container = containerRef.current;
    
    // Reset position if needed
    if (positionRef.current <= -slider.scrollWidth / 2) {
      positionRef.current = 0;
    }

    const animate = () => {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      positionRef.current -= speed;
      
      const sliderWidth = slider.scrollWidth / 2; // Since we duplicate items
      const containerWidth = container.clientWidth;

      // Reset to start when we've scrolled through all duplicate items
      if (Math.abs(positionRef.current) >= sliderWidth) {
        positionRef.current = 0;
      }

      slider.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, speed, products.length]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setIsPaused(false);
    } else if (touchEnd - touchStart > 50) {
      // Swipe right
      setIsPaused(false);
    }
    // Small delay to ensure smooth transition back to auto-play
    setTimeout(() => {
      if (autoPlay) setIsPaused(false);
    }, 1000);
  };

  // Handle mouse interactions
  const handleMouseEnter = () => {
    if (autoPlay) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsPaused(false);
    }
  };

  // Initialize and cleanup animation
  useEffect(() => {
    if (products.length > 1 && autoPlay && !loading) {
      startAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [products, autoPlay, loading, startAnimation, stopAnimation]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Reset position on resize for better responsiveness
      positionRef.current = 0;
      if (sliderRef.current) {
        sliderRef.current.style.transform = 'translateX(0px)';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pause animation when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else if (autoPlay) {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [autoPlay]);

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className="flex space-x-4 overflow-hidden">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item} 
              className="flex-shrink-0 w-64 bg-gray-200 rounded-lg h-80 animate-pulse" 
            />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  // For single product, don't animate, just show the product
  if (products.length === 1) {
    const product = products[0];
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className="flex justify-center">
          <Link
            href={`/products/${product._id}`}
            className="w-64 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
          >
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover object-center hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-900 truncate">
                {product.name}
              </h4>
              <p className="text-gray-600 text-sm mt-1 capitalize">
                {product.type}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              {product.size && product.size.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    Sizes: {product.size.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
      
      <div 
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={sliderRef}
          className="flex space-x-6 will-change-transform"
          style={{ 
            width: 'max-content',
            transition: isPaused ? 'transform 0.3s ease' : 'none'
          }}
        >
          {/* Original products */}
          {products.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-64"
            >
              <Link
                href={`/products/${product._id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover object-center hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1 capitalize">
                    {product.type}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  {product.size && product.size.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Sizes: {product.size.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
          
          {/* Duplicate items for seamless loop */}
          {products.map((product) => (
            <div
              key={`duplicate-${product._id}`}
              className="flex-shrink-0 w-64"
            >
              <Link
                href={`/products/${product._id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover object-center hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1 capitalize">
                    {product.type}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  {product.size && product.size.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Sizes: {product.size.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Gradient fade effects on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}