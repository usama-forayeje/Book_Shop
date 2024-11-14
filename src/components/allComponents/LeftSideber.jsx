import {
  Flame,
  FolderPlus,
  Heart,
  LibraryBig,
  Rocket,
  Search,
} from "lucide-react"; // Importing icon components from lucide-react
import { useContext } from "react"; // Using React's useContext hook
import { StoreContext } from "../../context/StoreContext"; // Importing StoreContext for global state management

function LeftSidebar({ isLeftSidebarOpen, handleClick }) {
  // Accessing the dispatch function from the global context
  const { dispatch } = useContext(StoreContext);

  return (
    <div
      className={`fixed lg:static z-10 lg:z-auto transition-transform transform ${
        isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 bg-white dark:bg-slate-900 w-64 h-full lg:w-1/5 md:h-full border-r border-gray-700 p-6`}
    >
      {/* Sidebar list */}
      <ul className="flex flex-col space-y-3 ">
        {/* Search option */}
        <li className="dark:text-gray-400 text-[#3C3C43] duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black">
          <div onClick={handleClick} className="flex gap-1 px-3 py-1 rounded">
            <Search /> {/* Search icon */}
            <p>Search...</p>
          </div>
        </li>

        {/* All Books filter */}
        <li
          onClick={() => dispatch({ type: "FILTER_BY_ALL" })} // Dispatch action for "All Books" filter
          className="dark:text-gray-400 text-[#3C3C43] duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <div className="flex items-center gap-1 px-3 py-1 rounded">
            <LibraryBig /> {/* All Books icon */}
            <p>All Books</p>
          </div>
        </li>

        {/* Trending filter */}
        <li
          onClick={() => dispatch({ type: "FILTER_BY_TRENDING" })} // Dispatch action for "Trending" filter
          className="dark:text-gray-400 text-[#3C3C43] duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <div className="flex items-center gap-1 px-3 py-1 rounded">
            <Flame /> {/* Trending icon */}
            <p>Trending</p>
          </div>
        </li>

        {/* New Releases filter */}
        <li
          onClick={() => dispatch({ type: "FILTER_BY_NEW_RELEASES" })} // Dispatch action for "New Releases" filter
          className="dark:text-gray-400 text-[#3C3C43] duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <div className="flex items-center gap-1 px-3 py-1 rounded">
            <FolderPlus /> {/* New Releases icon */}
            <p>New Releases</p>
          </div>
        </li>

        {/* Favorites filter */}
        <li
          onClick={() => dispatch({ type: "FILTER_BY_FAVORITES" })} // Dispatch action for "Favorites" filter
          className="dark:text-gray-400 text-[#3C3C43] duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <div className="flex items-center gap-1 px-3 py-1 rounded">
            <Heart /> {/* Favorites icon */}
            <p>Favorites</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
