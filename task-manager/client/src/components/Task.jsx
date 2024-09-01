// src/components/Table.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteTaskMutation } from '../services/user';
import { toast } from 'react-toastify';
const Task = ({ data, status , reFetchCall }) => {

  let navigate = useNavigate();
  const [deleteTaskAPI , resDeleteTask] = useDeleteTaskMutation()
  const navigateToEdit = (id) => navigate(`/edit-task/${id}`)

  const deleteTask = (id) => {
    deleteTaskAPI(id)
  }

  useEffect(() => {
    if (resDeleteTask.isError) {
      if (resDeleteTask.error?.data?.status === false) {
        toast.error(resDeleteTask.error?.data?.message)
      } else {
        toast.error(JSON.stringify(resDeleteTask.error?.data?.errors[0]))
      }
    } else if (resDeleteTask.status === "fulfilled") {
      toast.success(resDeleteTask.data.message);
      reFetchCall()
      navigate("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resDeleteTask])
  const All = () => {
    return (
      <>
        {data?.map((value, index) => <div key={index} className="task-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1"><button className='task-title' >{value?.title}</button></h5>
              <small className="text-muted">{value.status}</small>
            </div>
            <div className='d-flex justify-content-between align-items-center gap-1'>
              <button onClick={() => navigateToEdit(value?.id)} className="btn btn-outline-secondary">Edit</button>
              <button onClick={() => deleteTask(value?.id)} className="btn btn-outline-danger">Delete</button>
            </div>
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
            <div className='d-flex justify-content-between align-items-center gap-1'>
              <button onClick={() => navigateToEdit(value?.id)} className="btn btn-outline-secondary">Edit</button>
              <button onClick={() => deleteTask(value?.id)} className="btn btn-outline-danger">Delete</button>
            </div>
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
            <div className='d-flex justify-content-between align-items-center gap-1'>
              <button onClick={() => navigateToEdit(value?.id)} className="btn btn-outline-secondary">Edit</button>
              <button onClick={() => deleteTask(value?.id)} className="btn btn-outline-danger">Delete</button>
            </div>
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
            <div className='d-flex justify-content-between align-items-center gap-1'>
              <button onClick={() => navigateToEdit(value?.id)} className="btn btn-outline-secondary">Edit</button>
              <button onClick={() => deleteTask(value?.id)} className="btn btn-outline-danger">Delete</button>
            </div>
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
      {status === "Todo" && Todo()}
      {status === "Done" && Done()}


    </div>
  );
};

export default Task;