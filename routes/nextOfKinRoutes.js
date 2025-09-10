const express = require('express');
const router = express.Router();
const nextOfKinController = require('../controllers/nextOfKinController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, nextOfKinController.getAllNoks);
router.get('/:id', authenticateToken, nextOfKinController.getNokById);
// router.patch('/userUpdate/:id', authenticateToken, nextOfKinController.updateUser);
router.get('/byReg/:id', authenticateToken, nextOfKinController.getNokByReg);

module.exports = router;
