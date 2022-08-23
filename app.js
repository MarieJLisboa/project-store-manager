const express = require('express');

const app = express();
const morgan = require('morgan');

const productsRoutes = require('./routes/products.routes');
const salesRoutes = require('./routes/sales.routes');
const midError = require('./middlewares/error.middleware');

app.use(express.json());
app.use(morgan('dev'));

app.set('view engine', 'jade');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use(midError);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;