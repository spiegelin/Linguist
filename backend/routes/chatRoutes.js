import { getAllUsersExceptCurrent, getUsersWithSameLanguage } from '../models/userModel.js';
import express from 'express';
import cookieJwtAuth from '../auth/cookieJwtAuth.js'; //No esta regresando nada el cliente de cookies, revisar logica

const router = express.Router();

router.get('/chatsExceptUser', cookieJwtAuth , async (req, res) => {
    try {
      const users = await getAllUsersExceptCurrent(req.user.user_id);
  
      if (users && users.length > 0) {
        const usersWithBase64Images = users.map(user => {
          if (user.profile_image) {
            const imageBuffer = user.profile_image;
            const imageBase64 = Buffer.from(imageBuffer).toString('base64');
            user.profile_image = `data:image/jpeg;base64,${imageBase64}`;
          }
          return user;
        });
  
        res.json(usersWithBase64Images);
      } else {
        res.json(users); // Devuelve la lista de usuarios aunque esté vacía
      }
    } catch (err) {
      console.error('Internal server error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.get('/chats-with-same-language', cookieJwtAuth, async (req, res) => {
    const userId = req.user.user_id;
    const users = await getUsersWithSameLanguage(userId);
    res.send(users);
});

export default router;
