import {createBrowserRouter} from "react-router-dom";
import SignUp from "./Pages/Auth/SignUp";
import SignIn from "./Pages/Auth/SignIn";



// in the function parameter make an array  and define each route here  with path and element
const router=createBrowserRouter([
    {path:"/signUp",element:<SignUp />},

    {path:"/signIn",element:<SignIn />}
])

export default router;