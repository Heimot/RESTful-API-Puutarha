const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ItemsController = require('../controllers/items');

router.get('/flowers', checkAuth, ItemsController.items_get_flowers);

router.get('/get/id/:itemId', checkAuth, ItemsController.items_get_flower_by_id);

router.post('/flowers/post', checkAuth, ItemsController.items_post_flowers);

router.delete('/delete/id/:itemId', checkAuth, ItemsController.items_delete_flowers);

router.patch('/patch/id/:itemId', checkAuth, ItemsController.items_patch_flowers);

router.put('/put/id/:itemId', checkAuth, ItemsController.items_update_flowers);


module.exports = router;