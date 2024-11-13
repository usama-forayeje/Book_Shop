import { Heart, Star } from "lucide-react"; 
import data from "../../data/data"; 
import { StoreContext } from "../../context/StoreContext"; 
import { useContext, useEffect } from "react"; 

function MainContent({ openShowDetails }) {
  // Accessing the state and dispatch function from the StoreContext
  const { state, dispatch } = useContext(StoreContext);

  // This useEffect runs once when the component is mounted
  useEffect(() => {
    // Adding isFavorite property to each book, initially set to false
    const booksWithFavorites = data.map((book) => ({
      ...book,
      isFavorite: false,
    }));
    // Dispatching action to set books in the state
    dispatch({ type: "SET_BOOKS", payload: booksWithFavorites });
  }, [dispatch]);

  // Function to toggle the 'favorite' status of a book
  const toggleFavorite = (id) => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: id,
    });
  };

  // Conditionally rendering books (filtered or all books)
  const booksToDisplay =
    state.filteredBooks.length > 0 ? state.filteredBooks : state.books;

  return (
    <div className="relative grid items-center justify-between grid-cols-2 gap-4 p-3 overflow-x-auto border border-gray-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {/* Mapping through booksToDisplay and rendering each book */}
      {booksToDisplay.map((book, idx) => {
        // Check if the book is already in the cart
        const isInCart = state.cart.some((cartItem) => cartItem.id === book.id);

        return (
          <div
            key={idx}
            className="p-4 transition-shadow duration-300 border border-gray-700 rounded-lg shadow-md hover:shadow-lg"
          >
            {/* Book image, click to show details */}
            <img
              src={`/images/${book.image}`}
              alt={book.name}
              onClick={() => openShowDetails(book)} // Opens the details modal when clicked
              className="object-cover w-full mb-4 rounded cursor-pointer h-72"
            />
            <h3 className="text-lg font-semibold">{book.name}</h3>
            <p className="text-gray-400">{book.author}</p>

            {/* Rating stars */}
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

            <div className="flex items-center justify-between mt-4">
              {/* Add to Cart button or Added button depending on if it's in the cart */}
              {isInCart ? (
                <button className="relative flex items-center gap-2 px-5 py-2 text-white transition-all duration-300 transform rounded bg-slate-500 sm:w-36 hover:scale-105 hover:rotate-3d hover:shadow-lg active:scale-95">
                  <p className="px-2 text-sm font-semibold text-black border-r border-black">
                    ${book.price}
                  </p>
                  <span className="text-sm font-semibold text-center text-black">
                    Added
                  </span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: book })
                  }
                  className="relative flex items-center w-full gap-2 px-5 py-1.5 text-white transition-all transform rounded duration-400 sm:w-36 bg-gradient-to-r from-green-400 to-green-600 hover:scale-105 hover:rotate-4 hover:shadow-xl hover:shadow-green-500/50 active:scale-95"
                >
                  {/* Add to Cart button with animated background on hover */}
                  <div className="absolute inset-0 transition-all duration-300 transform rounded-full opacity-0 bg-gradient-to-r from-yellow-400 to-orange-600 group-hover:opacity-100"></div>
                  <p className="z-10 text-lg font-semibold text-white">
                    Add to Cart
                  </p>
                  <svg
                    className="absolute w-6 h-6 text-white transition-opacity duration-300 transform -translate-y-1/2 opacity-0 right-2 top-1/2 group-hover:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M12 5v14m7-7l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(book.id)} // Toggle the favorite state
                className={`relative p-1.5 border-2 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95 active:rotate-0 active:transition-transform active:duration-200 ${
                  book.isFavorite
                    ? "bg-gradient-to-r from-pink-400 to-red-500 text-white border-red-600 hover:from-red-500 hover:to-pink-600"
                    : "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-600 hover:from-green-500 hover:to-green-700"
                }`}
              >
                {/* Animated background for hover */}
                <div
                  className={`absolute inset-0 transition-all duration-400 ${
                    book.isFavorite
                      ? "bg-gradient-to-r from-pink-300 to-red-400 opacity-50"
                      : "bg-gradient-to-r from-green-300 to-green-600 opacity-40"
                  }`}
                ></div>
                {/* Heart icon with animation */}
                <Heart
                  size={22}
                  fill={book.isFavorite ? "currentColor" : "none"} // Changes icon color based on favorite status
                  className="relative z-10 transition-all duration-300 transform hover:scale-125 active:scale-105 active:rotate-45"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MainContent;
