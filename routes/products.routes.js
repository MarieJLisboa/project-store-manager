const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');

const productsControllers = require('../controllers/products.controllers');
const { validateProduct } = require('../middlewares/products/products.middlewares');

router.get('/search', rescue(productsControllers.search));

router.get('/', rescue(productsControllers.getAll));

router.get('/:id', rescue(productsControllers.listId));

router.post('/', validateProduct, rescue(productsControllers.create));

router.put('/:id', validateProduct, rescue(productsControllers.edit));

router.delete('/:id', rescue(productsControllers.remove));

module.exports = router;