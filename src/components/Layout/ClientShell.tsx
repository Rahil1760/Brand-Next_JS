"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        <nav className="hidden md:flex justify-center h-10">
          {/* Navbar is rendered by the server RootLayout; keep it here if needed */}
        </nav>

        <SidebarProvider>
          <div className="absolute top-4 md:top-6 left-0 h-full z-50 flex item-center">
            <AppSidebar />
            <SidebarTrigger />
          </div>

          <main className="flex-1 w-full relative z-0 mt-10 md:mt-0">{children}</main>
        </SidebarProvider>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Brand</h3>
              <p className="text-gray-400">Your one-stop destination for trendy and comfortable clothing.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition duration-300">
                    Shirts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition duration-300">
                    T-Shirts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition duration-300">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe for updates and offers</p>
              <div className="flex">
                <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-lg text-gray-900 flex-1" />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FashionStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
