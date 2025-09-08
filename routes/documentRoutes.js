const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentContoller');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, documentController.getAllDocuments);
router.post('/', authenticateToken, documentController.createDocument);
router.get('/:id', authenticateToken, documentController.getCountById);

module.exports = router;
