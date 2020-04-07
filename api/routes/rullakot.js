const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const RullakotController = require('../controllers/rullakot');

router.get('/get', checkAuth, RullakotController.rullakko_get_all);

router.post('/post', checkAuth,  RullakotController.rullakko_create_rullakot);

router.get('/get/id/:rullakkoId', checkAuth, RullakotController.rullakko_get_by_id);

router.put('/put/id/:rullakkoId', checkAuth, RullakotController.rullakko_update_by_id);

router.patch('/patch/id/:rullakkoId', checkAuth, RullakotController.rullakko_patch_by_id);

router.delete('/delete/id/:rullakkoId', checkAuth, RullakotController.rullakko_delete_by_id);

module.exports = router;