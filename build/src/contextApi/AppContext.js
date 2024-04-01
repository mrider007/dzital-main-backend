
import React from "react";
import { useContext,createContext} from "react";



export const AppContext = createContext()




export const useAppContext = () => useContext(AppContext);