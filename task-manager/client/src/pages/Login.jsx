// src/components/Login.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../services/user';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { connectSocket } from '../socket';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate()
  const [loginApi, resLoginAPI] = useLoginMutation()
  const formik = useFormik({
    initialValues: {
      email: "",     
      password: "",      
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,15}$/,
          'Password must contain at least one digit, one special character, one uppercase letter, and be between 8 to 15 characters long'
        )      
    }),
    onSubmit: (values) => {
      let payloads = {
        email : values.email,
        phonenumber : values.phonenumber,
        password : values.password
      }
      loginApi(payloads)
    }
  })
  useEffect(() => {
    if(resLoginAPI.isError){
      if(resLoginAPI.error?.data?.status === false){
        toast.error(resLoginAPI.error?.data?.message)
      }else{
        toast.error(JSON.stringify(resLoginAPI.error?.data?.errors[0]))
      }
    }else if(resLoginAPI.status === "fulfilled"){
      toast.success(resLoginAPI.data.message);
      connectSocket();
      localStorage.setItem("token",resLoginAPI.data.token)
      setTimeout(() => {
        navigate("/dashboard")  
      }, 1000); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resLoginAPI])
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="container content">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form className='mt-4' onSubmit={formik.handleSubmit}>
                <div className="form-group mt-2">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control mt-2"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                {formik.touched.email && formik.errors.email ? <div className='form-error'>{formik.errors.email}</div> : null}
                <div className="form-group mt-2">
                  <label htmlFor="password">Password:</label>
                  <div className="input-group mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control "
                      id="password"
                      name='password'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </button>
                  </div>
                </div>
                {formik.touched.password && formik.errors.password ? <div className='form-error'>{formik.errors.password}</div> : null}
                <div className='d-flex justify-content-end'>
                  <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
                </div>
                <div className="d-flex justify-content-end mt-2">
                  <p>Don't have an account? <Link to="/register" className="">Sign Up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;