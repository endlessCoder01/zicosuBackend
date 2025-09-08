const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, alertController.getAllAlerts);
router.get('/with_info', authenticateToken, alertController.getAllAlertsByJoin);
router.get('/with_info/:id', authenticateToken, alertController.getAllAlertsByJoinId);
router.post('/', authenticateToken, alertController.createAlert);
router.delete('/:id', authenticateToken, alertController.deleteAlertById);

module.exports = router;
