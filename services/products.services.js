const productsModel = require('../models/products.models');
const error = require('../utils/error.utils');

const productsServices = {
  async getAll() {
    const data = await productsModel.getAll();
    return data;
  },
  async listId(id) {
    const data = await productsModel.listId(id);
    if (!data.length) throw error(404, 'Product not found');
    return data;
  },
  async create(name) {
    const found = await productsModel.findName(name);
    if (found.length) throw error(409, 'Product already exists');
  const data = await productsModel.create(name);
  return data;
  },
  async edit(id, name) {
    const data = await productsModel.edit(id, name);
    return data;
  },
  async remove(id) {
    await this.listId(id);
    await productsModel.remove(id);
  },
  async search(term) {
    const data = await productsModel.search(term);
    return data;
  },
};

module.exports = productsServices;