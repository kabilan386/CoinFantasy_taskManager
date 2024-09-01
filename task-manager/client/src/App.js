
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceRequest from './pages/CreateTask';
import EditTask from './pages/EditTask';
function App() {
  return (
    <div>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-task" element={<ServiceRequest/>} />
          <Route path="/edit-task/:id" element={<EditTask/>} />
          {/* <Route path="/detais/:id" element={<ViewService/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
