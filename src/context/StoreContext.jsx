/* eslint-disable react-refresh/only-export-components */
// src/context/StoreContext.js
import { createContext, useReducer } from "react";
import { storeReducer, initialState } from "./reducer";

// Creating the context to provide the store state and dispatch function
export const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Using the reducer to manage the global state of the app
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    // Providing the state and dispatch function to the rest of the app
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}  {/* Rendering the children components */}
    </StoreContext.Provider>
  );
}
