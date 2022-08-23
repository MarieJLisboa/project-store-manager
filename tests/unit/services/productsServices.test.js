const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products.models');
const productsService = require('../../../services/products.services');

describe('Products Services', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testa a função getAll', () => {
    it('Deve listar os produtos', async () => {
      const mock = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
      sinon.stub(productsModel, 'getAll').resolves(mock);

      const result = await productsService.getAll();

      expect(result).to.deep.equal(mock);
    });
  });

  describe('Testa a função listId', () => {
    it('Retorna o objeto referente ao id', async () => {
      const mock = [{ id: 1, name: 'Martelo de Thor' }];

      sinon.stub(productsModel, 'listId').resolves(mock);

      const result = await productsService.listId(1);

      expect(result).to.deep.equal(mock);
    });

    it('Retorna undefined, caso o produto não seja encontrado', async () => {
  
      return expect(productsService.listId(999)).to.eventually.be.rejectedWith('Product not found');
    });
  });

  describe('Testa a função create', () => {
    it('Deve retornar um objeto criado', async () => {
      const mock = { name: 'Martelo de Thor' };

      sinon.stub(productsModel, 'findName').returns([]);
      sinon.stub(productsModel, 'create').resolves(mock);

      const result = await productsService.create(mock);
      expect(result).to.be.a('object');
    });
    it('Se o produto já existir, retorna um erro', async () => {

      sinon.stub(productsModel, 'findName').resolves('Martelo de Thor');

      return expect(productsService.create('Martelo de Thor'))
        
        .to.eventually.be.rejectedWith('Product already exists');
    });
  });

  describe('Testa a função edit', () => {
    it('Retorna true se for alterado', async () => {
      sinon.stub(productsModel, 'edit').resolves(true);

      const result = await productsService.edit(2, {
        name: 'Martelo de Thor',
      });

      expect(result).to.be.true;
    });
  });

  describe('Testa a função remove', () => {
    it('Deve deletar o produto retornando undefined', async () => {
      const mock = [{ id: 1, name: 'Martelo de Thor' }];
    
      sinon.stub(productsModel, 'listId').returns(mock);
      sinon.stub(productsModel, 'remove').resolves();

      const result = await productsService.remove(1);

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
      const term = 'traje';
      const search = mock.filter(({ name }) =>
        name.match(new RegExp(term, 'i'))
      );

      sinon.stub(productsModel, 'search').resolves(search);

      const result = await productsService.search(term);

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

      sinon.stub(productsModel, 'search').resolves(search);

      const result = await productsService.search(term);

      expect(result).to.deep.equal(search);
    });
  });
});