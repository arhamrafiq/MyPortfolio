import userModel from "../models/userModel.js";
import pendingModel from "../models/pending.js";
import bcrypt from "bcrypt";
import { mailSender } from "../helper/Mailer.js";
import { hashpassword } from "../helper/authhelper.js";

// register Non verified user

export const registerController = async (req, res) => {
  try {
    const { name, email, Phone } = req.body;
    // Checking for Existing User

    const exisitingPhone = await userModel.findOne({ Phone });
    const exisitingEmail = await userModel.findOne({ email });
    const PendingEmail = await pendingModel.findOne({ email });
    const PendingPhone = await pendingModel.findOne({ Phone });

    if (exisitingEmail) {
      return res.send({
        message: "The phone no or Email is Already being registered",
      });
    }

    if (PendingEmail) {
      return res.send({
        success: true,
        message: "Already have pending registeration",
      });
    }

    // Assigning Verification Times
    const date = new Date();
    const EDate = new Date(date.getTime() + 25 * 60 * 1000);

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

    const Vcode = generateRandomString(6);
    // hashing our Code
    const hashedCode = await bcrypt.hash(Vcode, 5);
    // Saving to Pending user List for Verification
    const pending = new pendingModel({
      email: email,
      Phone: Phone,
      Code: hashedCode,
      Created: date,
      Expires: EDate,
    })
      .save()
      .then(
        res.status(200).send({
          success: true,
          message: "User registered in pending verifiacation",
          date: date,
          EDate: EDate,
        })
      );
    mailSender(email, Vcode);
  } catch (error) {
    // Checking and HAndling Errors
    console.log(error);
    res.status(500).send({
      success: false,
      Message: "Error Registering User",
    });
  }
};

// Verifying User Email
export const verifyController = async (req, res) => {
  try {
    const { name, email, Code } = req.body;
    const user = await pendingModel.findOne({ email: email });

    // Checking for leaked User
    if (!user) {
      return res.send({ message: "user has not applied for verificaton" });
    }
    // Compareing Codes
    const correct = await bcrypt.compare(Code, user.Code);

    // Sending our response
    if (correct) {
      res.status(200).send({ success: true, message: "Verified Successfully" });
    } else {
      res.status(200).send({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    //dealing with Errors
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error occured while regesteration" });
  }
};

// User's Permanat  registerartion After Verification
export const UserRegisterController = async (req, res) => {
  try {
    const { name, email, Phone, password } = req.body;
    if (password && password.length < 6) {
      return res
        .status(200)
        .send({ message: "Password should must contain atleast 6 character" });
    }
    const exisitingPhone = await userModel.findOne({ Phone });
    const exisitingEmail = await userModel.findOne({ email });

    if (exisitingEmail || exisitingPhone) {
      return res.send({
        message: "The phone no or Email is Already being registered",
      });
    }
    const hashedPassword = await hashpassword(password);
    const user = new userModel({ name, email, Phone, password: hashedPassword })
      .save()
      .then(
        res
          .status(200)
          .send({ success: true, message: "User registered successfully" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while registering",
    });
  }
};

// Resend verification code Controllers
export const resendingVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    // Generating new dates
    const date = new Date();
    const EDate = new Date(date.getTime() + 25 * 60 * 1000);

    // Gnerating new verification code
    function generateRandomString(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let randomString = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }

      return randomString;
    }

    const Vcode = generateRandomString(6);
    // hashing our Code
    const hashedCode = await bcrypt.hash(Vcode, 5);

    const saving = await pendingModel
      .findOneAndUpdate(
        { email },
        {
          Code: hashedCode,
          Expires: EDate,
        },
        { new: true }
      )
      .then(res.send({ success: true, message: "Verification Code Resended" }));
    mailSender(email, Vcode);
  } catch (error) {
    console.log(error);
    res.send({ message: "Error While resending the verification code" });
  }
};
