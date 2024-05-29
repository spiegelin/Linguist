import { getAllUsersExceptCurrent } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();

router.get('/allUsersExceptUser', async (req, res) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
        const decoded_user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded_user);
        //req.user = user;
        const userId = decoded_user.user_id;
        console.log(userId);
        const users = await getAllUsersExceptCurrent(userId);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
