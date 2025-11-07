import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './routes/index.js';
import connectDB from './config/db.js';

// Connect to database (will reuse connection in serverless)
connectDB().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to connect to database:', err.message);
});

const app = new Koa();

// Error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message || 'Server Error' };
  }
});

app.use(cors());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

export default app;


