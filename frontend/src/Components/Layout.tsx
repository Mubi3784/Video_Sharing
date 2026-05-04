import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import {Link} from "react-router-dom";
interface LayoutProps {
  children: React.ReactNode;
}
// layout component must be with capital first letter
// and we can also write in this way
//const Layout = ({ children }: layoutProps) => {
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" min-h-screen flex flex-col bg-amber-50 ">
      <nav className="flex items-center justify-end bg-black   fixed top-0 z-50 w-full text-white p-3">
        <div className="flex items-center gap-3 ms:gap-5 lg:gap-7 capitalize hover:text-blue-300">
          <Link to={"/"}>Home</Link>
          <Link to={"/all-videos"}>All Videos</Link>
          <Link to={"/signIn"} className="text-yellow-500">Sign-In</Link>
           
           
           
        </div>
      </nav>
      <main className=" flex flex-1  items-center w-full mt-16 justify-center">
        {children} 
      </main>
      <footer className="bg-black text-white py-6 border-t-{1px} border-t-black z-50">
       <div className="flex justify-center gap-6 mb-4 text-white">
         <a href="">
          {" "}
          
          <FaGithub size={25} />
        </a>
        <a href="">
          {" "}
          <FaInstagram size={25} />
        </a>
        <a href="">
          {" "}
          <FiTwitter size={25} />
        </a>
       </div>
       {/* text */}
       <div className="flex  justify-center flex-col text-center  ">
        <p>Sharing the joy of videos  with teh world </p>
        <p>Copyright @ 2025 My Video Hub</p>
       </div>
      </footer>
    </div>
  );
};

export default Layout;
