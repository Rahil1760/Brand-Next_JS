"use client";
import { Toggle } from "@/components/ui/toggle";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "../Dialouge_Box/Modal";
const Navbar = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navMenu = [
    { name: "", href: "/" },
    { name: "", href: "/about" },
    { name: "", href: "/contact" },
  ];

  const cartQuantity = 3; // You can replace this with your actual cart state
  const handleCart = () => {
    const signInUser = localStorage.getItem("signInUser");
    if (!signInUser) {
      setIsModalOpen(true);
    } else {
      router.push("/cart");
    }
  };
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b w-full">
      {/* Logo on left */}
      {/* <div className="flex-shrink-0 rounded-full">
        <img 
          src="/brandLogo.jpeg" // Replace with your actual logo path
          alt="Logo" 
          className="h-8 w-auto rounded-full" 
        />
      </div> */}

      {/* Menu in center */}
      <div className="flex-1 flex justify-center">
        <ul className="flex space-x-4">
          {navMenu.map((item, index) => (
            <Toggle key={index}>
              <li className="cursor-pointer hover:underline underline-offset-4 text-sm px-4">
                {item.name || ""}
              </li>
            </Toggle>
          ))}
        </ul>
      </div>

      <div className="flex-shrink-0 relative">
        <button
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handleCart}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleCart();
          }}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartQuantity}
            </span>
          )}
        </button>
      </div>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Navbar;
