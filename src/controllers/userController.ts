
import { Request, Response } from 'express';
import  Users  from '../models/users';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await Users.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await Users.findByPk(req.params.userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
};

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const [updated] = await Users.update(req.body, {
            where: { id: req.params.userId }
        });
        if (updated) {
            const updatedUser = await Users.findByPk(req.params.userId);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await Users.destroy({
            where: { id: req.params.userId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
};
