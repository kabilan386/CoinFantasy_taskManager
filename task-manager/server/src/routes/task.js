const router = require("express").Router();
const taskController = require("../controllers/taskController");
const taskValidator = require("../validators/task_validator")
const verifyToken = require("../middleware/authenticate");
// Route for create task
router.post('/',verifyToken,taskValidator.userValidationRules(), taskValidator.validate, taskController.taskService);
// Route for update task
router.put('/:id',verifyToken,taskValidator.userValidationRules(), taskValidator.validate, taskController.Updatetask);
// Get specific task
router.get('/:id',verifyToken, taskController.getOneTaskController);

// Route for get all task
router.get('/',verifyToken, taskController.getAllRequestTask);

// Rooute for delete task
router.delete('/:id',verifyToken, taskController.removeOneTaskController);



module.exports = router;