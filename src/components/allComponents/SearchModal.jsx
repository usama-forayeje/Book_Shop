import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Search, X } from "lucide-react";

// eslint-disable-next-line react/prop-types
function SearchModal({ isDialogOpen, closeDialog, openShowDetails }) {
  const { state, dispatch } = useContext(StoreContext);

  // সার্চ কোয়েরি অনুসারে ফিল্টার করা বই
  const filteredBooks = state.books.filter((book) =>
    book.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const handleBookClick = (book) => {
    openShowDetails(book);  // DetailsModal ওপেন করা
    closeDialog();// বইটি কার্টে অ্যাড করা
  };

  return (
    <div>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div
            className="fixed inset-0 z-50 w-[100vw] h-[100vh] max-w-4xl max-h-[80vh] border-gray-700 border bg-black p-6 shadow-lg sm:rounded-lg
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="sticky top-0 w-full bg-black">
              <div className="pb-2 border-b border-gray-700">
                <div className="flex items-center gap-1 px-3 py-1 rounded">
                  <Search size={30} className="text-gray-300" />
                  <input
                    type="text"
                    value={state.searchQuery} // ইনপুটের মান যেটি state থেকে আসছে
                    onChange={(e) =>
                      dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value }) // সার্চ কোয়েরি আপডেট করা
                    }
                    placeholder="Type your favorite book name here ..."
                    className="flex-grow ml-2 text-white placeholder-gray-400 bg-transparent outline-none placeholder:text-sm"
                  />
                  <X
                    size={30}
                    strokeWidth={1.5}
                    onClick={closeDialog} // ডায়ালগ বন্ধ করার জন্য
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* সার্চের মাধ্যমে কোন বই না পাওয়া গেলে "No item found" মেসেজ দেখানো */}
              {state.searchQuery && filteredBooks.length === 0 && (
                <div className="mt-4">
                  <p className="text-center text-gray-400">No item found</p>
                </div>
              )}
            </div>

            <div className="overflow-auto scrollbar-hide h-2/3">
              {/* ফিল্টার করা বইগুলো দেখানো */}
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex gap-5 px-2 py-3 rounded-md hover:text-black hover:bg-primaryGreen"
                  onClick={() => handleBookClick(book)} // বইতে ক্লিক করলে হ্যান্ডলার কল হবে
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
