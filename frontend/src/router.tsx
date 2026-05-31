import {createBrowserRouter} from "react-router-dom";
import SignUp from "./Pages/Auth/SignUp";
import SignIn from "./Pages/Auth/SignIn";
import UserProfile from "./Pages/User/UserProfile";
import { ProtectedRoute, ProtectedRouteHome } from "./Components/ProtectedRoute";



// in the function parameter make an array  and define each route here  with path and element
const router=createBrowserRouter([

     
    {path:"/signUp", element: <ProtectedRoute element={<SignUp />} />},
    {path:"/signIn",element:<ProtectedRoute element={<SignIn />} />},
    {path:"/user/profile",element:<ProtectedRouteHome element={<UserProfile />} />}

])

export default router;