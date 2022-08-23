const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/sales.models');
const salesService = require('../../../services/sales.services');


describe('Sales Service', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testa a fução getAll', () => {
    it('Deve listar o array de vendas', async () => {
      const mock = [
        {
          "saleId": 1,
          "date": "2022-07-18T13:12:12.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "saleId": 1,
          "date": "2022-07-18T13:12:12.000Z",
          "productId": 2,
          "quantity": 10
        },
        {
          "saleId": 2,
          "date": "2022-07-18T13:12:12.000Z",
          "productId": 3,
          "quantity": 15
        }
      ];

      sinon.stub(salesModel, 'getAll').resolves(mock);

      const result = await salesService.getAll();

      expect(result).to.deep.equal(mock);
    });
  });

  describe('testa a função listId', () => {
    it('Retorna o produto referente ao id', async () => {
      const mock = [
        {
          "saleId": 1,
          "date": "2022-07-18T13:12:12.000Z",
          "productId": 1,
          "quantity": 5
        }];
      
      sinon.stub(salesModel, 'listId').resolves(mock);

      const result = await salesService.listId(1);

      expect(result).to.deep.equal(mock);
    });
    it('Retorna undefined, caso a venda não seja encontrado', async () => {
  
      return expect(salesService.listId(999)).to.eventually.be.rejectedWith('Sale not found');
    });
  });

  describe('Testa a função create ', () => {
    it('Deve retornar o insertId', async () => {
      const mock = [{
          productId: 1,
          quantity: 5,
        }];

      sinon.stub(salesModel, 'create').resolves(1);

      const result = await salesService.create(mock);

      expect(result.id).to.equal(1);
    });
  });

  describe('Testa a função edit', () => {
    it('Deve retornar o mesmo saleId', async () => {
      const mock = [
        {
          "saleId": 1,
          "date": "2022-07-18T13:12:12.000Z",
          "productId": 1,
          "quantity": 5
        }];
      
      sinon.stub(salesModel, 'create');

      const result = await salesService.edit(1, mock);

      expect(result.saleId).to.be.equal(mock[0].saleId);
    });
  });

  describe('Testa a função remove', () => {
    it('Deve retornar true se o id for deletado', async () => {
      sinon.stub(salesModel, 'remove').resolves(true);

      const result = await salesService.remove(1);

      expect(result).to.be.true;
    });
  });
});