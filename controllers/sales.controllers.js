const sales = require('../services/sales.services');

const salesControllers = {
  async getAll(_req, res) {
    const data = await sales.getAll();
    return res.status(200).send(data);
  },

  async listId(req, res) {
    const { id } = req.params;
    const data = await sales.listId(id);
    return res.status(200).send(data);
  },

  async create(req, res) {
      const data = await sales.create(req.body);
      return res.status(201).send(data);
  }, 

  async edit(req, res) {
      const { id } = req.params;
      // const updates = req.body;
      const data = await sales.edit(id, req.body);
      return res.status(200).send(data);
  },

  async remove(req, res) {
    const { id } = req.params;
    await sales.remove(id);
    return res.sendStatus(204);
  },
};

module.exports = salesControllers;