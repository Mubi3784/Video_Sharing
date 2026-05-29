import React from "react";
import {RouterProvider} from "react-router-dom";
import router from "./router"
import {store} from "./Reducer/store"
import {Provider} from "react-redux"
import { Toaster } from "sonner"
import './App.css' 


const App: React.FC = ()=>{
  return(
   <>
    <Provider store={store}> 
    <Toaster position="top-left" richColors closeButton/> 
    <RouterProvider  router={router} />
    </Provider>
    
   </>
  );
}

export default App