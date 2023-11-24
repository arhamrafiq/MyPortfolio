import express from "express";
import {
  UpdateOrderController,
  createTypeController,
  deleteTypeController,
  getAllOrders,
  getAllTypesController,
  getOrderController,
  messageController,
  placeOrderController,
  updateTypeController,
} from "./../controllers/mangeController.js";

const router = express.Router();

// Routing magement Routes for admin

// Types CRUD OPERATION
router.post("/create-type", createTypeController);
router.get("/get-types", getAllTypesController);
router.put("/update-type", updateTypeController);
router.post("/delete-type", deleteTypeController);

// Order Operations
router.get("/orders", getAllOrders);
router.post("/place-order", placeOrderController);
router.get("/get-orders/:email", getOrderController);
router.put("/update-order/:oid", UpdateOrderController);

// Sending , Recieving and Saving feedbacks
router.post("/message", messageController);

export default router;
