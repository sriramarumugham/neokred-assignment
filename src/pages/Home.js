import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const getUserDetails = async (token) => {
    try {
      let config = {
        headers: {
          Authorization: 'bearer ' + token,
        }
      }
      let response = await axios.get('https://3y9kds-8080.csb.app/home', config);

      if (response.data.user) {
        setUser(response.data.user)
      }
      else {
        localStorage.removeItem('signedJWT');
        navigate("/");
      }
    }
    catch (err) {
      console.log("some error in getting user data", err);
      localStorage.removeItem('signedJWT');
      navigate("/");
    }
  }


  useEffect(() => {
    let token = localStorage.getItem('signedJWT');
    if (!token) {
      navigate('/');
    }
    getUserDetails(token)
  }, [])



  const renderContenct = () => {
    return (

      <div className=' flex  flex-col  m-auto shadow-md w-[100%] md:w-[570px] h-100 mt-5 p-4 gap-1' >

        <h3 className='my-5 text-lg'>PROFILE</h3>

        <div className='flex flex-row justify-between gap-2'>

          <div className='w-[30%] break-words'>
            Name
          </div>
          <div className='w-[70%]'>
            {user.fullName}
          </div>

        </div>

        <div className='flex flex-row justify-between gap-2'>

          <div className='w-[30%] break-words'>
            Email
          </div>
          <div className='w-[70%]'>
            {user.email}

          </div>

        </div>

        <div className='flex flex-row justify-between gap-2'>

          <div className='w-[30%] break-words'>
            DOB
          </div>
          <div className='w-[70%]'>
            {user.dateOfBirth}

          </div>

        </div>

        <div className='flex flex-row justify-between gap-2'>

          <div className='w-[30%] break-words'>
            Address
          </div>
          <div className='w-[70%]'>
            {user.address}

          </div>

        </div>


        <div className='flex flex-row justify-between gap-2'>

          <div className='w-[30%] break-words'>
            City
          </div>
          <div className='w-[70%]'>
            {user.city}

          </div>

        </div>

        <div className='flex flex-row justify-between gap-2'>

          <div className='w-[30%] break-words'>
            State
          </div>
          <div className='w-[70%]'>
            {user.state}

          </div>

        </div>
        <div className='flex flex-row justify-between gap-2'>

          <div className='w-[30%] break-words'>
            Country
          </div>
          <div className='w-[70%]'>
            {user.country}

          </div>

        </div>

        <div className='flex flex-row justify-between gap-2'>

          <div className='w-[30%] break-words'>
            ZIP
          </div>
          <div className='w-[70%]'>
            {user.zipCode}

          </div>

        </div>

      </div>

    )
  }
  const handleLogout = () => {
    localStorage.removeItem('signedJWT');
    navigate('/');
  }
  return (
    <>
      <div className='w-[100vw] h-[100vh]'>
        <div className='flex flex-row h-[70px]  p-10 justify-between shadow-md'>
          <div>
            <p>Logo</p>
          </div>
          <div>
            <p>{user.fullName}</p>
            <button className='login-btn w-[100px] ' onClick={() => { handleLogout() }}>Logout</button>
          </div>
        </div>
        {user && renderContenct()}
      </div>

    </>
  )
}

export default Home

