import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUserById);
router.delete('/:userId', deleteUserById);

export default router;