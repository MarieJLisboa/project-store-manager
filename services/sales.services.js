const salesModel = require('../models/sales.models');
const error = require('../utils/error.utils');

const salesServices = {
  async getAll() {
    const data = await salesModel.getAll();
    return data;
  },
  async listId(id) {
    const data = await salesModel.listId(id);
    if (!data.length) throw error(404, 'Sale not found');
    return data;
  },
  async create(array) {
    const saleId = await salesModel.create();
    const result = array.map((sale) => salesModel.createSP(saleId, sale));
    await Promise.all(result);
    return { id: saleId, itemsSold: array };
  },
  async edit(id, array) {
    await this.listId(id);
    const updated = array.map((sale) => salesModel.edit(id, sale));
    await Promise.all(updated);
    return { saleId: id, itemsUpdated: array };
  },
  async remove(id) {
    await this.listId(id);
    return salesModel.remove(id);
  },
};

module.exports = salesServices;