import { SuccessfulOrderMail } from "../helper/Mailer.js";
import MessageModel from "../models/MessageModel.js";
import OrderModel from "../models/OrderModel.js";
import typeModel from "../models/typeModel.js";

// Creating types
export const createTypeController = async (req, res) => {
  try {
    const { name, pagePrice } = req.body;

    // Checking for similar named types
    const check = await typeModel.findOne({ name: name });
    if (check) {
      return res.status(200).send({ message: `${name} already exists` });
    }

    // Saving our type
    const Type = await typeModel({ name: name, pagePrice: pagePrice })
      .save()
      .then(
        res.status(200).send({
          success: true,
          message: `${name} created successfully`,
          type: {
            name: name,
            pagePrice: pagePrice,
          },
        })
      );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating the type",
    });
  }
};

// Reading Types
export const getAllTypesController = async (req, res) => {
  try {
    const types = await typeModel.find();
    res.status(200).send({
      success: true,
      message: "All types here",
      types,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Error While fetching the types",
    });
  }
};

// Updating Types
export const updateTypeController = async (req, res) => {
  try {
    const { name, pagePrice } = req.body;

    // Updating our type
    const Type = await typeModel
      .findOneAndUpdate({ name }, { pagePrice: pagePrice }, { new: true })
      .then(
        res
          .status(200)
          .send({ success: true, message: `${name} updated successfully` })
      );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating the type",
    });
  }
};

// deleting Type
export const deleteTypeController = async (req, res) => {
  try {
    const { name } = req.body;

    // Updating our type
    const Type = await typeModel
      .findOneAndDelete({ name })
      .then(
        res
          .status(200)
          .send({ success: true, message: `${name} deleted successfully` })
      );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the type",
    });
  }
};

// Order Placement
export const placeOrderController = async (req, res) => {
  try {
    const {
      email,
      name,
      Type,
      Pages,
      pageNames,
      funtionalities,
      Hosting,
      referenceWeb,
      days,
    } = req.body;
    console.log(
      email,
      name,
      Type,
      Pages,
      pageNames,
      funtionalities,
      Hosting,
      referenceWeb,
      days
    );
    const Order = await OrderModel({
      name,
      email,
      Type,
      Pages,
      pageNames,
      funtionalities,
      Hosting,
      referenceWeb,
      days,
    })
      .save()
      .then(
        res.status(200).send({
          success: true,
          message: "Order has been Placed Successfully",
        })
      );
    SuccessfulOrderMail(email, name);
  } catch (error) {
    console.log(error);
    res.send({
      message: "Error while Placing your Order",
    });
  }
};

// Showing Orders
export const getOrderController = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await OrderModel.find({ email: email });
    if (orders.length === 0) {
      return res
        .status(202)
        .send({ success: true, message: "No Order Found", orders });
    }
    res.status(200).send({ success: true, message: "All Order here", orders });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error while fetching the Orders" });
  }
};

// Showing All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).send({ success: true, message: "All Order here", orders });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error while fetching the Orders" });
  }
};
// Cancelling Order
export const UpdateOrderController = async (req, res) => {
  try {
    const { oid } = req.params;
    const { status, charges } = req.body;

    // Updating Now
    const updated = await OrderModel.findByIdAndUpdate(
      oid,
      { status, charges },
      { new: true }
    ).then(res.send({ success: true, message: `${status} Successfully` }));
  } catch (error) {
    console.log(error);
    res.send({ message: "Something went wrong" });
  }
};

// Message Controller
export const messageController = async (req, res) => {
  try {
    const { email, message } = req.body;
    const save = await MessageModel({ email, message })
      .save()
      .then(res.send({ success: true, message: "Message sent successfully" }));
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" });
  }
};
