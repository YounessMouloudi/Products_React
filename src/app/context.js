import { createContext, useState } from "react";

/* hna ghadi ncréyiw un context li howa un state global li t9dar tpartagih f ga3 les components => had context
ghadi ykon fih l'état de l'application w li hia useAppState 
aprés tanmchiw l app.jsx w tan3ayto l balise <AppContext.Provider> w tandiro fiha ga3 dak l code li kan tema
bach haka l context taywali mpartagé f ga3 l'app aprés tan3ayto l value f wasst lbalise w tandiro fiha l'état de
l'app ay value={useAppState()}
aprés labghina nsta3mloh f ayi component tan3ayto l useContext(AppContext) 
=> par ex : const [productsState,setProductsState] = useContext(AppContext);
*/
export const AppContext = createContext();

export const useAppState = () => {
    
    const initialState = {
        products : [],
        currentPage : 1,
        pageSize : 4,
        keyword : "",
        totalPages : 0
    };

    const appState = useState(initialState);
    
    return appState;
}