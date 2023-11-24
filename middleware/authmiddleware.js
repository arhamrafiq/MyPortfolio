import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protecting the token base routes
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JSON_SECRET
    );
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);
    const checking = await userModel.findOne({ email });
    if (checking && checking?.isAdmin === 1) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
