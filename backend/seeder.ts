import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import mongoose from "mongoose";

import User from "./models/User";
import Transactions from "./models/Transactions";
import userdata from "./data/userdata";
import transaction from "./data/transaction";

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  throw new Error('MongoDB connection string is not defined.');
}

mongoose.connect(mongoUrl);
mongoose.connection.on('error', (error: Error) => console.log('Error'))

const importData = async () => {
  try {
    await User.insertMany(userdata);
    // await Transactions.insertMany(transaction);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
