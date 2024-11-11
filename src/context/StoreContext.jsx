/* eslint-disable react-refresh/only-export-components */
// src/context/StoreContext.js
import { createContext,  useReducer,  } from "react";
import { storeReducer, initialState } from "./reducer";


export const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);



  return (
    <StoreContext.Provider value={{ state, dispatch ,}}>
      {children}
    </StoreContext.Provider>
  );
}
