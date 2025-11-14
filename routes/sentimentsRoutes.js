const express = require('express');
const router = express.Router();
const sentimentsController = require('../controllers/sentimentsController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, sentimentsController.getAllSentiments);
router.get('/del',  sentimentsController.deleteAll);
router.get('/with_full_detail', authenticateToken, sentimentsController.getAllSentimentsWithUsers);
router.get('/:id', authenticateToken, sentimentsController.getSentimentById);
router.get('/all/by_user', authenticateToken, sentimentsController.getSentimentByReg);
router.post('/', authenticateToken, sentimentsController.createSentiment);
router.patch('/:sentId', authenticateToken, sentimentsController.updateSentiment);


module.exports = router;
