// app/products/[id]/page.tsx
"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import CustomLoader from "../../../components/loader/CustomLoader";
import ProductSlider from "../../../components/PageComponents/ProductSlider";
import { IndianRupee } from "lucide-react";
import { Modal } from "@/components/Dialouge_Box/Modal";
export interface ProductProps {
  _id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  size: Array<string>;
  color: string;
  image: string;
  inStock: boolean;
}

interface ProductResponse {
  product: ProductProps;
  relatedProducts: ProductProps[];
}

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const signInUser = localStorage.getItem("signInUser");
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data: ProductResponse = await response.json();
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts || []);

      if (data.product.size.length > 0) {
        setSelectedSize(data.product.size[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && product?.size.length) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
    console.log("Added to cart:", {
      product: product?.name,
      size: selectedSize,
      quantity,
      price: product?.price,
    });
    if (!signInUser) {
      setIsModalOpen(true);
      return;
    }
    alert("Product added to cart!");
  };

  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchProduct}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600">
            Product not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <a href="/" className="text-gray-400 hover:text-gray-500">
                Products
              </a>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-600">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none">
              <div className="grid grid-cols-1 gap-2">
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900 flex items-center">
                <IndianRupee size={24} />
                {product.price}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className="text-gray-900 h-5 w-5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="sr-only">4 out of 5 stars</p>
                <a
                  href="#reviews"
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  117 reviews
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>
                  This is a premium {product.type} from the {product.category}{" "}
                  category. Made with high-quality materials and designed for
                  comfort and style.
                </p>
              </div>
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-600">Color</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none">
                    <span className="absolute inset-0 rounded-full border-2 border-gray-300" />
                    <span
                      className="h-8 w-8 rounded-full border border-black border-opacity-10"
                      style={{ backgroundColor: product.color }}
                    />
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {product.color}
                  </span>
                </div>
              </div>

              {/* Sizes */}
              {product.size.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-gray-600">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {product.size.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 ${
                          selectedSize === size
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6">
                <h3 className="text-sm text-gray-600">Quantity</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border border-gray-300 rounded-md p-2 hover:bg-gray-50"
                  >
                    <span className="sr-only">Decrease quantity</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border border-gray-300 rounded-md p-2 hover:bg-gray-50"
                  >
                    <span className="sr-only">Increase quantity</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <div className="mt-10 flex">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`max-w-xs flex-1 ${
                    product.inStock
                      ? "bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      : "bg-gray-300 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Add to cart" : "Out of stock"}
                </button>

                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            {/* Product details */}
            <section className="mt-12">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  Product ID: {product._id}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-600">Type: {product.type}</p>
                <p className="text-sm text-gray-600">
                  Availability: {product.inStock ? "In stock" : "Out of stock"}
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Related Products Slider */}
        {relatedProducts.length > 0 && (
          <ProductSlider
            products={relatedProducts}
            title="Related Products"
            autoPlay={true}
            speed={1}
          />
        )}
        {relatedProducts.length > 0 && (
          <ProductSlider
            products={relatedProducts}
            title="Related Products"
            autoPlay={true}
            speed={1}
          />
        )}

        {/* Fallback message if no related products */}
        {relatedProducts.length === 0 && (
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Related Products
            </h3>
            <p className="text-gray-600">
              No related products found at the moment.
            </p>
          </div>
        )}
      </div>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
