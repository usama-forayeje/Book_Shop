import { useContext } from "react"; // Importing useContext hook to access global state
import { StoreContext } from "../../context/StoreContext"; // Importing StoreContext
import { Search, X } from "lucide-react"; // Importing icons from lucide-react

// eslint-disable-next-line react/prop-types
function SearchModal({ isDialogOpen, closeDialog, openShowDetails }) {
  const { state, dispatch } = useContext(StoreContext); // Accessing state and dispatch from StoreContext

  // Filtering books based on search query
  const filteredBooks = state.books.filter((book) =>
    book.name.toLowerCase().includes(state.searchQuery.toLowerCase()) // Filtering based on book name
  );

  const handleBookClick = (book) => {
    openShowDetails(book);  // Opening the details modal when a book is clicked
    closeDialog(); // Closing the search dialog
  };

  return (
    <div>
      {isDialogOpen && ( // Only render the modal if the dialog is open
        <div className="fixed inset-0 dark:text-gray-400 text-[#3C3C43] z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 z-50 w-full sm:w-[80vw] md:w-[50vw] lg:w-[40vw] h-[100vh] max-h-[80vh] border-gray-700 border bg-white dark:bg-black p-6 shadow-lg sm:rounded-lg
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            {/* Header Section: Search Bar */}
            <div className="sticky top-0 w-full bg-white dark:bg-black">
              <div className="pb-2 border-b border-gray-700">
                <div className="flex items-center gap-1 px-3 py-1 rounded">
                  <Search size={30} className="dark:text-gray-400 text-[#3C3C43]" />
                  <input
                    type="text"
                    value={state.searchQuery} // The search query is controlled by the state
                    onChange={(e) =>
                      dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value }) // Update the search query
                    }
                    placeholder="Type your favorite book name here ..."
                    className="flex-grow ml-2 placeholder-gray-400 bg-transparent outline-none placeholder:text-sm"
                  />
                  {/* Close Icon */}
                  <X
                    size={30}
                    strokeWidth={1.5}
                    onClick={closeDialog} // Close the modal
                    className="cursor-pointer dark:text-gray-400 text-[#3C3C43]"
                  />
                </div>
              </div>

              {/* Display message if no books match the search query */}
              {state.searchQuery && filteredBooks.length === 0 && (
                <div className="mt-6">
                  <p className="text-center dark:text-gray-400 text-[#3C3C43]">No item found</p>
                </div>
              )}
            </div>

            {/* List of filtered books */}
            <div className="overflow-auto h-5/6 scrollbar-hide">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex gap-5 px-2 py-1 my-1 duration-300 bg-gray-100 rounded-md cursor-pointer dark:bg-gray-900 hover:bg-primaryGreen"
                  onClick={() => handleBookClick(book)} // Click to show details
                >
                  <img
                    src={`/images/${book.image}`}
                    alt={book.name}
                    className="object-cover h-20 mb-1 rounded w-14"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{book.name}</h3>
                    <p className="text-lg font-semibold">{book.author}</p>
                    <p className="font-semibold text-md">${book.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchModal;
