import React, { useState } from 'react'

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = ({ handleLogin }) => {

    const [loading, setLoading] = useState(false);

    const validateSchema = Yup.object().shape({
        fullName: Yup.string().required("This field is required").max(50, 'Limited to 50 characters'),
        dateOfBirth: Yup.string().required('Please select your DOB'),
        mobile: Yup.string().required('Field is required').matches(/^[0-9]{10}$/, ' valid phone number with 10 digits'),

        sequrityQuestion:Yup.string().max(100, 'Limited to  100 characters').required("This filed is required"),
        address: Yup.string().required('This field is required ').max(100, 'Limited to 100 characters'),
        city: Yup.string().required('This field is required ').matches(/^[A-Za-z]+$/, 'Must contain only alphabats').max(50, 'limited to 50 characters'),
        state: Yup.string().required('This field is required '),
        zipCode: Yup.number().required('This field is required ').min(100000, "any 6 digit number").max(999999, 'Number must not exceed 6 digits').integer('Number must be an integer').typeError('Invalid number'),
        country: Yup.string().required('This field is required '),
        email: Yup.string().required("This field is required"),
        password: Yup.string()
            .required("This field is required")
            .min(8, "Pasword must be 8 or more characters")
            .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
        confirmPassword: Yup.string().when("password", (password, field) => {
            if (password) {
                return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
            }
        }),

    });

    const formik = useFormik({
        initialValues: {
            fullName: "",
            dateOfBirth: "",
            mobile: "",
            sequrityQuestion: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            email: "",
            password: "",
            confirmPassword: "",

        },
        validationSchema: validateSchema,
        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            submitForm(values);
        },
    });
    
    const navigate = useNavigate();


    const submitForm = async (data) => {
        try {
            const response = await axios.post('https://3y9kds-8080.csb.app/register',
                data
            );

            console.log("response.data****", response.status);
            if (response.status == 200) {
                handleLogin();
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("response.data****", err.response.status);
        }

    }

    return (
        <div className=" h-[95%]  w-[100%] md:w-[80%]   rounded-xl flex flex-col  gap-2">

            <p className="text-gray-500  text-sm">
                Welcome
            </p>
            <h3 className="text-xl font-semibold">Sign up</h3>
            <form
                className="flex flex-col gap-2 "
                onSubmit={formik.handleSubmit}
            >
                <div className='flex  flex-col   md:flex-row gap-6'>


                    <div className='flex flex-col gap-2 mt-5'>

                        <label>Full Name</label>
                        <input
                            placeholder="Full Name"
                            className="login-input"
                            type="text"
                            required
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            name="fullName"
                        />
                        <lable className="field-error-message">{formik.errors.fullName ? formik.errors.fullName : ""}</lable>

                        <label>Date of birth</label>
                        <input
                            placeholder="Date of birth"
                            className="login-input"
                            type="date"
                            required
                            value={formik.values.dateOfBirth}
                            onChange={formik.handleChange}
                            name='dateOfBirth'
                        />
                        <lable className="field-error-message">{formik.errors.dateOfBirth ? formik.errors.dateOfBirth : ""}</lable>


                        <label>Phone number</label>
                        <input
                            placeholder="Phone number"
                            className="login-input"
                            type="text"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            name='mobile'
                        />

                        <lable className="field-error-message">{formik.errors.mobile ? formik.errors.mobile : ""}</lable>

                        <label>Security Quesition</label>
                        <label className='font-light'>What is your school name?</label>
                        <input
                            placeholder="security question "
                            className="login-input"
                            type="text"
                            value={formik.values.sequrityQuestion}
                            onChange={formik.handleChange}
                            name='sequrityQuestion'
                        />



                        <lable className="field-error-message">{formik.errors.sequrityQuestion ? formik.errors.sequrityQuestion : ""}</lable>
                    </div>

                    <div className='flex flex-col gap-2 md:mt-5'>

                        <label>Email</label>
                        <input
                            placeholder="Email"
                            className="login-input"
                            type="text"
                            value={formik.values.email}
                            name='email'
                            onChange={formik.handleChange}
                        ></input>

                        <lable className="field-error-message">{formik.errors.email ? formik.errors.email : ""}</lable>

                        <label>Password</label>
                        <input
                            placeholder="Password"
                            className="login-input"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type="password"
                            name='password'
                        ></input>
                        <lable className="field-error-message">{formik.errors.password ? formik.errors.password : ""}</lable>

                        <label>Confirm password</label>
                        <input
                            placeholder="Confirm password"
                            className="login-input"
                            value={formik.values.confirmPassword}
                            type="password"
                            onChange={formik.handleChange}
                            name='confirmPassword'
                        ></input>
                        <lable className="field-error-message">{formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}</lable>
                    </div>
                </div>

                <label>Address</label>
                <input
                    placeholder="address"
                    className="login-input w-[100%] "
                    type="text"
                    required='true'
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    name='address'
                />
                <lable className="field-error-message">{formik.errors.address ? formik.errors.address : ""}</lable>

                <div className='flex flex-row gap-2 '>
                    <div className='flex flex-col '>
                        <label>City</label>
                        <input
                            placeholder="city"
                            className="address-input "
                            type="text"
                            required='true'
                            value={formik.values.city}
                            name='city'
                            onChange={formik.handleChange}
                        />
                        <lable className="field-error-message">{formik.errors.city ? formik.errors.city : ""}</lable>
                    </div>
                    <div className='flex flex-col'>
                        <label>State</label>
                        <input
                            placeholder="State"
                            className="address-input "
                            type="text"
                            required='true'
                            value={formik.values.state}
                            name='state'
                            onChange={formik.handleChange}
                        />

                        <lable className="field-error-message">{formik.errors.state ? formik.errors.state : ""}</lable>

                    </div>

                    <div className='flex flex-col'>
                        <label>ZIP Code</label>
                        <input
                            placeholder="ZIP Code"
                            className="address-input "
                            type="number"
                            required='true'
                            name='zipCode'

                            value={formik.values.zipCode}

                            onChange={formik.handleChange}
                        />
                        <lable className="field-error-message">{formik.errors.zipCode ? formik.errors.zipCode : ""}</lable>
                    </div>

                    <div className='flex flex-col'>

                        <label>Country</label>
                        <input
                            placeholder="Country"
                            className="address-input "
                            type="text"
                            required='true'
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            name='country'
                        />

                        <lable className="field-error-message">{formik.errors.country ? formik.errors.country : ""}</lable>
                    </div>
                </div>
                <button className="login-btn mt-5" type="submit" onClick={() => { console.log(formik.isValid) }}>Register</button>
                <p className="text-gray-500 text-sm flex flex-row  mt-5">
                    Already have an account?{" "}
                    <span>
                        {" "}
                        <button
                            onClick={handleLogin}
                            className="text-md underline text-blue-500"
                        >
                            Login
                        </button>
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Register 