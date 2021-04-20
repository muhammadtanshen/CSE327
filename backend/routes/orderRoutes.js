
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

const authMiddleware = require('../../middlewares/authMiddlware');
const adminMiddlware = require('../../middlewares/adminUser');

router.post('/',authMiddleware,orderController.addOrderItems);
router.get('/:id',authMiddleware,orderController.getOrderById);
router.put('/:id/pay',authMiddleware,orderController.updateOrderToPaid);
router.get('/myorders/:id',authMiddleware,orderController.getMyOrders);

router.get('/',authMiddleware,adminMiddlware.admin,orderController.getOrders);
router.put('/:id/deliver',authMiddleware,adminMiddlware.admin,orderController.updateOrderToDelivered)

// router.get('/',authMiddleware,adminMiddlware.admin,orderController.getOrders)

// router.post('/pay/id',orderController.paymentWithStripe);

// router.route('/').post(authMiddleware.protect,orderController.addOrderItems).get(authMiddleware.protect, authMiddleware.admin, orderController.getOrders)
// router.route('/myorders').get(authMiddleware.protect, orderController.getMyOrders)
// router.route('/:id').get(authMiddleware.protect,orderController.getOrderById)
// router.route('/:id/pay').put(authMiddleware.protect, orderController.updateOrderToPaid)
// router.route('/:id/deliver').put(authMiddleware.protect, authMiddleware.admin, orderController.updateOrderToDelivered)

module.exports = router;