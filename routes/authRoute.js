import express from "express";
import {
  UserRegisterController,
  registerController,
  resendingVerificationCode,
  verifyController,
} from "./../controllers/registerController.js";

const router = express.Router();

// routing

// Registering
router.post("/register", registerController);
router.post("/verify", verifyController);
router.post("/authUser", UserRegisterController);

// Resending verification code
router.put("/resend", resendingVerificationCode);

export default router;
