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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="fixed inset-0 z-50 w-[100vw] h-[100vh] max-w-4xl max-h-[80vh] border-gray-700 border bg-black p-6 shadow-lg sm:rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div>
              <div className="relative">
                <p className="font-semibold text-center text-white">
                  <X onClick={toggleTable} className="absolute top-0 right-0 cursor-pointer" size={32} strokeWidth={1.5} />
                  Your Carts
                </p>
              </div>
              <div>
                <div className="w-9/12 mt-3">
                  <ul className="grid grid-cols-5 px-4 pb-2 border-b">
                    <li className="col-span-2 text-sm text-white">Product</li>
                    <li className="text-sm text-white">Price</li>
                    <li className="text-sm text-white">Quantity</li>
                    <li className="text-sm text-white">Total</li>
                    <li></li>
                  </ul>
                </div>
              </div>
              <div className="flex w-full ">
                <div className="w-9/12 overflow-auto h-72 scrollbar-hide ">
                  {state.cart.map((book, idx) => (
                    <div key={idx} className="grid items-center grid-cols-6 px-4 py-2 border-b border-gray-700 gap-x-3">
                      <div className="flex items-center col-span-2 gap-2 px-3">
                        <img src={`/images/${book.image}`} alt={book.name} className="object-cover w-10 rounded h-14" />
                        <div className="flex flex-col gap-1">
                          <h3 className="text-sm">{book.name}</h3>
                          <p className="text-xs">{book.author}</p>
                        </div>
                      </div>
                      <p className="ml-4 text-center">${book.price}</p>
                      <div className="ml-12 ">
                        <div className="flex items-center justify-center gap-1 px-8 rounded-lg bg-slate-500">
                          <span className="text-white cursor-pointer" onClick={() => decrementQuantity(book)}>
                            <Minus color="#ffffff" size={13} strokeWidth={1.5} />
                          </span>
                          <span className="py-1 text-xs font-normal text-white">{book.quantity}</span>
                          <span className="text-white cursor-pointer" onClick={() => incrementQuantity(book)}>
                            <Plus color="#ffffff" size={13} strokeWidth={1.75} />
                          </span>
                        </div>
                      </div>
                      <p className="ml-16 text-center">${(book.price * (book.quantity || 1)).toFixed(2)}</p>
                      <div className="flex justify-end px-3 cursor-pointer">
                        <Trash2 onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: book.id })} size={16} strokeWidth={1.5} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="fixed right-0 w-3/12 mr-3 top-24">
                  <div className="w-48 h-48 m-auto bg-[#8c8c8c4d] rounded">
                    <div className="flex items-center justify-center py-5 border-b border-gray-400">
                      <p className="font-semibold text-white">Order Summary</p>
                    </div>
                    <div className="flex flex-col gap-4 mt-9">
                      <div className="flex items-center justify-between px-5 font-serif text-white">
                        <p>Subtotal</p>
                        <p>${state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between px-5 font-serif text-white">
                        <p>Shipping</p>
                        <p className="font-serif text-primaryGreen">Free</p>
                      </div>
                      <div className="flex items-center font-serif rounded-b justify-between bg-[#8c8c8c] py-1.5 px-5 text-white">
                        <p>Total</p>
                        <p>${state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-48 ml-[15px] mt-7">
                    <button className="px-[63px] mt-2 py-2 font-serif text-center text-white rounded bg-primaryGreen">
                      <p>Checkout</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
