const express = require('express');
const { adminLogin } = require('../controllers/auth/loginController');
const { protect } = require('../middleware/authMiddleware');
const { getTasks, addTask, toggleTask, deleteTask } = require('../controllers/admin/taskController');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/tasks', protect, getTasks);
router.post('/tasks', protect, addTask);
router.patch('/tasks/:id', protect, toggleTask);
router.delete('/tasks/:id', protect, deleteTask);


module.exports = router;