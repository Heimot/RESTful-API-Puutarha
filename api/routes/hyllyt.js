const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const HyllytController = require('../controllers/hyllyt');

router.get('/get', checkAuth, HyllytController.hylly_get_all);

router.post('/post', checkAuth,  HyllytController.hylly_create_rullakot);

router.get('/get/id/:hyllyId', checkAuth, HyllytController.hylly_get_by_id);

router.put('/put/id/:hyllyId', checkAuth, HyllytController.hylly_update_by_id);

router.patch('/patch/id/:hyllyId', checkAuth, HyllytController.hylly_patch_by_id);

router.delete('/delete/id/:hyllyId', checkAuth, HyllytController.hylly_delete_by_id);

module.exports = router;