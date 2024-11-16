import { Heart } from "lucide-react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

function DetailsModal({ closeShowDetails, showDetails, book }) {
  const { state, dispatch } = useContext(StoreContext);

  // Check if the book is already in the cart
  const isInCart = state.cart.some((cartItem) => cartItem.id === book?.id);
  const toggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });
  };
 

  return (
    <div>
      {showDetails && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full">
          <div className="relative w-[700px] p-8 bg-white dark:bg-gray-900 sm:mx-1 rounded-lg shadow-lg border border-gray-300">
            <div className="flex flex-row items-center justify-between">
              {/* Left Side Content */}
              <div className="w-3/4 h-full pl-8">
                {/* Book Title */}
                <h2 className="pt-6 text-3xl font-semibold">{book?.name}</h2>
                {/* Genre */}
                <p className="pt-2 text-sm">{book?.author}</p>
                {/* Book Description */}
                <p className="pt-5 pr-3 text-xs">{book?.description}</p>

                <div className="flex gap-4 pt-6">
                  {/* Add to Cart Button */}
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

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(book.id)} // Toggle favorite on DetailsModal
                    className={`relative p-1.5 border-2 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95 active:rotate-0 active:transition-transform active:duration-200 ${book.isFavorite ? "bg-gradient-to-r from-pink-400 to-red-500 text-white border-red-600 hover:from-red-500 hover:to-pink-600" : "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-600 hover:from-green-500 hover:to-green-700"}`}
                  >
                    {/* Animated background for favorite button */}
                    <div
                      className={`absolute inset-0 transition-all duration-400 ${book.isFavorite ? "bg-gradient-to-r from-pink-300 to-red-400 opacity-50" : "bg-gradient-to-r from-green-300 to-green-600 opacity-40"}`}
                    ></div>
                    {/* Heart icon with animation */}
                    <Heart
                      size={22}
                      fill={book.isFavorite ? "currentColor" : "none"} // Changes icon color based on favorite status
                      className="relative z-10 transition-all duration-300 transform hover:scale-125 active:scale-105 active:rotate-45"
                    />
                  </button>
                  {/* Close Button */}
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
