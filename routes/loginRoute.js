import express from "express";
import {
  LoginController,
  emailFinder,
  protectedRouteController,
  updatePasswordController,
} from "./../controllers/LoginController.js";
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";

const router = express.Router();

// routing

// Login Routes
router.post("/login", LoginController);

// Proteccted Route
router.get("/protected-Route", requireSignIn, (req, res) => {
  res.status(202).send({ ok: true });
});

// Steps for reseting forgotten Passwords
router.post("/get-email", emailFinder);
router.put("/update-password", updatePasswordController);

export default router;
