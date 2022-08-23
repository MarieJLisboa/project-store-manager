const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales.models');

describe('Sales model', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testa a função getAll', () => {
    it('Se lista um array', async () => {
      const mock = [
  {
    "saleId": 1,
    "date": "2022-07-17T21:16:20.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-07-17T21:16:20.000Z",
    "productId": 3,
    "quantity": 15
  }
]

      sinon.stub(connection, 'execute').resolves([mock]);

      const result = await salesModel.getAll();

      expect(result).to.deep.equal(mock);
    });
  });

  describe('Testa a função listId', () => {
    it('Retorna o produto referente ao id', async () => {
      const mock = { id: 1, name: 'Martelo de Thor' };

      sinon.stub(connection, 'execute').resolves([mock]);

      const result = await salesModel.listId(1);

      expect(result).to.deep.equal(mock);
    });

    it('Retorna undefined, caso o produto não seja encontrado', async () => {
      sinon.stub(connection, 'execute').resolves([undefined]);

      const result = await salesModel.listId(999);

      expect(result).to.be.undefined;
    });
  });

  describe('Testa a função create', () => {
    it('Deve retornar o insertId', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      
      const result = await salesModel.create();

      expect(result).to.be.equal(1);
    });
  });

  describe('Testa a função createSP', () => {
    it('Deve retornar o insertId', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      
      const result = await salesModel.createSP(1, { productId: 1, quantity: 1 });

      expect(result).to.be.equal(1);
    });
  });

  describe('Testa a função edit', () => {
    it('Deve retornar  o id da coluna alterada', async () => {
      sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }]);
      
      const result = await salesModel.edit(1, { productId: 1, quantity: 1 });

      expect(result).to.be.equal(1);
    });
  });

  describe('Testa a função remove', () => {
    it('Deve retornar o id da coluna deletada', async () => {
      sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.remove(1);

      expect(result).to.be.equal(1);
    });
  });
});