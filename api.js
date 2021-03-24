const express = require('express');
const errorHandler = require('./middlewares/errorHandler');

const addProduct = require('./controllers/products/addProduct');
const deleteProduct = require('./controllers/products/deleteProduct');
const getProduct = require('./controllers/products/getProduct');
const updateProduct = require('./controllers/products/updateProduct');

const getEmail = require('./controllers/emails/getEmail');
const addEmail = require('./controllers/emails/addEmail');
const deleteEmail = require('./controllers/emails/deleteEmail');

const port = 3000;

const app = express();
app.use(express.json());

app.use(addProduct);
app.use(deleteProduct);
app.use(getProduct);
app.use(updateProduct);
app.use(addEmail);
app.use(getEmail);
app.use(deleteEmail);

app.use(errorHandler);

app.listen(port, () => console.log(`API listening at port ${port}`));
