import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Search, X } from "lucide-react";

// eslint-disable-next-line react/prop-types
function SearchModal({ isDialogOpen, closeDialog }) {

  const { state, dispatch } = useContext(StoreContext);

  const filteredBooks = state.books.filter(book =>
    book.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <div>
      {isDialogOpen && (
        <div className="fixed  inset-0 z-50 flex items-center justify-center centerbg-black/80  data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
          <div
            className="fixed  inset-0 z-50  w-[100vw] h-[100vh] max-w-4xl max-h-[80vh]    border-gray-700 border bg-black p-6 shadow-lg duration-300 data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up sm:rounded-lg
        top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="sticky top-0 w-full bg-black h-1/3">
              <div className="pb-2 border-b border-gray-700">
                <div className="flex items-center gap-1 px-3 py-1 rounded">
                  <Search size={30} className="text-gray-300" />
                  <input
                    type="text"
                    onChange={e => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
                    placeholder="Type your favorite book name here ..."
                    className="flex-grow ml-2 text-white placeholder-gray-400 bg-transparent outline-none placeholder:text-sm"
                  />
                  <X
                    size={30}
                    strokeWidth={1.5}
                    onClick={closeDialog}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-center text-gray-400">No item found</p>
              </div>
            </div>

            <div className="overflow-auto scrollbar-hide h-2/3">
              {filteredBooks.map((book, idx) => (
                <div
                  key={idx}
                  className="flex gap-5 px-2 py-3 rounded-md hover:text-black hover:bg-primaryGreen"
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
