import { ChevronRight } from "lucide-react";
import { StoreContext } from "../../context/StoreContext"; 
import { useContext } from "react";

function RightSidebar({ isRightSidebarOpen }) {
  const { dispatch } = useContext(StoreContext); 

  return (
    <div
      className={`fixed right-0 lg:static z-10 lg:z-auto transition-transform transform ${
        isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
      } lg:translate-x-0 w-80 lg:w-1/5 h-full bg-white dark:bg-slate-900 border-l border-gray-700 p-6`}
    >
      {/* Sidebar heading */}
      <h3 className="mb-4 text-lg font-semibold">Filter On Page</h3>

      {/* List of filter options */}
      <ul className="space-y-1">
        {/* Filter by Name */}
        <li
          onClick={() => dispatch({ type: "FILTER_BY_NAME" })}
          className="flex gap-1 py-1 dark:text-gray-400 text-[#3C3C43] duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <ChevronRight /> By name
        </li>

        {/* Filter by Rating */}
        <li
          onClick={() => dispatch({ type: "FILTER_BY_RATING" })}
          className="flex gap-1 py-1 dark:text-gray-400 text-[#3C3C43] duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <ChevronRight /> By rating
        </li>

        {/* Filter by Price */}
        <li
          onClick={() => dispatch({ type: "FILTER_BY_PRICE" })}
          className="flex gap-1 py-1 dark:text-gray-400 text-[#3C3C43] duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <ChevronRight /> By price
        </li>
      </ul>
    </div>
  );
}

export default RightSidebar;
