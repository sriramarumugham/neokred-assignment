import React, { useEffect } from "react";
import Login from "../component/Login";
import Register from "../component/Register";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {


  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, [])


  const handleLogin = () => {
    setLogin(!login);
  };

  const checkToken = async () => {
    let token = await localStorage.getItem('signedJWT');
    if (token) {
      navigate('/home');
    }
  }
  
  return (
    <>
      <div className={` p-5  shadow-lg flex items-center  gap-0 justify-center h-auto   ${login ? 'md:h-[100vh]' : 'md:h-[120vh]'}  w-[100vw]    rounded-2xl `}>
        <div className={` bg-red-300  relative  w-[0%] ${login ? 'md:w-1/2' : 'md:w-[30%]'} h-full  items-center justify-center  rounded-2xl `}> 
        </div>
        <div className={`w-[100%] bg-green-300 ${login ? 'md:w-[50%] ' : 'md:w-[70%]'}   rounded-xl  bg-white h-full flex items-center justify-center`}>
          {login ? (
            <Login handleLogin={handleLogin} />
          ) : (
            <Register handleLogin={handleLogin} />
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
