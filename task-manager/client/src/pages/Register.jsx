// src/components/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../services/user';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [registerApi, resRegisterAPI] = useRegisterMutation()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,15}$/,
          'Password must contain at least one digit, one special character, one uppercase letter, and be between 8 to 15 characters long'
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      
    }),
    onSubmit: (values) => {
      let payloads = {
        email: values.email,
        phonenumber: values.phonenumber,
        password: values.password
      }
      registerApi(payloads)
    }
  })
  useEffect(() => {
    if (resRegisterAPI.isError) {
      if (resRegisterAPI.error?.data?.status === false) {
        toast.error(resRegisterAPI.error?.data?.message)
      } else {
        toast.error(JSON.stringify(resRegisterAPI.error?.data?.errors[0]))
      }
    } else if (resRegisterAPI.status === "fulfilled") {
      toast.success(resRegisterAPI.data.message);
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resRegisterAPI])
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="container content">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mt-2">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control mt-2"
                    id="email"
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                {formik.touched.email && formik.errors.email ? <div className='form-error'>{formik.errors.email}</div> : null}
               
                <div className="form-group mt-3">
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
                <div className="form-group mt-3">
                  <label htmlFor="Cpassword">Confirm password:</label>
                  <div className="input-group mt-2">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control "
                      id="Cpassword"
                      name='confirmPassword'
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </button>
                  </div>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className='form-error'>{formik.errors.confirmPassword}</div> : null}
                <div className='d-flex justify-content-end mt-3'>
                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                </div>
                <div className="text-end mt-2">
                  <p>Already have an account? <Link to="/" className="">Login</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;