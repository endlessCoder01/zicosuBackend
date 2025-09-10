const express = require('express');
const router = express.Router();
const sentimentsController = require('../controllers/sentimentsController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, sentimentsController.getAllSentiments);
router.get('/:id', authenticateToken, sentimentsController.getSentimentById);
// router.patch('/userUpdate/:id', authenticateToken, sentimentsController.);
// router.get('/status/:status', authenticateToken, sentimentsController.getUserByStatus);

module.exports = router;
