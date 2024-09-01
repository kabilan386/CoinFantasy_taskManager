const { User, Task } = require("../models");
const { taskCreateService, getAllTask, getOneTask, taskUpdateService, removeOneTask } = require("../services/taskService")
// Create a service for service request
const taskService = async (req, res) => {
    const { title, description, dueDate , status } = req.body
    const user = User.findOne({ _id: req.authData.id });
    const io =  req.io
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    try {
        const taskCreate = await taskCreateService(req.authData.id, user, title, description, dueDate , status);
        const tasks = await Task.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: ['id'],
            },
        });
        
        io.emit('task', tasks);
        return res.status(201).json({
            message: "Create task successfully",
            taskCreate
        })
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ status: false, message: error.message })
    }

}
// Update task
const Updatetask = async (req, res) => {
    const { title, description, dueDate ,status } = req.body
    const user = await User.findByPk(req.authData.id);
    const { id } = req.params
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    // const task = await Task.findByPk(id);
    // // Check if the authenticated user is the owner of the task
    // if (task.userId !== user.id) {
    //     return res.status(403).json({ status: false, message: "You are not the owner of this task" });
    // }

    try {
        const taskCreate = await taskUpdateService(req.authData.id, id, title, description, dueDate , status);
        return res.status(201).json({
            message: "Update task successfully",
            taskCreate
        })
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ status: false, message: error.message })
    }

}
// Get all requested task
const getAllRequestTask = async (req, res) => {
    try {
        const requestTask = await getAllTask(req.authData.id);

        return res.status(200).json({
            status: true,
            message: "Task details fetched successfully",
            data: requestTask
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
// Get one Task from logged user
const getOneTaskController = async (req, res) => {

    const { id } = req.params
    try {
        const requestOneTask = await getOneTask(req.authData.id, id);
        return res.status(200).json({
            status: true,
            message: "Task details fetched successfully",
            data: requestOneTask
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
// Remove taks 
const removeOneTaskController = async (req, res) => {
    const { id } = req.params
    const user = await User.findByPk(req.authData.id);
    const task = await Task.findByPk(id);
    // Check if the authenticated user is the owner of the task
    if (task.userId !== user.id) {
        return res.status(403).json({ status: false, message: "You are not the owner of this task" });
    }
    try {
        const requestOneTask = await removeOneTask(id);
        return res.status(200).json({
            status: true,
            message: "Task details removed successfully",
            data: requestOneTask
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
// Export controller modules 
module.exports = {
    taskService,
    getAllRequestTask,
    Updatetask,
    getOneTaskController,
    removeOneTaskController
}