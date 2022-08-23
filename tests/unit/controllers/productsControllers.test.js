const { use, expect } = require('chai');
const sinon = require('sinon');
const chaPromised = require('chai-as-promised');
const productsService = require('../../../services/products.services');
const productsController = require('../../../controllers/products.controllers');

use(chaPromised);

describe('Products controllers', () => {
  beforeEach(() => {
    sinon.restore();
  });

    describe('Testa a função getAll', () => {
    it('Retorna o produto', async () => {
      const mock = { id: 1, name: 'Martelo de Thor' };

      const req = {};
      const res = {};

      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub();

      sinon.stub(productsService, 'getAll').resolves(mock);
      
      await productsController.getAll(req, res);
      
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(mock)).to.be.true;
    });
  }); 

    describe('Testa a função listId', () => {
    it('Deve retornar status 200 e um objeto do id', async () => {
      const mock = [{ id: 1, name: 'Martelo de Thor' }];

      const req = {};
      const res = {};

        req.params = [{ id: 1 }];
  
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();
  
        sinon.stub(productsService, 'listId').resolves(mock);
      
      await productsController.listId(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(sinon.match.object)).to.be.true;
      expect(res.send.calledWith(sinon.match(mock[0]))).to.be.true;
    });
  });

  describe('Testa a função create', () => {
    it('Verifica se o produto foi inserido', async () => {
      const mock = { id: 1, name: 'Martelo de Thor' };

      const req = {};
      const res = {};

      req.body = { name: 'Martelo de Thor' };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(productsService, 'create').resolves(mock);
      sinon.stub(productsService, 'listId').resolves(mock);

      await productsController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.send.calledWith(mock)).to.be.true;
    });
  });

  describe('Testa a função edit', () => {
    it('Deve responder com os produtos atualizados', async () => {
      const mock = {
        id: 1,
        name: 'Martelo de Thor',
        quantity: 1
      };

      const req = {};
      const res = {};

      req.params = { id: 1 };
      req.body = { name: 'Martelo de Thor', quantity: 1 };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub();

      sinon.stub(productsService, 'edit').resolves(mock);
      sinon.stub(productsService, 'listId').resolves(mock);

      await productsController.edit(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(mock)).to.be.true;
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

      sinon.stub(productsService, 'getAll');
      sinon.stub(productsService, 'remove').resolves(true);

      await productsController.remove(req, res);

      expect(res.sendStatus.calledWith(204)).to.be.true;
    });
  });

  describe('Testa search', () => {
    it('Retorna um array das buscas com o termo', async () => {
      const mock = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
      const term = 'traje';
      const search = mock.filter(({ name }) =>
        name.match(new RegExp(term, 'i'))
      );

      const req = {};
      const res = {};

      req.query = { q: term };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub();

      sinon.stub(productsService, 'getAll').resolves(mock);
      sinon.stub(productsService, 'search').resolves(search);

      await productsController.search(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(search)).to.be.true;
    });

    it('Retorna um array vazio, caso não haja o termo da busca', async () => {
    const mock = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
      const term = 'xablau';
      const search = mock.filter(({ name }) =>
        name.match(new RegExp(term, 'i'))
      );

      const req = {};
      const res = {};

      req.query = { q: term };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub();

      sinon.stub(productsService, 'getAll').resolves(mock);
      sinon.stub(productsService, 'search').resolves(search);

      await productsController.search(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(search)).to.be.true;
    });

    it('Lista todos os produtos com a busca vazia', async () => {
      const mock = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
      const term = '';

      const req = {};
      const res = {};

      req.query = { q: term };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub();

      sinon.stub(productsService, 'getAll').resolves(mock);
      sinon.stub(productsService, 'search').resolves(mock);

      await productsController.search(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(mock)).to.be.true;
    });
  });
});