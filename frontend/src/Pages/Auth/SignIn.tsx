import React from "react";
import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { authFormData } from "../../type";

// now we are using the state. An array distructor  having formData(which holds the data ) and setFormData( a function which is used to change the data )


const signIn: React.FC = () => {
  
const [formData, setFormData] = useState<authFormData>({
  email: "",
  password: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  //👇 this is the arrow function which return the object so thats why we wrap "{} " inside () 
  setFormData((prev) => ({
    ...prev, 
    [name]: value,
  }));
};
// we have make the funtion async bcz write now we are just doing console  but in futute we send data to backend
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  // to stop the refresh on clicking the submit button we are using this 👇
  e.preventDefault();
  console.log(
    `you have successfully login ${formData.email} , ${formData.password}`,
  );
};
  return (
    <Layout>
      <div className="flex flex-col ">
        <h4 className=" w-full text-center my-4  h-8 font-bold text-3xl  pb-5 text-amber-950  ">
          Sign-In Page
        </h4>

        <div className="border   bg-white max-w-md flex flex-col rounded-2xl p-8 lg:min-w-sm">
          <h2 className="font-bold text-2xl text-center mb-2">
            Join Us Today{" "}
          </h2>

          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <label
              htmlFor=""
              className="font-semibold mt-2 text-sm text-grey-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id=""
              required
              placeholder="Enter Your Email"
              className="border px-4 py-2 focus:ring-2 focus:ring-emerald-500 rounded-2xl outline-none"
              value={formData.email}
              onChange={handleChange}
            />

            {/* password */} 

            <label
              htmlFor=""
              className="font-semibold mt-2 text-sm text-grey-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id=""
              placeholder="Enter your Password"
              required
              className="border px-4 py-2 focus:ring-2 focus:ring-emerald-500 rounded-2xl outline-none"
              value={formData.password}
              onChange={handleChange}
            />

            {/* button */}
            <button className=" mt-2 bg-green-600 rounded-2xl w-full px-4 py-2 text-white font-semibold transition-colors hover:bg-[#00b861]">
              Sign In
            </button>
          </form>
          <Link to={"/signUp"} className="mt-1  font-semibold text-blue-800">
            {" "}
            Sign Up For Free
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default signIn;
 