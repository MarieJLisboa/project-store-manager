const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');

const salesControllers = require('../controllers/sales.controllers');
const { validateSales, validateProductsId } = require('../middlewares/sales/sales.middlewares');

router.get('/', rescue(salesControllers.getAll));

router.get('/:id', rescue(salesControllers.listId));

router.post('/', validateSales, validateProductsId, rescue(salesControllers.create));

router.put('/:id', validateSales, validateProductsId, rescue(salesControllers.edit));

router.delete('/:id', rescue(salesControllers.remove));

module.exports = router; 