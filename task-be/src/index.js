const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const mongoose = require('mongoose');
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 8000;

const usersRoute = require('./routes/usersRoute');
// const projectsRoute = require('./routes/projectsRoute');
// const tasksRoute = require('./routes/tasksRoute');
// const notificationsRoute = require('./routes/notificationsRoute');

app.use(cors()); // Use the cors middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/users', usersRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/tasks', tasksRoute);
app.use('/api/notifications', notificationsRoute);

// Deployment config

app.listen(port, () => console.log(`Node JS server listening on port ${port}`));
