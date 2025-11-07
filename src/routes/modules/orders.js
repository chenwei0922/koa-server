import Router from 'koa-router';
import { createOrder, getMyOrders, getOrderById } from '../../controllers/orderController.js';

const router = new Router();

router.post('/', createOrder);
router.get('/mine', getMyOrders);
router.get('/:id', getOrderById);

export default router;


