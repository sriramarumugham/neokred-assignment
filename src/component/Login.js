import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import { AuthState } from '../context/userProvider';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
    const [loading, setLoading] = useState(false);
    


    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email").required("Please enter your password"),
        password: Yup.string().required("Please enter your password")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: validateSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            setLoading(true);
            submitForm(values)
        },
    });

    const submitForm = async (data) => {
        try {
            console.log("data******* trying to submit*****", data);
            const { email, password } = data;
            const response = await axios.post('https://3y9kds-8080.csb.app/login',
                {
                    email, password
                }
            );
            console.log("response.data****", response.data);
            if (response.data.token) {
                // await setToken(response.data.token);
                let token = response.data.token;
                await JSON.stringify(token);
                await localStorage.setItem('signedJWT', token);
                // await getUserDetails(token);
                navigate('/home')
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("Some erro in submitting form ", err);
        }

    }
    return (
        <>

            <div className=" h-[70%]  w-[80%] md:w-[70%] rounded-xl flex flex-col  gap-2">

                <form
                    className="flex flex-col gap-2 mt-5 w-[100%] md:w-[490px] m-auto"
                    onSubmit={formik.handleSubmit}
                >
                    <p className="text-gray-500 text-sm">
                        Welcome
                    </p>
                    <h3 className="text-3xl">Login</h3>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        name='email'
                        className="login-input"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <lable className="field-error-message">{formik.errors.email ? formik.errors.email : ""}</lable>

                    <label>Password</label>
                    <input
                        type="password"
                        name='password'
                        value={formik.values.password}
                        placeholder="Password"
                        className="login-input"
                        onChange={formik.handleChange}


                    ></input>
                    <lable className="field-error-message">{formik.errors.password ? formik.errors.password : ""}</lable>



                    <p className="text-gray-500 flex flex-row-reverse text-sm  ">
                        <span>
                            {" "}
                            <button
                                onClick={handleLogin}
                                className="text-md underline text-blue-500"
                            >
                                Forgot password ?
                            </button>
                        </span>
                    </p>


                    <button className="login-btn " type='submit'>Login</button>


                    <p className="text-gray-500 text-sm  mt-5">
                        Do not have an account
                        <span>
                            {" "}
                            <button
                                onClick={handleLogin}
                                className="text-md underline text-blue-500"
                            >
                                Sign up
                            </button>
                        </span>
                    </p>
                </form>
            </div>


        </>
    )
}

export default Login