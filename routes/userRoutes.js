const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.patch('/userUpdate/:id', authenticateToken, userController.updateUser);
router.get('/status/:status', authenticateToken, userController.getUserByStatus);

module.exports = router;
