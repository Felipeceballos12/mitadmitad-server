const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const orderRoutes = require('./routes/Order.route.js');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Node API Server Updated');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PSS}@mitadmitaddb.fzoiuxc.mongodb.net/?retryWrites=true&w=majority&appName=MitadMitadDB`
  )
  .then(() => {
    console.log('You successfully connected to MongoDB!');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
