import { Heart } from "lucide-react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

function DetailsModal({ closeShowDetails, showDetails, book, }) {
  const { state, dispatch } = useContext(StoreContext);

  // Check if the book is already in the cart
  const isInCart = state.cart.some((cartItem) => cartItem.id === book?.id);

  const toggleLike = (id) => {
    const updatedBooks = state.books.map((book) =>
      book?.id === id ? { ...book, liked: !book.liked } : book
    );
    dispatch({ type: "SET_BOOKS", payload: updatedBooks }); // Update books with new liked status
  };

  return (
    <div>
      {showDetails && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative w-[700px] p-8 bg-gray-900 rounded-lg shadow-lg">
            <div className="flex flex-row items-center justify-between">
              {/* Left Side Content */}
              <div className="w-3/4 h-full pl-8">
                <h2 className="pt-6 text-3xl font-semibold text-white">
                  {book?.name}
                </h2>
                <p className="pt-2 text-sm text-gray-400">Comedy/Drama</p>
                <p className="pt-5 pr-3 text-xs text-gray-300">
                  {book?.description}
                </p>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() =>
                      dispatch({ type: "ADD_TO_CART", payload: book })
                    }
                    disabled={isInCart}
                    className={`flex items-center gap-2 ${
                      isInCart
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primaryGreen hover:bg-green-500"
                    } text-white px-2.5 py-1.5 rounded transition-colors duration-200`}
                  >
                    <p className="px-2 font-serif text-sm text-black border-r border-black">
                      ${book?.price}
                    </p>
                    <span className="font-serif text-sm text-black">
                      {isInCart ? "Added" : "Add to Cart"}
                    </span>
                  </button>

                  <button
                    onClick={() => toggleLike(book.id)} // Toggle like on DetailsModal as well
                    className={`p-1 border rounded ${
                      book?.liked ? "text-red-500" : "text-primaryGreen"
                    } hover:${book?.liked ? "text-red-600" : "text-green-500"}`}
                  >
                    <Heart
                      size={20}
                      fill={book?.liked ? "currentColor" : "none"}
                      className={`${book?.liked ? "animate-pop" : ""}`}
                    />
                  </button>

                  <button
                    onClick={closeShowDetails}
                    className="px-3 py-1 font-serif text-sm text-black transition-colors duration-200 bg-white border rounded"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="w-1/4 h-full">
                <img
                  className="object-cover w-full h-auto rounded-lg"
                  src={`/images/${book.image}`}
                  alt={book?.name}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsModal;
