const connection = require('./connection');

const salesModels = {
  async getAll() {
    const [data] = await connection.execute(
      `SELECT sp.sale_id AS saleId, ss.date, sp.product_id AS productId,
      sp.quantity 
      FROM StoreManager.sales AS ss 
      JOIN StoreManager.sales_products AS sp
      ON ss.id = sp.sale_id 
      ORDER BY sp.sale_id, sp.product_id `,
    );
    return data;
  },

  async listId(id) {
    const [data] = await connection.execute(
      `SELECT ss.date, sp.product_id AS productId, sp.quantity 
      FROM StoreManager.sales AS ss 
      JOIN StoreManager.sales_products AS sp
      ON ss.id = sp.sale_id
      WHERE ss.id = ?
      ORDER BY sp.sale_id, sp.product_id `, [id],
    );
    return data;
  },
  async create() {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES (?)', [new Date()],
    );
    return insertId;
  },
  async createSP(saleId, array) {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, array.productId, array.quantity],
      );
    return insertId;
  },
  async edit(saleId, array) {
    const [{ affectedRows }] = await connection.query(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id =  ? AND product_id = ?',
      [array.quantity, saleId, array.productId],
    );
    return affectedRows;
  },
  async remove(id) {
    const [{ affectedRows }] = await connection.query(
      'DELETE FROM StoreManager.sales WHERE id = ?', [id],
    );
    return affectedRows;
  },
}; 

module.exports = salesModels;