import express from 'express';
import * as tasksController from '../controller/tasksController.js';

const router = express.Router();

router.get('/', tasksController.getAllTasks)
router.get('/add', (req, res) => {
    res.render('addTask');
});
router.post('/', tasksController.createTask); 
router.get('/:id/edit', tasksController.getEditTaskForm);
router.post('/:id/update', tasksController.updateTask); 

router.get('/delete/:id', tasksController.deleteTask);

export default router 