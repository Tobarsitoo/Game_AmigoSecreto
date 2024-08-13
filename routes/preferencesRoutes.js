const express = require('express');
const router = express.Router();
const preferencesController = require('../controllers/preferencesController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/dulces', isAuthenticated, preferencesController.addDulce);
router.post('/regalos', isAuthenticated, preferencesController.addRegalo);
router.get('/dulces', isAuthenticated, preferencesController.getDulcesByUser);
router.get('/regalos', isAuthenticated, preferencesController.getRegalosByUser);
router.delete('/dulces/:id', isAuthenticated, preferencesController.deleteDulce);
router.delete('/regalos/:id', isAuthenticated, preferencesController.deleteRegalo);

module.exports = router;