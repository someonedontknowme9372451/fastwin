require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./db');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const fastParityRoutes = require('./routes/fastparity.routes');
const wheelRoutes = require('./routes/wheel.routes');
const AnBRoutes = require('./routes/andarbahar.routes');

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
