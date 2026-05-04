import React from "react";
import Layout from "../../Components/Layout";
import {Link} from "react-router-dom";
const signIn: React.FC= () =>  {
    return(
        <Layout>
           <div className="flex flex-col ">
             <h4 className=" w-full text-center my-4  h-8 font-bold text-3xl  pb-5 text-amber-950  ">Sign-In Page</h4>
           
         <div className="border border-grey-100  bg-white max-w-md flex flex-col rounded-2xl p-8 lg:min-w-sm">
            <h2 className="font-bold text-2xl text-center mb-2">Join Us Today </h2>

            <form action="" className="flex flex-col gap-3">
                <label htmlFor="" className="font-semibold mt-2 text-sm text-grey-800">Email</label>
            <input type="email" name="email" id="" required placeholder="Enter Your Email" className="border px-4 py-2 focus:ring-2 focus:ring-emerald-500 rounded-2xl outline-none" />

            {/* password */}

            <label htmlFor="" className="font-semibold mt-2 text-sm text-grey-800">Password</label>
            <input type="password" name="password" id="" placeholder="Enter your Password" required className="border px-4 py-2 focus:ring-2 focus:ring-emerald-500 rounded-2xl outline-none"  />

            {/* button */}
            <button className=" mt-2 bg-green-600 rounded-2xl w-full px-4 py-2 text-white font-semibold transition-colors hover:bg-[#00b861]">Sign In</button>

            </form>
            <Link to={"/signUp"} className="mt-1 font-semibold text-blue-800">  Sign Up For Free</Link>
          
         </div>
         </div>
        </Layout>
    )
};

export default signIn;