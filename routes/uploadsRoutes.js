const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploadsController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, uploadsController.getAllUploads);
router.post('/', authenticateToken, uploadsController.createUpload);
router.get('/:id', authenticateToken, uploadsController.getUploadsByReg);

module.exports = router;
