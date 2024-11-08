import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Search,
  ShoppingBag,
  Sun,
  PanelLeftOpen,
  Flame,
  FolderPlus,
  Rocket,
  Heart,
  Star,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import data from "./data/data";

function App() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleLeftSidebar = () => setLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!isRightSidebarOpen);

  const handleKeyUp = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="bg-[#171923] text-white min-h-screen">
      <div className="container mx-auto px-1">
        <header className="border-b border-gray-700">
          <div className="h-16 lg:h-28 mx-2 lg:mr-28 lg:ml-7 flex justify-between items-center">
            <h1 className="text-primaryGreen font-semibold text-xl lg:text-2xl">
              Forayaje Book Shop
            </h1>
            <div className="flex gap-3">
              <Bell
                size={34}
                className="border-primaryGreen border bg-secondaryGreen cursor-pointer text-primaryGreen p-2 rounded fill-primaryGreen"
                strokeWidth={2.25}
              />
              <Sun
                size={34}
                className="border-primaryGreen border bg-secondaryGreen cursor-pointer text-primaryGreen p-2 rounded fill-primaryGreen"
                strokeWidth={2.25}
              />
              <ShoppingBag
                size={34}
                className="border-primaryGreen border bg-secondaryGreen cursor-pointer text-primaryGreen p-2 rounded"
                strokeWidth={2.25}
              />
            </div>
          </div>
          {/* Toggle Buttons for Sidebars on smaller screens */}
          <div className="flex justify-between items-center px-1 py-1">
            <div
              onClick={toggleLeftSidebar}
              className="lg:hidden cursor-pointer flex items-center gap-1"
            >
              <PanelLeftOpen className="text-gray-400" size={18} />
              <p className="text-xs text-gray-400">Menu</p>
            </div>
            <div
              onClick={toggleRightSidebar}
              className="lg:hidden cursor-pointer flex items-center gap-1"
            >
              <p className="text-gray-400 text-xs">On this page</p>
              <ChevronRight size={18} />
            </div>
          </div>
        </header>

        <div className="flex w-full">
          {/* Left Sidebar */}
          <div
            className={`fixed lg:static z-10 lg:z-auto transition-transform transform ${
              isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 w-64 lg:w-1/5 h-full bg-[#171923] border-r border-gray-700 p-6`}
          >
            <ul className="space-y-3 flex flex-col">
              <li className="text-gray-400 hover:bg-primaryGreen hover:text-black duration-300 rounded cursor-pointer">
                <div
                  onClick={handleKeyUp}
                  className="flex items-center gap-1 rounded px-3 py-1"
                >
                  <Search />
                  <p>Quick search...</p>
                </div>
              </li>
              <li className="text-gray-400 hover:bg-primaryGreen hover:text-black duration-300 rounded cursor-pointer">
                <div className="flex items-center gap-1 rounded px-3 py-1">
                  <Flame />
                  <p>Trending</p>
                </div>
              </li>
              <li className="text-gray-400 hover:bg-primaryGreen hover:text-black duration-300 rounded cursor-pointer">
                <div className="flex items-center gap-1 rounded px-3 py-1">
                  <FolderPlus />
                  <p>New Releases</p>
                </div>
              </li>
              <li className="text-gray-400 hover:bg-primaryGreen hover:text-black duration-300 rounded cursor-pointer">
                <div className="flex items-center gap-1 rounded px-3 py-1">
                  <Rocket />
                  <p>Coming Soon</p>
                </div>
              </li>
              <li className="text-gray-400 hover:bg-primaryGreen hover:text-black duration-300 rounded cursor-pointer">
                <div className="flex items-center gap-1 rounded px-3 py-1">
                  <Heart />
                  <p>Favorites</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-gray-700 gap-4 p-4 sm:p-6 lg:p-10">
            {data.map((book, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg shadow-md hover:shadow-lg border border-gray-700 transition-shadow duration-300"
              >
                <img
                  src={`/images/${book.image}`}
                  alt={book.name}
                  className="w-full h-72 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold">{book.name}</h3>
                <p className="text-gray-400">{book.author}</p>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      strokeWidth={1.25}
                      size={15}
                      className={`${
                        i < book.rating
                          ? "text-primaryGreen fill-primaryGreen"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>

                {/* Price and Add to Cart */}
                <div className="flex justify-between items-center mt-4">
                  <button className="flex items-center gap-2 bg-primaryGreen text-white px-2 py-1.5 rounded hover:bg-green-500 transition-colors duration-200">
                    <p className="font-semibold border-r px-2 border-black text-sm text-black">
                      ${book.price}
                    </p>
                    <span className="text-sm font-semibold text-black">
                      Add to Cart
                    </span>
                  </button>
                  <button className="text-primaryGreen hover:text-green-500 p-1 rounded border-primaryGreen hover:border-green-500 border transition-colors duration-200">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div
            className={`fixed right-0 lg:static z-10 lg:z-auto transition-transform transform ${
              isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
            } lg:translate-x-0 w-80 lg:w-1/5 h-2/5 bg-[#171923] border-l border-gray-700 p-6`}
          >
            <h3 className="text-lg font-semibold mb-4">Filter On Page</h3>
            <ul className="space-y-1">
              <li className="text-gray-400 hover:bg-primaryGreen hover:text-black duration-300 rounded cursor-pointer py-1 flex gap-1">
                <ChevronRight /> By name
              </li>
              <li className="text-gray-400 hover:bg-primaryGreen hover:text-black duration-300 rounded cursor-pointer py-1 flex gap-1">
                <ChevronRight /> By rating
              </li>
              <li className="text-gray-400 hover:bg-primaryGreen hover:text-black duration-300 rounded cursor-pointer py-1 flex gap-1">
                <ChevronRight /> By price
              </li>
            </ul>
          </div>
        </div>
        <footer>
          <p className="text-gray-400 text-sm py-5 text-center border-t border-gray-700 ">
            &copy; 2024 | Usama Forayaje. All rights reserved.
          </p>
        </footer>
        {/* Alert Dialog */}
        {isDialogOpen && (
          <AlertDialog open={isDialogOpen} onOpenChange={closeDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                 <div>
                 <div className="border-b">
                 <div
                    onClick={handleKeyUp}
                    className="flex items-center gap-1 rounded px-3 py-1"
                  >
                    <Search className="text-gray-300"/>
                    <input
                      onClick={handleKeyUp}
                      type="text"
                      placeholder="Type your favorite book name here ..."
                      className="outline-none bg-transparent ml-2 flex-grow text-white placeholder:text-sm placeholder-gray-400"
                    />
                    
                  </div>
                  
                 </div>
                 </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                <div className="flex justify-center items-center py-4">
                    <p>No item found</p>
                  </div>
                  <div>
                    
                  {data.map((book, idx) => (
                    <div key={idx}>
                      <img
                  src={`/images/${book.image}`}
                  alt={book.name}
                  className=" object-cover w-20 h-28 rounded mb-1"
                />
                <div>

                </div>
                    </div>
                  ))}

                    
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={closeDialog}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}

export default App;
