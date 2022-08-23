const products = require('../services/products.services');

const productsControllers = {
  async getAll(_req, res) {
    const allProducts = await products.getAll();
    return res.status(200).send(allProducts);
  },
  async listId(req, res) {
    const { id } = req.params;
    const [listPoducts] = await products.listId(id);
    return res.status(200).send(listPoducts);
  },
  async create(req, res) {
    const { name } = req.body;
    const data = await products.create(name);
    return res.status(201).send(data);
  },
  async edit(req, res) {
      const { id } = req.params;
    const { name } = req.body;
    await products.listId(id);
    const data = await products.edit(id, name);
      return res.status(200).send(data);
  },
  async remove(req, res) {
      const { id } = req.params;
      await products.remove(id);
      return res.sendStatus(204);
  },
  async search(req, res) {
    const { q: term } = req.query;
    let query;
    if (term) {
      query = await products.search(term);
    } else {
      query = await products.getAll();
    }
    return res.status(200).send(query);
  },
};

module.exports = productsControllers;