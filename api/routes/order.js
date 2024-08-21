const {Router} = require('express');
const router = Router();
const checkAuth = require('../middleware/check-auth.js');

const OrdersController = require('../controllers/order.js');

router.get('/', checkAuth, OrdersController.getAllOrders);
router.post('/', checkAuth, OrdersController.createOrder);
router.get('/:orderId', checkAuth, OrdersController.getOrder);
router.delete('/:orderId', checkAuth, OrdersController.deleteOrder);

module.exports = router;
