// src/components/Dashboard.js
import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import { useServiceMutation } from '../services/user';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const ServiceRequest = () => {

  const navigate = useNavigate();
  
  const [createServiceApi, resServiceAPI] = useServiceMutation()
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: ""
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string()
        .required("Description is required "),
      dueDate: Yup.date()
        .required("Date is required")

    }),
    onSubmit: (values) => {
      let payloads = {
        title: values.title,
        description: values.description,
        dueDate: values.dueDate
      }
      createServiceApi(payloads)
    }
  })
  useEffect(() => {
    if (resServiceAPI.isError) {
      if (resServiceAPI.error?.data?.status === false) {
        toast.error(resServiceAPI.error?.data?.message)
      } else {
        toast.error(JSON.stringify(resServiceAPI.error?.data?.errors[0]))
      }
    } else if (resServiceAPI.status === "fulfilled") {
      toast.success(resServiceAPI.data.message);
      navigate("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resServiceAPI])
  return (
    <div className='container-fluid'>
      <Header />
      <div className='container'>
        <h2>Task Create</h2>
        <form className='mt-3' onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="textInput" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="textInput"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title ? <div className='form-error'>{formik.errors.title}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="selectOption" className="form-label">Description</label>
            <textarea className='form-control' id="selectOption"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}></textarea>

            {formik.touched.description && formik.errors.description ? <div className='form-error'>{formik.errors.description}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="dateInput" className="form-label">Date </label>
            <input
              type="date"
              className="form-control"
              id="dateInput"
              name="dueDate"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
            />
            {formik.touched.dueDate && formik.errors.dueDate ? <div className='form-error'>{formik.errors.dueDate}</div> : null}
          </div>
          <div className='d-flex justify-content-end'>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequest;