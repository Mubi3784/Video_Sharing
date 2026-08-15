import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from "../../Components/Layout";

export const ResetPasswordEmail : React.FC = () => {
  const [email, setEmail]= useState<string>("");
  const navigate= useNavigate();
  return (
      
       <Layout>
        <div>
          
        </div>
       </Layout>

     
  )
}
 