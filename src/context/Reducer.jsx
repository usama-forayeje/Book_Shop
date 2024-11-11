export const initialState = {
  books: [],
  cart: [],
  searchQuery: "",
  filter: "",
  filteredBooks: [],
};

export function storeReducer(state, action) {
  switch (action.type) {
    case "SET_BOOKS":
      return { ...state, books: action.payload };
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "FILTER_BY_NAME":
      return {
        ...state,
        filteredBooks: state.books.sort((a, b) => a.name.localeCompare(b.name)),
      };
    case "FILTER_BY_RATING":
      return {
        ...state,
        filteredBooks: state.books.sort((a, b) => b.rating - a.rating),
      };
    case "FILTER_BY_PRICE":
      return {
        ...state,
        filteredBooks: state.books.sort((a, b) => a.price - b.price),
      };
    // নতুন ফিল্টার অ্যাকশন
    case "FILTER_BY_NEW_RELEASES":
      return {
        ...state,
        filteredBooks: state.books.filter(
          (book) => book.status === "new_releases"
        ),
      };

    
    case "FILTER_BY_TRENDING":
      return {
        ...state,
        filteredBooks: state.books.filter((book) => book.status !== "trending"),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity ? item.quantity + 1 : 1 } // quantity যদি undefined বা NaN হয় তবে 1 সেট করা
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } // quantity যদি 1 এর কম হয় তবে 1 রাখা
            : item
        ),
      };
      case "FILTER_BY_ALL":
  return {
    ...state,
    filteredBooks: state.books, // সব বই দেখাবে
  };

case "FILTER_BY_FAVORITES":
  return {
    ...state,
    filteredBooks: state.books.filter((book) => book.favorite), // শুধুমাত্র ফেভারিট বইগুলো দেখাবে
  };

    default:
      return state;
  }
}
