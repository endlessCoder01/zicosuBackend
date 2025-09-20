const express = require('express');
const router = express.Router();
const nextOfKinController = require('../controllers/nextOfKinController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, nextOfKinController.getAllNoks);
router.post('/', authenticateToken, nextOfKinController.createNok);
router.get('/:id', authenticateToken, nextOfKinController.getNokById);
router.patch('/new/Update', authenticateToken, nextOfKinController.updateNok);
router.get('/all/byReg', authenticateToken, nextOfKinController.getNokByReg);

module.exports = router;
