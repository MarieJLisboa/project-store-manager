const connection = require('./connection');

const productsModel = {
  async getAll() {
    const [data] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');
    return data;
  },

  async listId(id) {
    const [data] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?', [id],
    );
    return data;
  },

  async findName(name) {
    const [data] = await connection.execute(
      'SELECT * FROM  StoreManager.products WHERE name = ?', [name],
    );
    return data;
  },

  async create(name) {
    const [{ insertId }] = await connection
      .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);
    return { id: insertId, name };
  },

  async edit(id, name) {
  await connection.execute(
      'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
    );
    return { id, name };
  },

  async remove(id) {
    connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  },

  async search(term) {
    const [data] = await connection
      .query('SELECT * FROM  StoreManager.products WHERE name LIKE ?', [`%${term}%`]);
    return data;
  },

};

module.exports = productsModel;