import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './routes/index.js';
import connectDB from './config/db.js';

connectDB();

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


