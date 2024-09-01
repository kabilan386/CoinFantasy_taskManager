// src/pages/view.js
import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useGetOneRequestServiceQuery } from '../services/user';
import { useParams } from 'react-router-dom';
const ViewService = () => {
    let { id } = useParams()
    const getOneService = useGetOneRequestServiceQuery(id)
    const navigate = useNavigate();
    return (
        <div className='container-fluid'>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-end my-3'>
                        <button className='btn btn-secondary' onClick={() => navigate(-1)}>Go back</button>
                    </div>
                    <div className='col-6 offset-3'>
                        <div className='d-flex justify-content-between my-3'>
                            <label>Bike modal</label>
                            <label>{getOneService?.data?.data?.bikeModal}</label>
                        </div>
                        <div className='d-flex justify-content-between my-3'>
                            <label>Service</label>
                            <label>{getOneService?.data?.data?.serviceType?.serviceType}</label>
                        </div>
                        <div className='d-flex justify-content-between my-3'>
                            <label>Date</label>
                            <label>{new Date(getOneService?.data?.data?.serviceDate).toLocaleDateString()}</label>
                        </div>
                        <div className='d-flex justify-content-between my-3 '>
                            <label>Status</label>
                            <label>{getOneService?.data?.data?.status}</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewService;