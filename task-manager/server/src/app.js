const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./models');
const sequelize = require('./config/database');
const routes = require('./routes');
const authRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const socketHandler = require('./socket/socket');
const setupRoutes = require("./routes/setup");
const cors = require("cors")
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from your React app's origin
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
  req.io = io;
  next();
});
// Routes
app.use('/', routes);
app.use('/user', authRouter);
app.use('/task', taskRouter);
app.use('/setup', setupRoutes);

// Socket.IO setup
io.on('connection', socketHandler);

// // Sync database
// db.sequelize.sync().then(() => {
//   console.log('Database synced...');
// }).catch(err => console.log('Error: ' + err));

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synced...');
  })
  .catch(err => console.log('Error: ' + err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));