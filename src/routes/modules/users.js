import Router from 'koa-router';
import { getProfile } from '../../controllers/userController.js';

const router = new Router();

router.get('/me', getProfile);

export default router;


