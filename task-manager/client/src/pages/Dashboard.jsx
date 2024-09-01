// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import { useGetRequestTaskQuery } from '../services/user';
import Task from '../components/Task';
import socket, { connectSocket } from '../socket';
const Dashboard = () => {
  const [status, setStatus] = useState("All");
  const [task, setTask] = useState()
  const getAllTask = useGetRequestTaskQuery()
  const navigate = useNavigate();
  useEffect(() => {
    getAllTask.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigatetoCreateTask = () => navigate("/create-task")
  useEffect(() => {
    connectSocket()
    socket.on('task', (newTasks) => {
      console.log('Received tasks:', newTasks);
      setTask(newTasks)
    });
    return () => {
      socket.disconnect();
    };
  }, [])
  useEffect(() => {
    if (getAllTask.status === 'fulfilled') {
      setTask(getAllTask?.data?.data)
    }
  }, [getAllTask])

  const reFetchCall = () => {
    getAllTask.refetch()
  }

  return (
    <div className='container-fluid'>
      <Header />
      <div className="container-fluid">
        <div className="row">
          {/* <!-- Sidebar --> */}
          <nav className="col-md-2 col-12 d-md-block sidebar">
            <div className="list-group">
              <button onClick={() => setStatus("All")} className={`list-group-item list-group-item-action ${status === "All" ? "active" : ""}`}>All Tasks</button>
              <button onClick={() => setStatus("InProgress")} className={`list-group-item list-group-item-action ${status === "InProgress" ? "active" : ""}`}>In Progress</button>
              <button onClick={() => setStatus("Todo")} className={`list-group-item list-group-item-action ${status === "Todo" ? "active" : ""}`}>To Do</button>
              <button onClick={() => setStatus("Done")} className={`list-group-item list-group-item-action ${status === "Done" ? "active" : ""}`}>Done</button>
            </div>
          </nav>

          {/* <!-- Main Content --> */}
          <main className="col-md-10 ms-sm-auto col-lg-10 col-12 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">Your Tasks</h1>
              <div>
                <button onClick={navigatetoCreateTask} className="btn btn-primary">+ Add Task</button>
              </div>
            </div>



            {/* <!-- Task Cards --> */}
            <Task data={task} status={status} reFetchCall={reFetchCall} />
          </main>
        </div>
      </div>

    </div>

  );
};

export default Dashboard;