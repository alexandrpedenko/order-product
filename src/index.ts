import express from 'express';
import { errorMiddleware } from './core/middlewares/error.middleware';
import { AppRouter } from './index.router';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const router = new AppRouter(app);

// Set cors
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Credentials', 'true');
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.set('port', process.env.PORT || 3001);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
router.init();

// Custom middleware
app.use(errorMiddleware);

// DB connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((error) => console.log(error));

const port = app.get('port');
const server = app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);

export default server;
