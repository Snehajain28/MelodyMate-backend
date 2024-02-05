
const express = require('express');
const { registerUser } = require('../controller/registerUser');
const { loginUser } = require('../controller/loginUser');
const {auth, isAdmin } = require('../middleware/authmid');
const { AddAddressController, AddressController } = require('../controller/AddressController');
const { AddOrderController, OrderController } = require('../controller/OrdersController');
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
//router.post("/forgot-password", forgotPasswordController);


router.post("/checkout/add-address", AddAddressController);
router.post("/checkout/address", AddressController);


router.post("/create-order", AddOrderController);
router.post("/orders", OrderController);


router.get("/user-auth", auth,(req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", auth, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
 

//router.put("/profile", auth, updateProfileController);
//router.get("/orders", auth, getOrdersController);
//router.get("/all-orders", auth, isAdmin, getAllOrdersController);
//router.put(
  //"/order-status/:orderId",
//  requireSignIn,
//  isAdmin,
  //orderStatusController
//);

module.exports = router;