import { comparePassword, hashpassword } from "../helper/authhelper.js";
import userModel from "../models/userModel.js";
import PendingModel from "../models/pending.js";
import JWT from "jsonwebtoken";
import { mailSender } from "../helper/Mailer.js";
import bcrypt from "bcrypt";

// Generating  and hashing our Verification Code
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Checking for User
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.send({ message: "Invalid Email or Password" });
    }

    // Checking User
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.send({ message: "Invalid Email or Password" });
    }
    // Generating Token
    const token = await JWT.sign({ _id: user._id }, process.env.JSON_SECRET, {
      expiresIn: "7d",
    });

    // Success Responce
    res.send({
      success: true,
      message: "Login Successfull",
      user: {
        name: user.name,
        email: user.email,
        Phone: user.Phone,
        Admin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in loging" });
  }
};

export const protectedRouteController = (req, res) => {
  console.log("Proted Route");
  res.send({
    message: "Protected Route",
  });
};

// Forgotten Password || Email Finding
export const emailFinder = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.send({ message: "No user Found by this email" });

    // Finding for Already Pending Email
    const exitingPending = await PendingModel.findOne({ email });
    if (exitingPending)
      return res.send({
        success: true,
        message: "User Already Pending for verification",
      });

    // Assigning Verification Times
    const date = new Date();
    const EDate = new Date(date.getTime() + 25 * 60 * 1000);

    // Generating our verification code
    const Vcode = generateRandomString(6);
    // hashing our Code
    const hashedCode = await bcrypt.hash(Vcode, 5);

    const pending = await PendingModel({
      email,
      Phone: user.Phone,
      Code: hashedCode,
      Created: date,
      Expires: EDate,
    })
      .save()
      .then(res.send({ success: true, message: "OTP sent successfully" }));
    //   Sharing the OTP with the provided email
    mailSender(email, Vcode);
  } catch (error) {
    console.log(error);
    res.send({ message: "Error while finding your Email" });
  }
};

// Updating Password
export const updatePasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (password && password.length < 6) {
      return res
        .status(200)
        .send({ message: "Password should must contain atleast 6 character" });
    }
    const hashedPassword = await hashpassword(password);

    // Updating Password
    const user = await userModel
      .findOneAndUpdate({ email }, { password: hashedPassword }, { new: true })
      .then(
        res.send({ success: true, message: "Password updated successfully" })
      );
  } catch (error) {
    console.log(error);
    res.send({ message: "Error while updating Password" });
  }
};
