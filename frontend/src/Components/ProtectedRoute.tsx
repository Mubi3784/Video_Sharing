import type { ReactNode } from "react";
import type React from "react";
import { Navigate } from "react-router-dom";


interface RouteProps{
    element:ReactNode;
}

// element contains the JSX component passed to ProtectedRouteHome,
// such as <Home />, <UserProfile />, or <Dashboard />.
// If a token exists, this component is rendered;
// otherwise the user is redirected to the sign-in page.




//  this part is for all loggedIn User 
export const ProtectedRouteHome:React.FC<RouteProps>=({element})=>{
    const token=localStorage.getItem("token");
    return token? element: <Navigate to={"/signIn"}></Navigate>
}

// this part is for the user is he is loggend in  then show profile 

export const ProtectedRoute:React.FC<RouteProps>=({element})=>{
    const token=localStorage.getItem("token");
    return token? <Navigate to={"/user/profile"}></Navigate>: element
}