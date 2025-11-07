import Router from 'koa-router';
import { requireAuth } from '../middleware/auth.js';
import auth from './modules/auth.js';
import products from './modules/products.js';
import orders from './modules/orders.js';
import users from './modules/users.js';

const router = new Router({ prefix: '/api' });

router.use(auth.routes(), auth.allowedMethods());
router.use('/products', products.routes(), products.allowedMethods());
router.use('/orders', requireAuth(), orders.routes(), orders.allowedMethods());
router.use('/users', requireAuth(), users.routes(), users.allowedMethods());

router.get('/', (ctx) => {
  ctx.body = { message: 'Koa API is running...' };
});

export default router;


