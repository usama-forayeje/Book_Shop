import { Heart, Star } from "lucide-react";
import data from "../../data/data";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useEffect } from "react";

function MainContent({ openShowDetails }) {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    const booksWithFavorites = data.map((book) => ({ ...book, isFavorite: false }));
    dispatch({ type: "SET_BOOKS", payload: booksWithFavorites });
  }, [dispatch]);

  const toggleFavorite = (id) => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: id,
    });
  };

  const booksToDisplay = state.filteredBooks.length > 0 ? state.filteredBooks : state.books;

  return (
    <div className="relative grid grid-cols-1 gap-4 p-4 border border-gray-700 sm:grid-cols-2 lg:grid-cols-3 sm:p-6 lg:p-10">
      {booksToDisplay.map((book, idx) => {
        const isInCart = state.cart.some((cartItem) => cartItem.id === book.id);

        return (
          <div
            key={idx}
            className="p-4 transition-shadow duration-300 border border-gray-700 rounded-lg shadow-md hover:shadow-lg"
          >
            <img
              src={`/images/${book.image}`}
              alt={book.name}
              onClick={() => openShowDetails(book)}
              className="object-cover w-full mb-4 rounded cursor-pointer h-72"
            />
            <h3 className="text-lg font-semibold">{book.name}</h3>
            <p className="text-gray-400">{book.author}</p>

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
              {isInCart ? (
                <button className="flex items-center gap-2 w-36 bg-gray-400 text-black px-2 py-1.5 rounded">
                  <p className="px-2 text-sm font-semibold text-black border-r border-black">
                    ${book.price}
                  </p>
                  <span className="text-sm font-semibold text-center text-black">
                    Added
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => dispatch({ type: "ADD_TO_CART", payload: book })}
                  className="flex items-center w-36 gap-2 bg-primaryGreen text-white px-2 py-1.5 rounded hover:bg-green-500 transition-colors duration-200"
                >
                  <p className="px-2 text-sm font-semibold text-black border-r border-black">
                    ${book.price}
                  </p>
                  <span className="text-sm font-semibold text-black">
                    Add to Cart
                  </span>
                </button>
              )}
              <button
                onClick={() => toggleFavorite(book.id)} // toggleFavorite function for handling favorite state
                className={`p-1 border rounded ${
                  book.isFavorite
                    ? "text-red-500 border-red-500"
                    : "text-gray-400 border-gray-400"
                }`}
              >
                <Heart
                  size={20}
                  fill={book.isFavorite ? "currentColor" : "none"} // Changes icon fill based on isFavorite
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
