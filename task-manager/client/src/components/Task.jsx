// src/components/Table.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Task = ({ data, status }) => {

  let navigate  = useNavigate();

  const navigateToEdit = (id) => navigate(`/edit-task/${id}`)

  const All = () => {
    return (
      <>
        {data?.map((value, index) => <div key={index} className="task-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1"><button className='task-title' >{value?.title}</button></h5>
              <small className="text-muted">{value.status}</small>
            </div>
            <button onClick={() => navigateToEdit(value?.id)} className="btn btn-outline-secondary">Edit</button>
          </div>
        </div>)}
        {data?.length === 0 && "No task found"}
      </>
    )
  }

  const Progress = () => {

    const progressData = data?.filter(item => item.status === "InProgress")

    return (
      <>
        {progressData?.map((value, index) => <div key={index} className="task-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1"><button className='task-title'>{value.title}</button></h5>
              <small className="text-muted">In Progress</small>
            </div>
            <button onClick={() => navigateToEdit(value?.id)} className="btn btn-outline-secondary">Edit</button>
          </div>
        </div>)}

        {progressData?.length === 0 && "No task found"}
      </>
    )
  }

  const Todo = () => {

    const progressData = data?.filter(item => item.status === "Todo")

    return (
      <>
        {progressData?.map((value, index) => <div key={index} className="task-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1"><button className='task-title'>{value.title}</button></h5>
              <small className="text-muted">Todo</small>
            </div>
            <button onClick={() => navigateToEdit(value?.id)} className="btn btn-outline-secondary">Edit</button>
          </div>
        </div>)}

        {progressData?.length === 0 && "No task found"}
      </>
    )
  }

  const Done = () => {

    const progressData = data?.filter(item => item.status === "Done")

    return (
      <>
        {progressData?.map((value, index) => <div key={index} className="task-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1"><button className='task-title'>{value.title}</button></h5>
              <small className="text-muted">Done</small>
            </div>
            <button onClick={() => navigateToEdit(value?.id)} className="btn btn-outline-secondary">Edit</button>
          </div>
        </div>)}

        {progressData?.length === 0 && "No task found"}
      </>
    )
  }

  return (
    <div className='overflow-auto h-80vh'>

      {status === "All" && All()}
      {status === "InProgress" && Progress()}
      {status === "Todo" &&  Todo()}
      {status === "Done" && Done()}


    </div>
  );
};

export default Task;