import { ChevronRight } from "lucide-react";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";

function RightSideber({ isRightSidebarOpen }) {
  const { dispatch } = useContext(StoreContext);
  return (
    <div
      className={`fixed right-0 lg:static z-10 lg:z-auto transition-transform transform ${
        isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
      } lg:translate-x-0 w-80 lg:w-1/5 h-2/5 bg-[#171923] border-l border-gray-700 p-6`}
    >
      <h3 className="mb-4 text-lg font-semibold">Filter On Page</h3>
      <ul className="space-y-1">
        <li
          onClick={() => dispatch({ type: "FILTER_BY_NAME" })}
          className="flex gap-1 py-1 text-gray-400 duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <ChevronRight /> By name
        </li>
        <li
          onClick={() => dispatch({ type: "FILTER_BY_RATING" })}
          className="flex gap-1 py-1 text-gray-400 duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <ChevronRight /> By rating
        </li>
        <li
          onClick={() => dispatch({ type: "FILTER_BY_PRICE" })}
          className="flex gap-1 py-1 text-gray-400 duration-300 rounded cursor-pointer hover:bg-primaryGreen hover:text-black"
        >
          <ChevronRight /> By price
        </li>
      </ul>
    </div>
  );
}

export default RightSideber;
