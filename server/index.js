require('dotenv').config(); // Add this line to load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const userRoutes = require('./Routes/user.routes');
const fastParityRoutes = require('./Routes/fastparity.routes');
const wheelRoutes = require('./Routes/wheel.routes');
const AnBRoutes = require('./Routes/andarbahar.routes');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all origins
app.use(cookieParser());

// Serve static files from the client/dist directory
const staticOptions = {
  maxAge: '1d', // Set cache expiry to 1 day
};
app.use(express.static(path.join(__dirname, '../client/dist'), staticOptions));

// Routes
userRoutes(app);
fastParityRoutes(app);
wheelRoutes(app);
AnBRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Serve the index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Connect to the database and start the server
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error connecting to Database:", err);
    process.exit(1);
  });
