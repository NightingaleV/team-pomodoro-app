//External imports
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
//Internal imports

// Routers
import { userRouter } from './routes/user';
import { groupRouter } from './routes/group';
import { timerRouter } from './routes/timer';

const { parsed, error } = dotenv.config({
  path: '../config/dev.env',
  debug: true,
});

console.error(error);
// Env Variables parsed to disposal
console.log(parsed);

// Init a Express.js
const app = express();
const PORT = process.env.PORT || 5000;

// SET DB Connection
const DB = process.env.DB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    mongoose.set('useFindAndModify', false);
    console.log('MongoDB Connected');
  } catch (err) {
    console.log('error statement');
    console.log(err.message);
    process.exit(1);
  }
};

// Establish DB connection
connectDB().then(value => {
  app.get('/', (req, res) => res.send('API Running'));

  app.get('/api/data/', (req, res) => {
    res.send('{"express_status": "working"}');
  });

  // Init Middleware
  // Default body-parser
  app.use(express.json({ extended: false }));

  // Define Routes
  app.use('/api/user', userRouter);
  app.use('/api/group', groupRouter);
  app.use('/api/timer', timerRouter);

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
