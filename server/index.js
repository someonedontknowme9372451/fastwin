require('dotenv').config(); // Add this line to load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const database = require('./db');
const userRoutes = require('./Routes/user.routes');
const fastParityRoutes = require('./Routes/fastparity.routes');
const wheelRoutes = require('./Routes/wheel.routes');
const AnBRoutes = require('./Routes/andarbahar.routes');
const wheelService= require('./Services/wheel.service')
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
userRoutes(app);
fastParityRoutes(app);
wheelRoutes(app);
AnBRoutes(app);

// Database connection
database();


// auto schedule

cron.schedule('* * * * * *', async () => {
  console.log('Running scheduled task...');
  await wheelService.autoUpdateColorRecord();
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
