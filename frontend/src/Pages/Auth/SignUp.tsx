 import React from "react";
import Layout from "/document/Self Learning/Full_Stack/Projects/Project_1/Video_Sharing_App/frontend/src/Components/Layout";
import { Link } from "react-router-dom";
import type { authFormData } from "../../type";
import { useState } from "react";
const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<authFormData>({
    email: "",
    password: "",
  });

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(formData.email,formData.password)
  }
  return (
    <Layout>
      <div className="flex flex-col ">
        <h4 className=" w-full text-center my-4  h-8 font-bold text-3xl  pb-5 text-amber-950  ">
          Sign-Up Page
        </h4>
        <div className="border border-gray-100 bg-white  p-8   max-w-md md:max-w-lg lg:min-w-sm rounded-xl  ">
          <h2 className="text-2xl font-bold mb-8 text-gray-800  text-center">
            Join Us Today
          </h2>

          <form action="" onSubmit={handleSubmit} className=" flex flex-col gap-5">
            {/* Email box  */}

            <div className="flex flex-col gap-1">
              <label
                htmlFor=""
                className=" text-sm font-semibold text-gray-800"
              >
                Email{" "}
              </label>

              <input
                type="email"
                name="email"
                id=""
                required
                placeholder="Enter  email"
                className=" w-full border border-gray-600 px-4 py-2 rounded-2xl outline-none focus:ring-2  focus:ring-emerald-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password div */}
            <div className=" flex flex-col ">
              <label htmlFor="" className="font-semibold text-sm mb-1">
                Password
              </label>
              <input 
                type="password"
                name="password"
                id=""
                required
                className="border border-gray-600 rounded-2xl px-4 py-2 w-full outline-none focus:ring-2 focus:ring-emerald-500  "
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* button */}

            <button className="bg-green-600 rounded-2xl b  w-full px-4 py-2 text-white font-semibold transition-colors hover:bg-[#00b861]">
              SignUp
            </button>

            <div className=" flex gap-2  mt-2">
              <p>Already have an account?</p>
              <Link
                to={"/signIn"}
                className="text-emerald-500 font-semibold hover:text-blue-900"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
