import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false; // track the connection

const options: ConnectOptions = {
  dbName: "share_prompt",
};

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, options);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
