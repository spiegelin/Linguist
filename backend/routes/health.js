import express from 'express';

const router = express.Router();

// Test endpoint
router.post('/', async (req, res) => {
    res.json({'Status' : 'Server OK'});
});

router.get('/', async (req, res) => {
    res.json({'Status' : 'Server OK'});
});

export default router;