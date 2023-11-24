import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.db_URL);
    console.log(
      `Successfully connected to ${conn.connection.host}`.bgGreen.black
    );
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

export default connectdb;
