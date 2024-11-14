import { useContext } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { StoreContext } from "../../context/StoreContext";

export default function CartModal({ showTable, toggleTable }) {
  const { state, dispatch } = useContext(StoreContext);

  // Quantity increment function
  const incrementQuantity = (book) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: book.id });
  };

  // Quantity decrement function
  const decrementQuantity = (book) => {
    if (book.quantity > 1) {
      dispatch({ type: "DECREASE_QUANTITY", payload: book.id });
    }
  };

  return (
    <div>
      {showTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="relative w-full max-w-4xl p-6 overflow-hidden transition-all duration-300 transform bg-white shadow-xl h-5/6 dark:bg-black sm:rounded-xl">
            <div className="relative flex flex-col w-full h-full">
              {/* Header with Close button */}
              <div className="flex items-center justify-between mb-6">
                <p className="w-full text-lg font-semibold text-center">
                  Your Cart
                </p>
                <X
                  onClick={toggleTable}
                  className="text-2xl text-gray-700 cursor-pointer dark:text-gray-300"
                  size={32}
                  strokeWidth={1.5}
                />
              </div>

              {/* Cart Items */}
              <div className="flex-grow mb-24 overflow-auto">
                <div className="w-full border-b">
                  <ul className="fixed grid w-full grid-cols-6 px-4 pb-2 border-gray-200 top-14 dark:border-gray-700">
                    <li className="col-span-2 text-sm font-medium">Product</li>
                    <li className="text-sm font-medium">Price</li>
                    <li className="text-sm font-medium">Quantity</li>
                    <li className="text-sm font-medium">Total</li>
                    <li className="w-14"></li> {/* For Delete icon */}
                  </ul>
                </div>
                <div className="w-full overflow-auto scrollbar-hide">
                  {state.cart.map((book, idx) => (
                    <div
                      key={idx}
                      className="grid items-center grid-cols-6 px-4 py-2 my-1 border-b border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    >
                      {/* Product Image and Title */}
                      <div className="flex items-center col-span-2 gap-2">
                        <img
                          src={`/images/${book.image}`}
                          alt={book.name}
                          className="object-cover w-10 h-16 rounded"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                            {book.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {book.author}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <p className="col-span-1 text-center text-gray-800 dark:text-white">
                        ${book.price}
                      </p>

                      {/* Quantity */}
                      <div className="col-span-1 text-center bg-gray-600 rounded-md lg:mr-6 md:ml-5 sm:ml-5">
                        <div className="flex items-center justify-center gap-2 px-5 py-1 rounded-lg ">
                          <span
                            className="text-gray-800 cursor-pointer dark:text-white"
                            onClick={() => decrementQuantity(book)}
                          >
                            <Minus size={16} strokeWidth={1.5} />
                          </span>
                          <span className="text-xs text-gray-800 dark:text-white">
                            {book.quantity}
                          </span>
                          <span
                            className="text-gray-800 cursor-pointer dark:text-white"
                            onClick={() => incrementQuantity(book)}
                          >
                            <Plus size={16} strokeWidth={1.75} />
                          </span>
                        </div>
                      </div>

                      {/* Total */}
                      <p className="col-span-1 text-center text-gray-800 md:ml-5 sm:ml-5 dark:text-white">
                        ${(book.price * book.quantity).toFixed(2)}
                      </p>

                      {/* Delete Icon */}
                      <div className="flex justify-center col-span-1">
                        <Trash2
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: book.id,
                            })
                          }
                          size={18}
                          className="text-red-500 cursor-pointer dark:text-red-400"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Order Summary */}
              <div className="absolute bottom-0 left-0 w-full py-2 bg-white border-t border-gray-200 shadow-xl dark:bg-black dark:border-gray-700">
                <div className="flex justify-between w-full px-6 text-sm font-medium text-gray-800 dark:text-white">
                  <p>Subtotal</p>
                  <p>
                    $$
                    {state.cart
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between w-full px-6 mt-1 text-sm font-medium text-gray-800 dark:text-white">
                  <p>Shipping</p>
                  <p className="text-green-500">Free</p>
                </div>
                <div className="flex justify-between w-full px-6 mt-1 text-sm font-semibold text-gray-800 dark:text-white">
                  <p>Total</p>
                  <p>
                    $
                    {state.cart
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-center mt-2">
                  <button className="px-6 py-3 text-lg font-semibold text-white transition-all duration-200 bg-green-500 rounded-lg hover:bg-green-600">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
