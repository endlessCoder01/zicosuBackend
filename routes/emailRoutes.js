const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, emailController.getAllEmails);
// router.get('/with_info/:id', authenticateToken, emailController.getAllAlertsByJoinId);
router.post('/not_signed',  emailController.createEmail);
router.delete('/:id', authenticateToken, emailController.deleteEmailById);

module.exports = router;
