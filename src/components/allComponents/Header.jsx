import { Bell, ChevronRight, PanelLeftOpen, ShoppingBag, Sun } from "lucide-react"
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
function Header({toggleLeftSidebar , toggleRightSidebar,toggleTable}) {
  const { state } = useContext(StoreContext); 
    // কার্টের আইটেমের সংখ্যা বের করুন
    const cartItemCount = state.cart.length;
  return (
    <div>
        <header className="border-b border-gray-700">
          <div className="flex items-center justify-between h-16 mx-2 lg:h-28 lg:mr-28 lg:ml-7">
            <h1 className="text-xl font-semibold text-primaryGreen lg:text-2xl">
              Forayaje Book Shop
            </h1>
            <div className="flex gap-3">
              <Bell
                size={34}
                className="p-2 border rounded cursor-pointer border-primaryGreen bg-secondaryGreen text-primaryGreen fill-primaryGreen"
                strokeWidth={2.25}
              />
              <Sun
                size={34}
                className="p-2 border rounded cursor-pointer border-primaryGreen bg-secondaryGreen text-primaryGreen fill-primaryGreen"
                strokeWidth={2.25}
              />
              <div className="relative cursor-pointer">
              {cartItemCount > 0 && (
                <small className="absolute flex items-center justify-center w-5 h-5 font-mono text-sm text-center rounded-full bg-rose-400 -top-3 left-6">
                  {cartItemCount}
                </small>
              )}
              <ShoppingBag
                size={34}
                className="p-2 border rounded cursor-pointer border-primaryGreen bg-secondaryGreen text-primaryGreen"
                strokeWidth={2.25}
                onClick={toggleTable}
              />
              </div>
            </div>
          </div>
          {/* Toggle Buttons for Sidebars on smaller screens */}
          <div className="flex items-center justify-between px-1 py-1">
            <div
              onClick={toggleLeftSidebar}
              className="flex items-center gap-1 cursor-pointer lg:hidden"
            >
              <PanelLeftOpen className="text-gray-400" size={18} />
              <p className="text-xs text-gray-400">Menu</p>
            </div>
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
  )
}

export default Header