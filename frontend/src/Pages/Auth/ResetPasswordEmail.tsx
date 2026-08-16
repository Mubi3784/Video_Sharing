import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Layout from "../../Components/Layout";
import backendApi from '../../Api/backendApi';
import { toast } from 'sonner';

interface ResetResponse {
  success: boolean,
  message: string
}

export const ResetPasswordEmail: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await backendApi.post<ResetResponse>("api/v1/auth/resetPassword", { email });
      if (data.success) {
        toast.success(data.message)
        navigate('/signin');
      }
      else {
        toast.warning(data.message)
      }
    } catch (error) {
      toast.error(`Something went wrong in ResetPasswordEmail.tsx ${error}`)
    }
    finally {
      setLoading(false);
    }


  }
  const navigate = useNavigate();
  return (

    <Layout>
      <div className='bg-white p-8  rounded-xl shadow-lg w-full max-w-sm flex flex-col '>

        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Reset Password</h2>


        <form onSubmit={handleSubmit}>
          {/* email input field  */}
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray700 mb-1'> Email Address</label>
            <input type="email" id='email' name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Enter your Email ' className=' w-full px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 mt-3' />


          </div>

          {/* button */}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 mt-4' >Send Reset Link</button>

          {/* navigate to sign up page  */}
          <div className='text-center mt-4 '>

            <span className='text-sm text-gray-600 mr-2'>Not a member yet?</span>
            <Link to={'/signup'} className='text-green-800 font-semibold '>Sign up for free</Link>

          </div>
        </form>

      </div>
    </Layout>


  )
}
