const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products.models');

describe('Products model', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testa a função getAll', () => {
    it('Se lista um array', async () => {
      const mock = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      sinon.stub(connection, 'execute').resolves([mock]);

      const result = await productsModel.getAll();

      expect(result).to.deep.equal(mock);
    });
  });

  describe('Testa a função listId', () => {
    it('Retorna o produto referente ao id', async () => {
      const mock = { id: 1, name: 'Martelo de Thor' };

      sinon.stub(connection, 'execute').resolves([mock]);

      const result = await productsModel.listId(1);

      expect(result).to.deep.equal(mock);
    });

    it('Retorna undefined, caso o produto não seja encontrado', async () => {
      sinon.stub(connection, 'execute').resolves([undefined]);

      const result = await productsModel.listId(999);

      expect(result).to.be.undefined;
    });
  });

  describe('Testa a função findName', () => {
    it('Retorna o produto referente ao name', async () => {
      const mock = { id: 1, name: 'Martelo de Thor' };

      sinon.stub(connection, 'execute').resolves([mock]);

      const result = await productsModel.findName('Martelo de Thor');

      expect(result).to.deep.equal(mock);
    });

    it('Retorna undefined, caso o produto não seja encontrado', async () => {
      sinon.stub(connection, 'execute').resolves([undefined]);

      const result = await productsModel.findName('xablau');
      
      expect(result).to.be.undefined;
    });
  });

  describe('Testa a função create', () => {
    it('Retorna um objeto', async () => {
      const mock = [{ id: 1, name: 'Thor' }];

      sinon.stub(connection, 'execute').resolves(mock);

      const result = await productsModel.create('Thor');

      expect(result).to.be.a('object');
    });
  });

  describe('Testa a função edit', () => {
    it('Retorna um objeto', async () => {
      const mock = [{ id: 1, name: 'Thor' }];

      sinon.stub(connection, 'execute').resolves(mock);

      const result = await productsModel.edit('Thor');

      expect(result).to.be.a('object');
    });
  });

  describe('Testa a função remove', () => {
    it('Após a exclusão deve retornar undefined', async () => {
      const id = 1;

      sinon.stub(connection, 'execute').resolves();

      const result = await productsModel.remove(id);

      expect(result).to.be.undefined;
    });
  });

  describe('Testa a função search', () => {
    it('Retorna um array das buscas com o termo', async () => {
      const mock = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
      const term = 'thor';
      const search = mock.filter(({ name }) =>
        name.match(new RegExp(term, 'i'))
      );

      sinon.stub(connection, 'query').resolves([search]);

      const result = await productsModel.search(term);

      expect(result).to.deep.equal(search);
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

      sinon.stub(connection, 'query').resolves([search]);

      const result = await productsModel.search(term);
      
      expect(result).to.deep.equal(search);
    });
  });
});
