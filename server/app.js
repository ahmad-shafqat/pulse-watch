const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);


app.get(   '/', (req, res) => {
    res.send('API is running...');
});

app.use(errorHandler);

module.exports = app;
