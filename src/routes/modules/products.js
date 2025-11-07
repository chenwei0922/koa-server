import Router from 'koa-router';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/productController.js';
import { requireAuth } from '../../middleware/auth.js';

const router = new Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', requireAuth(), createProduct);
router.put('/:id', requireAuth(), updateProduct);
router.delete('/:id', requireAuth(), deleteProduct);

export default router;


