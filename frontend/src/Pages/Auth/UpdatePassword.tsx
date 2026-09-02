import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import backendApi from '../../Api/backendApi';
import { toast } from 'sonner';
import Layout from '../../Components/Layout';


interface UpdatePasswordResponse{
    success:boolean,
    message:string
}

export const UpdatePassword: React.FC  = () => {

const {token}= useParams<{token:string}>();
const [password, setPassword]=useState<string>();
const navigate=useNavigate();
const [loading, setLoading]=useState<boolean>(false);
const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
try {
    setLoading(true);
    e.preventDefault();
    const {data} = await backendApi.post<UpdatePasswordResponse>(`api/v1/auth/updatePassword/${token}`, {password})
    if(data.success){
        toast.success(data.message)
        navigate("/signin");
        
    }else {
            toast.warning(data.message)
          }


} catch (error) {
    toast.error(`Something went wrong in ResetPasswordEmail.tsx ${error}`)
}
finally{
    setLoading(false)
}

}
  return (
    
    <Layout>
      <div className='bg-white p-8  rounded-xl shadow-lg w-full max-w-sm flex flex-col '>

        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Reset Password</h2>


        <form onSubmit={handleSubmit}>
          {/* email input field  */}
          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray700 mb-1'> Password</label>
            <input type="password" id='password' name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter your Password ' className=' w-full px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 mt-3' />


          </div>

          {/* button */}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 mt-4' >{loading ? "Updating...": "Update Password"}</button>
            

           
        </form>

      </div>
    </Layout>
  )
}
