require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const orderRoutes = require('./routes/Order.route.js');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// CORS
app.use(cors());
//app.options('*', cors());

// Routes
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Node API Server Updated');
});

const uri = `mongodb://MitadMitadAPI:${process.env.MONGODB_PASS}@ac-ni37g0k-shard-00-00.bftimvc.mongodb.net:27017,ac-ni37g0k-shard-00-01.bftimvc.mongodb.net:27017,ac-ni37g0k-shard-00-02.bftimvc.mongodb.net:27017/?ssl=true&replicaSet=atlas-mhrgtu-shard-0&authSource=admin&retryWrites=true&w=majority&appName=MMDB`;
//"mongodb://MitadMitadAPI:<password>@ac-ni37g0k-shard-00-00.bftimvc.mongodb.net:27017,ac-ni37g0k-shard-00-01.bftimvc.mongodb.net:27017,ac-ni37g0k-shard-00-02.bftimvc.mongodb.net:27017/?ssl=true&replicaSet=atlas-mhrgtu-shard-0&authSource=admin&retryWrites=true&w=majority&appName=MMDB"

mongoose
  .connect(uri)
  .then(() => {
    console.log('You successfully connected to MongoDB!');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log('Queee');
    console.error(e);
  });
