import { getAllUsersExceptCurrent } from '../models/userModel.js';
import express from 'express';
import cookieJwtAuth from '../auth/cookieJwtAuth.js'; //No esta regresando nada el cliente de cookies, revisar logica

const router = express.Router();

router.get('/chatsExceptUser', cookieJwtAuth , async (req, res) => {

    try {
        const users = await getAllUsersExceptCurrent(req.user.user_id);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
