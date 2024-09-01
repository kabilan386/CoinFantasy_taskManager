// src/components/Dashboard.js
import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneTaskQuery, useUpdateTaskMutation } from '../services/user';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const EditTask = () => {
    let { id } = useParams()
    const getOneService = useGetOneTaskQuery(id)
    const navigate = useNavigate();    
    const [updateTaskApi, resTaskAPI] = useUpdateTaskMutation();
    

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            dueDate: "",
            status: ""
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Title is required"),
            description: Yup.string()
                .required("Description is required "),
            dueDate: Yup.date()
                .required("Date is required"),
            status: Yup.string()
                .required("Status is required")

        }),
        onSubmit: (values) => {
            let data = {
                title: values.title,
                description: values.description,
                dueDate: values.dueDate,
                status: values.status
            }
            updateTaskApi({ id, data })
        }
    })
    
    useEffect(() => {
        if (getOneService.status === "fulfilled") {
            formik.setValues({
                title: getOneService?.data?.data?.title,
                description:  getOneService?.data?.data?.description,
                dueDate:  getOneService?.data?.data?.dueDate,
                status:  getOneService?.data?.data?.status,
                
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getOneService])
    useEffect(() => {
        if (resTaskAPI.isError) {
            if (resTaskAPI.error?.data?.status === false) {
                toast.error(resTaskAPI.error?.data?.message)
            } else {
                toast.error(JSON.stringify(resTaskAPI.error?.data?.errors[0]))
            }
        } else if (resTaskAPI.status === "fulfilled") {
            toast.success(resTaskAPI.data.message);
            navigate("/dashboard")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resTaskAPI])

    return (
        <div className='container-fluid'>
            <Header />
            <div className='container'>
                <h2>Update task</h2>
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
                    <div className="mb-3">
                        <label htmlFor="dateInput" className="form-label">Status </label>
                        <select className="form-control" name='status' onChange={formik.handleChange} value={formik.values.status}>
                            <option value="">Select status</option>
                            <option value="InProgress">InProgress</option>
                            <option value="Todo">Todo</option>
                            <option value="Done">Done</option>
                        </select>
                        {formik.touched.status && formik.errors.status ? <div className='form-error'>{formik.errors.status}</div> : null}
                    </div>
                   
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTask;