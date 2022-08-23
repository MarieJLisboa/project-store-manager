const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/sales.services');
const salesController = require('../../../controllers/sales.controllers');

describe('Sales controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testa a função getAll', () => {
    it('Se lista o produto referente ao id', async () => {
      const mock = [
        { date: '2022-07-17T01:32:47.000Z', productId: 1, quantity: 5 },
        
      ];

      const req = {};
      const res = {};

      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub();

      sinon.stub(salesService, 'getAll').resolves(mock);

      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(mock)).to.be.true;
    });
  });

    describe('Testa a função listId', () => {
      it('Deve retornar status 200 e um objeto', async () => {
        const mock = [{ saleId: 1, date: '2022-07-17T01:32:47.000Z', productId: 1, quantity: 5 }];

        const req = {};
        const res = {};

        
        req.params = [{ id: 1 }];

        res.status = sinon.stub().returns(res);
        res.send = sinon.stub();

        sinon.stub(salesService, 'listId').resolves(mock);

        await salesController.listId(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.send.calledWith(mock)).to.be.true;
      });
    });

    describe('Testa a função create', () => {
      it('Verifica se a venda foi inserida', async () => {
        const mock = [
  {
    "saleId": 1,
    "date": "2022-07-17T01:32:47.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-07-17T01:32:47.000Z",
    "productId": 2,
    "quantity": 10
  },
];

        const req = {};
        const res = {};

        req.body = [{ "productId": 1, "quantity": 5 }, { "productId": 2, "quantity": 10 }];

        res.status = sinon.stub().returns(res);
        res.send = sinon.stub();

        sinon.stub(salesService, 'create').resolves(mock);
        sinon.stub(salesService, 'getAll').resolves(mock);

        await salesController.create(req, res);

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.send.calledWith(mock)).to.be.true;
      });
    });

    describe('Testa a função edit', () => {
      it('Deve responder com as vendas atualizadas', async () => {
        const mock = {
          "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 15
        }
      ]
        };

        const req = {};
        const res = {};

        req.params = { id: 1 };
        req.body = [{ productId: 1, quantity: 15 }];
      
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub();

        sinon.stub(salesService, 'edit');

        await salesController.edit(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.send.calledWith(mock[0])).to.be.true;
      });
    });

    describe('Testa a função remove', () => {
      it('Se retorna o status 204', async () => {
        const req = {};
        const res = {};

        req.params = { id: 1 };

        res.status = sinon.stub().returns(res);
        res.sendStatus = sinon.stub().returns(res);
        res.send = sinon.stub();

        sinon.stub(salesService, 'getAll');
        sinon.stub(salesService, 'remove').resolves(true);

        await salesController.remove(req, res);

        expect(res.sendStatus.calledWith(204)).to.be.true;
      });
    })
});