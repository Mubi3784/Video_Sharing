import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Reducer/store";
import { useNavigate, NavLink } from "react-router-dom";
import { FaBars, FaHome, FaTimes } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { LuUpload } from "react-icons/lu";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { SlSettings } from "react-icons/sl";
import { IoLogOutOutline } from "react-icons/io5";
import { fetchUserDetails } from "../Reducer/Auth/authReducer";


const SideBar: React.FC = () => {
  const [isopen, setIsOpen] = useState<boolean>(false); // something is changing thats why we r using the state

  const toggleSideBar = () => {
    setIsOpen((prev) => !prev);
  };
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); //use to jump on different pages

  // 👇 when the component is mount for the first time we use the useEffect 
  useEffect(()=>{
   dispatch(fetchUserDetails())
  },[dispatch])


  return (
    <>
      <div
        className={`  w-80 h-screen fixed top-0 left-0 bg-black text-white shadow-lg transition-all duration-300 ease-in-out ${isopen ? "translate-x-0" : "-translate-x-full "} md:translate-x-0 md:bg-gray-300 md:text-black`}
      >
        {/* top heading */}
        <div className="p-4  text-2xl  font-bold text-center">My Video Hub</div>
        {/* nav link , nav-bar */}
        <nav className="mt-9   ml-4">
          <ul className=" space-y-3 ">
            <li>
              <NavLink
              onClick={toggleSideBar}
                to={"/"}
                className ={`flex gap-5 items-center hover:text-blue-300 md:hover:text-blue-700 text-2xl  `}
              >
                <FaHome size={25}> </FaHome>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/"}
                onClick={toggleSideBar}
                className={` flex  gap-5  items-center hover:text-blue-300  md:hover:text-blue-700 text-2xl  `}
              >
                 <IoMdPerson size={25}></IoMdPerson>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/"}
                onClick={toggleSideBar}
                className={` flex  gap-5 items-center hover:text-blue-300 md:hover:text-blue-700 text-2xl  `}
              >
                <LuUpload size={25}></LuUpload>
                <span>Upload Video</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/"}
                onClick={toggleSideBar}
                className={` flex  gap-5 items-center hover:text-blue-300 md:hover:text-blue-700 text-2xl  `}
              >
                <HiMiniVideoCamera size={25}></HiMiniVideoCamera>
                <span>My Video</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/user/profile"}
                onClick={toggleSideBar}
                className={` flex  gap-5 items-center hover:text-blue-300 md:hover:text-blue-700 text-2xl  `}
              >
                <SlSettings size={25}></SlSettings>
                <span>User Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/"}
                onClick={toggleSideBar}
                className={` flex  gap-5 items-center hover:text-blue-300 md:hover:text-blue-700 text-2xl  `}
              >
                <IoLogOutOutline size={25}></IoLogOutOutline>
                <span>LogOut</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    {/* top humBurger */}
    <div className="  bg-black text-white md:hidden">
      <button onClick={toggleSideBar} className=" fixed z-50 text-2xl flex mt-3 ml-3 md:hidden    ">
        {isopen? <FaTimes />:<FaBars /> }
      </button>
      <div className="flex justify-center h-13 ">
        <h1 className="  flex items-center text-2xl font-bold ">My Video Hub</h1>
      </div>
    </div>
    </>
  );  
};
export default SideBar;
