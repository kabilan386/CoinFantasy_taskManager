const { Task, User } = require("../models")
const moment = require('moment');
// create service request 
exports.taskCreateService = async (id, user, title, description, dueDate) => {
    const formattedDate = moment(dueDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    try {
        console.log("dueDate", formattedDate)
        const service = await Task.create(
            {
                title,
                description,
                dueDate: formattedDate,
                status: "Todo",
                userId: id
            });

        return service;
    } catch (error) {
        throw error; // Propagate the error to the controller
    }
}
// Update task
exports.taskUpdateService = async (id, taskId, title, description, dueDate , status) => {
    const formattedDate = moment(dueDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    try {
        const task = await Task.findByPk(taskId);
        if (task) {
            await task.update({
                title,
                description,
                dueDate: formattedDate,
                status: status,
            });
        }
        return task;
    } catch (error) {
        throw error; // Propagate the error to the controller
    }
}
// Get all servive for logged in user
exports.getAllTask = async (id) => {
    try {
        const tasks = await Task.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: ['id'],
            },
        });
        return tasks;
    } catch (error) {
        throw error; // Propagate the error to the controller
    }
}
// Get one task details for logged in user
exports.getOneTask = async (id, taskId) => {
    console.log("taskId", taskId)
    try {
        const task = await Task.findByPk(taskId, {
            include: {
                model: User,
                as: 'user',
                attributes: ['id'],
            },
        });
        return task;
    } catch (error) {
        throw error; // Propagate the error to the controller
    }
}


// Remove one task details for logged in user
exports.removeOneTask = async ( taskId) => {
    try {
        const task = await Task.findByPk(taskId);
        await task.destroy();
    } catch (error) {
        throw error; // Propagate the error to the controller
    }
}