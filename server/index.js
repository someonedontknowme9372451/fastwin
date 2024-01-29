require('dotenv').config(); // Add this line to load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser= require('cookie-parser')
const connectDB = require('./db');
const userRoutes = require('./Routes/user.routes');
const fastParityRoutes = require('./Routes/fastparity.routes');
const wheelRoutes = require('./Routes/wheel.routes');
const AnBRoutes = require('./Routes/andarbahar.routes');
const wheelService= require('./Services/wheel.service')
const Authenticate = require('./Middlewares/auth')
const path = require('path');
const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // Change this to your React app's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Enable CORS
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../client/dist'), {
  maxAge: '1d', // Set cache expiry to 1 day
}));


// Routes
userRoutes(app);
fastParityRoutes(app);
wheelRoutes(app);
AnBRoutes(app);

// Database connection
connectDB()

const PORT = process.env.PORT || 3000;

app.get('/',Authenticate, (req, res) => {
 res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//  res.send('hello')
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
 

 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  