import {
  Bell, 
  ChevronRight,
  Moon,
  PanelLeftOpen, 
  ShoppingBag, 
  Sun,
} from "lucide-react"; 
import { StoreContext } from "../../context/StoreContext"; 
import { useContext } from "react"; 
import { motion } from "framer-motion"; 
import { BookOpen } from "lucide-react";

function Header({
  toggleLeftSidebar,
  toggleRightSidebar,
  toggleTable, 
  isDarkMode, 
  toggleDarkMode, 
}) {
  // Accessing the global state using StoreContext to get cart items
  const { state } = useContext(StoreContext);

  // Calculate the number of items in the cart
  const cartItemCount = state.cart.length;

  return (
    <div>
      <header className="border-b border-gray-700">
        <div className="flex items-center justify-between h-16 mx-2 lg:h-28 lg:mr-28 lg:ml-7">
          {/* Book Shop Title Section */}
          <div className="relative flex items-center justify-center">
            {/* Floating Book Icons (Animated) */}
            <div className="relative flex items-center justify-center my-10">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${
                    i < 3 ? "text-green-400" : "text-yellow-400"
                  }`} // Upper icons green, lower yellow
                  initial={{
                    x: (i % 2 === 0 ? -1 : 1) * (40 + i * 10), // Initial horizontal position
                    y: (i < 3 ? -1 : 1) * (20 + i * 5), // Initial vertical position
                    scale: 0.6,
                    opacity: 0.85,
                  }}
                  animate={{
                    x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 5)], // Animate X position
                    y: [0, (i < 3 ? -1 : 1) * (8 + i * 4)], // Animate Y position
                    rotate: [0, 15, 0], // Rotate animation
                    scale: [1, 1.1, 1], // Scale animation
                    opacity: [0.85, 1, 0.85], // Opacity animation
                  }}
                  transition={{
                    duration: 4 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <BookOpen size={22 + i * 2} />
                </motion.div>
              ))}

              {/* Animated Logo Text */}
              <motion.h1
                className="relative text-2xl font-bold tracking-wider text-center font-cinzel text-shadow-lg"
                initial={{
                  textShadow: "2px 2px 12px rgba(0,0,0,0.5)",
                }}
                animate={{
                  color: ["#FFDD57", "#34D399"], // Logo color transition
                  textShadow: [
                    "2px 2px 12px rgba(0,0,0,0.5)",
                    "2px 2px 14px rgba(0,0,0,0.9)",
                    "2px 2px 12px rgba(0,0,0,0.5)",
                  ],
                  scale: [1, 1.02, 1], // Scale effect on logo
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Logo Text with Two-tone Effect */}
                <h1 className="text-xl font-semibold tracking-wide text-white drop-shadow-sm ">
                  <span className="text-primaryGreen">Forayaje</span> <span className="text-yellow-500">Book Shop</span>
                </h1>
              </motion.h1>
            </div>
          </div>

          {/* Right-side Icons (Bell, Dark Mode, Cart) */}
          <div className="flex gap-3">
            {/* Bell icon for notifications */}
            <Bell
              size={34}
              className="p-2 border rounded cursor-pointer border-primaryGreen bg-secondaryGreen text-primaryGreen fill-primaryGreen"
              strokeWidth={2.25}
            />

            {/* Dark mode toggle button */}
            <span
              onClick={toggleDarkMode} // Toggle dark mode on click
              className="relative inline-flex items-center justify-center text-white transition-transform ease-in-out transform border rounded cursor-pointer border-primaryGreen bg-secondaryGreen duration-400 hover:rotate-4 hover:shadow-xl group"
            >
              {/* Toggle between Sun and Moon icons based on dark mode */}
              {isDarkMode ? (
                <Sun
                  size={34}
                  className="p-2 border rounded cursor-pointer border-primaryGreen bg-secondaryGreen text-primaryGreen fill-primaryGreen"
                />
              ) : (
                <Moon
                  size={34}
                  className="p-2 border rounded cursor-pointer border-primaryGreen bg-secondaryGreen text-primaryGreen fill-primaryGreen"
                />
              )}

              {/* Optional glow effect during dark mode switch */}
              <div
                className={`absolute inset-0 rounded transition-all duration-400 ${
                  isDarkMode
                    ? "bg-yellow-300 opacity-40" 
                    : "bg-indigo-300 opacity-30" 
                }`}
              />
            </span>

            {/* Cart icon with item count */}
            <div className="relative cursor-pointer">
              {/* Show cart item count if there are items */}
              {cartItemCount > 0 && (
                <small className="absolute flex items-center justify-center w-5 h-5 font-serif text-sm text-white rounded-full shadow-md bg-rose-400 -top-2 -right-2 animate-bounce">
                  {cartItemCount}
                </small>
              )}
              {/* Shopping bag icon */}
              <ShoppingBag
                size={34}
                className="p-2 border rounded cursor-pointer border-primaryGreen bg-secondaryGreen text-primaryGreen"
                strokeWidth={2.25}
                onClick={toggleTable} // Open cart table on click
              />
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Buttons for smaller screens */}
        <div className="flex items-center justify-between px-1 py-1">
          {/* Left Sidebar Toggle Button */}
          <div
            onClick={toggleLeftSidebar} 
            className="flex items-center gap-1 cursor-pointer lg:hidden"
          >
            <PanelLeftOpen className="text-gray-400" size={18} />
            <p className="z-30 text-xs text-gray-400">Menu</p>
          </div>

          {/* Right Sidebar Toggle Button */}
          <div
            onClick={toggleRightSidebar} 
            className="flex items-center gap-1 cursor-pointer lg:hidden"
          >
            <p className="text-xs text-gray-400">On this page</p>
            <ChevronRight size={18} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
