export const initialState = {
  books: [],  // List of all books
  cart: [],   // Cart items
  searchQuery: "",  // Current search query
  filter: "",  // Current filter applied
  filteredBooks: [],  // Filtered list of books based on the search/filter
  favorites: [],  // List of favorite books
};

export function storeReducer(state, action) {
  switch (action.type) {
    case "SET_BOOKS":
      return { ...state, books: action.payload };  // Set books in the state
    
    case "ADD_TO_CART":
      // Check if the item is already in the cart
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }  // Increase quantity if item exists
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],  // Add item with quantity 1 if not in cart
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),  // Remove item from cart by id
      };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };  // Update search query
    
    case "SET_FILTER":
      return { ...state, filter: action.payload };  // Set the filter criteria

    case "FILTER_BY_NAME":
      return {
        ...state,
        filteredBooks: state.books.sort((a, b) => a.name.localeCompare(b.name)),  // Sort books by name
      };

    case "FILTER_BY_RATING":
      return {
        ...state,
        filteredBooks: state.books.sort((a, b) => b.rating - a.rating),  // Sort books by rating
      };

    case "FILTER_BY_PRICE":
      return {
        ...state,
        filteredBooks: state.books.sort((a, b) => a.price - b.price),  // Sort books by price
      };

    case "FILTER_BY_NEW_RELEASES":
      return {
        ...state,
        filteredBooks: state.books.filter(
          (book) => book.status === "new_releases"  // Filter books by new releases status
        ),
      };

    case "FILTER_BY_TRENDING":
      return {
        ...state,
        filteredBooks: state.books.filter((book) => book.status !== "trending"),  // Filter books by non-trending status
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity ? item.quantity + 1 : 1 }  // Increase quantity
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }  // Decrease quantity, ensuring it's at least 1
            : item
        ),
      };

    case "FILTER_BY_ALL":
      return {
        ...state,
        filteredBooks: state.books,  // Display all books
      };

    case "FILTER_BY_FAVORITES":
      return {
        ...state,
        filteredBooks: state.books.filter(book => book.isFavorite),  // Filter books by favorites
      };

    case "TOGGLE_FAVORITE":
      // Toggle the isFavorite property of the selected book
      const updatedBooks = state.books.map((book) =>
        book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book
      );

      // Update filteredBooks to reflect changes in favorites
      const updatedFilteredBooks = state.filteredBooks.map((book) =>
        book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book
      );

      return {
        ...state,
        books: updatedBooks,
        filteredBooks: updatedFilteredBooks,
      };

    default:
      return state;  // Return current state if no action matches
  }
}
