import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../Reducer/Auth/authReducer";

const UserProfile: React.FC = () => {
  // useState , one can store the value and one can chamge the value
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  //  its another way to change the input field while typing in it

  const loggedInUser = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (loggedInUser?.name) {
      setName(loggedInUser.name)
    }
    if(loggedInUser?.email){
      setEmail(loggedInUser.email)
    }
  },[loggedInUser])
  return (
    <div className=" h-screen w-full bg-gray-50 ">
      <SideBar />
      <main className=" ml-4 flex-1   md:ml-80 z-10 min-h-screen pt-4 -r-4   text-center">
        <section className="bg-white border border-gray-500 mt-12 rounded-2xl mx-2 p-6 shadow-sm">
          <h1 className="  mt-4 text-2xl font-bold ">Profile Details</h1>

          {/* inputs div */}
          <div className="flex  flex-row  ">
            <div className="flex flex-col   mt-4     w-full  ">
              {/* name field */}
              <div className=" flex flex-col pl-4 w-full  ">
                <label
                  htmlFor="name"
                  className="text-left font-bold mt-2 mb-1 text-xl"
                >
                  Name:
                </label>
                <input
                  className={`text-sm border rounded-xl pl-5 h-10 outline-none focus:ring-2 focus:ring-emerald-500 ${edit ? "border-black" : "border-gray-200"}`}
                  type="text"
                  name="name"
                  placeholder="Enter your Name.."
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={!edit}
                />
              </div>
              {/* email field */}

              <div className="flex flex-col w-full  pl-4 mt-4">
                <label htmlFor="email" className="text-left font-bold text-xl">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email.."
                  className={`text-sm pl-5 border  rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 h-10 ${edit ? "border-black" : "border-gray-200"}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={!edit}
                />
              </div>

              {/* button */}
              <div className="flex justify-end mt-5 pr-5">
                <button
                  type="button"
                  className="font-medium text-white bg-blue-600 h-9 px-4 rounded-sm"
                  onClick={() => setEdit(!edit)}
                >
                  {edit ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
