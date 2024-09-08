const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Enable CORS
app.use('/api/products', productRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API!');
});

mongoose.connect('mongodb://localhost:27017/backend')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
