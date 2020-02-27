const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

router.get('/', checkAuth, ProductsController.products_get_all);

router.get('/tables', checkAuth, ProductsController.products_get_date);

router.post('/', checkAuth, ProductsController.products_create_product);

router.get('/:productId', checkAuth, ProductsController.products_get_product);

router.put('/:productId', checkAuth, ProductsController.products_update_product);

router.patch('/:productId', checkAuth, ProductsController.products_update_product_patch);

router.delete('/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;