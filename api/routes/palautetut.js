const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const PalautetutController = require('../controllers/palautetut');

router.get('/get', checkAuth, PalautetutController.palautetut_get_all);

router.post('/post', checkAuth,  PalautetutController.palautetut_create_rullakot);

router.get('/get/id/:palautetutId', checkAuth, PalautetutController.palautetut_get_by_id);

router.put('/put/id/:palautetutId', checkAuth, PalautetutController.palautetut_update_by_id);

router.patch('/patch/id/:palautetutId', checkAuth, PalautetutController.palautetut_patch_by_id);

router.delete('/delete/id/:palautetutId', checkAuth, PalautetutController.palautetut_delete_by_id);

module.exports = router;