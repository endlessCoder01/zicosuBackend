const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const documentationController = require('../controllers/documentContoller');
const farmController = require('../controllers/farmController')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/documents', documentationController.createDocument);
router.post('/register/farm', farmController.createFarm);
router.post('/refresh', authController.refreshToken);

module.exports = router;
