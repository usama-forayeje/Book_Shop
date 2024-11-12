import { Flame, FolderPlus, Heart, LibraryBig, Rocket, Search } from 'lucide-react'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';


function LeftSideber({isLeftSidebarOpen ,handleClick, }) {
  const { dispatch } = useContext(StoreContext);

  
  return (
   
        <div
            className={`fixed lg:static z-10 lg:z-auto transition-transform transform ${
              isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 w-64 lg:w-1/5 h-full bg-[#171923] border-r border-gray-700 p-6`}
          >
            <ul className="flex flex-col space-y-3">
              <li className="text-gray-400 duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black">
                <div
                  onClick={handleClick}
                  className="flex gap-1 px-3 py-1 rounded"
                >
                  <Search />
                  <p>Quick search...</p>
                </div>
              </li>
              <li onClick={() => dispatch({ type: "FILTER_BY_ALL" })} className="text-gray-400 duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black">
                <div className="flex items-center gap-1 px-3 py-1 rounded">
                <LibraryBig  />
                  <p>All Books</p>
                </div>
              </li>
              <li onClick={() => dispatch({ type: "FILTER_BY_TRENDING" })}  className="text-gray-400 duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black">
                <div className="flex items-center gap-1 px-3 py-1 rounded">
                  <Flame />
                  <p>Trending</p>
                </div>
              </li>
              <li  onClick={() => dispatch({ type: "FILTER_BY_NEW_RELEASES" })} className="text-gray-400 duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black">
                <div className="flex items-center gap-1 px-3 py-1 rounded">
                  <FolderPlus />
                  <p>New Releases</p>
                </div>
              </li>
              
              <li onClick={() => dispatch({ type: "FILTER_BY_FAVORITES" })} className="text-gray-400 duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black">
  <div className="flex items-center gap-1 px-3 py-1 rounded">
    <Heart />
    <p>Favorites</p>
  </div>
</li>
            </ul>
          </div>
    
  )
}

export default LeftSideber