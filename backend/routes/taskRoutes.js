import express from 'express';
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', toggleTask);
router.put('/:id/edit', updateTask);

export default router;
