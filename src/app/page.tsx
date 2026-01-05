//import HomeContent from "@/components/PageComponents/Main";
'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import { 
  Shirt, 
  ShirtIcon,
  Users, 
  TrendingUp, 
  Star,
  Truck,
  Shield
} from 'lucide-react';

// Define the interface
interface CategoryProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  items: string;
}

export default function Home() {
  const router = useRouter();
  
  // Use the interface in your categories array
  const categories: CategoryProps[] = [
    {
      name: 'Shirt',
      icon: <Shirt size={48} className="text-blue-600" />,
      description: 'Formal and casual shirts for every occasion',
      items: '200+ products'
    },
    {
      name: 'T-Shirt',
      icon: <ShirtIcon size={48} className="text-green-600" />,
      description: 'Comfortable cotton t-shirts in various styles',
      items: '350+ products'
    },
    {
      name: 'Pant',
      icon: <Users size={48} className="text-purple-600" />,
      description: 'Jeans, formal pants, and casual trousers',
      items: '180+ products'
    },
    {
      name: 'TrackPants',
      icon: <TrendingUp size={48} className="text-orange-600" />,
      description: 'Comfortable athletic and casual track pants',
      items: '120+ products'
    },
    {
      name: 'Hoddies',
      icon: <ShirtIcon size={48} className="text-red-600" />,
      description: 'Warm and stylish hoodies for cool days',
      items: '90+ products'
    },
    {
      name: 'OverSize T-Shirt',
      icon: <Star size={48} className="text-pink-600" />,
      description: 'Trendy oversized t-shirts for street style',
      items: '75+ products'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:mt-6">
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our wide range of clothing categories to find your perfect style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group cursor-pointer"
                onClick={() => router.push(`category/${category.name}`)} // Fixed: use category.name instead of categories.name
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 bg-gray-50 rounded-full group-hover:bg-blue-50 transition duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {category.description}
                  </p>
                  <span className="text-sm text-blue-600 font-medium">
                    {category.items}
                  </span>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center">
                    Explore
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Truck size={48} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield size={48} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Star size={48} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">30-day money back guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// import React from 'react';
// import { 
//   Shirt, 
//   ShirtIcon, // Using ShirtIcon as alternative for some items
//   Users, 
//   TrendingUp, 
//   Star,
//   Truck,
//   Shield
// } from 'lucide-react';

// export default function Home() {
//   // Category array with icons
//   const categories = [
//     {
//       name: 'Shirt',
//       icon: <Shirt size={48} className="text-blue-600" />,
//       description: 'Formal and casual shirts for every occasion',
//       items: '200+ products'
//     },
//     {
//       name: 'T-Shirt',
//       icon: <ShirtIcon size={48} className="text-green-600" />,
//       description: 'Comfortable cotton t-shirts in various styles',
//       items: '350+ products'
//     },
//     {
//       name: 'Pant',
//       icon: <Users size={48} className="text-purple-600" />, // Alternative icon
//       description: 'Jeans, formal pants, and casual trousers',
//       items: '180+ products'
//     },
//     {
//       name: 'TrackPants',
//       icon: <TrendingUp size={48} className="text-orange-600" />, // Alternative icon
//       description: 'Comfortable athletic and casual track pants',
//       items: '120+ products'
//     },
//     {
//       name: 'Hoddies',
//       icon: <ShirtIcon size={48} className="text-red-600" />, // Using ShirtIcon as alternative
//       description: 'Warm and stylish hoodies for cool days',
//       items: '90+ products'
//     },
//     {
//       name: 'OverSize T-Shirt',
//       icon: <Star size={48} className="text-pink-600" />, // Alternative icon
//       description: 'Trendy oversized t-shirts for street style',
//       items: '75+ products'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-gray-900">FashionStore</h1>
//             <nav className="flex space-x-8">
//               <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
//               <a href="#" className="text-gray-700 hover:text-gray-900">Shop</a>
//               <a href="#" className="text-gray-700 hover:text-gray-900">Categories</a>
//               <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl md:text-6xl font-bold mb-4">
//             Summer Collection 2024
//           </h2>
//           <p className="text-xl mb-8 opacity-90">
//             Discover the latest trends in fashion with our exclusive collection
//           </p>
//           <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
//             Shop Now
//           </button>
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Shop by Category
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               Explore our wide range of clothing categories to find your perfect style
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {categories.map((category, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group cursor-pointer"
//               >
//                 <div className="flex flex-col items-center text-center">
//                   <div className="mb-4 p-4 bg-gray-50 rounded-full group-hover:bg-blue-50 transition duration-300">
//                     {category.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     {category.name}
//                   </h3>
//                   <p className="text-gray-600 mb-3">
//                     {category.description}
//                   </p>
//                   <span className="text-sm text-blue-600 font-medium">
//                     {category.items}
//                   </span>
//                   <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center">
//                     Explore
//                     <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="flex justify-center mb-4">
//                 <Truck size={48} className="text-green-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
//               <p className="text-gray-600">Free delivery on orders over $50</p>
//             </div>
//             <div className="text-center">
//               <div className="flex justify-center mb-4">
//                 <Shield size={48} className="text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
//               <p className="text-gray-600">100% secure payment processing</p>
//             </div>
//             <div className="text-center">
//               <div className="flex justify-center mb-4">
//                 <Star size={48} className="text-yellow-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
//               <p className="text-gray-600">30-day money back guarantee</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">FashionStore</h3>
//               <p className="text-gray-400">
//                 Your one-stop destination for trendy and comfortable clothing.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Categories</h4>
//               <ul className="space-y-2 text-gray-400">
//                 {categories.map((category, index) => (
//                   <li key={index}>
//                     <a href="#" className="hover:text-white transition duration-300">
//                       {category.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Customer Service</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition duration-300">Contact Us</a></li>
//                 <li><a href="#" className="hover:text-white transition duration-300">Shipping Info</a></li>
//                 <li><a href="#" className="hover:text-white transition duration-300">Returns</a></li>
//                 <li><a href="#" className="hover:text-white transition duration-300">Size Guide</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Newsletter</h4>
//               <p className="text-gray-400 mb-4">Subscribe for updates and offers</p>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="px-4 py-2 rounded-l-lg text-gray-900 flex-1"
//                 />
//                 <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 FashionStore. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

//export default LandingPage;