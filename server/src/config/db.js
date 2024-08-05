import chalk from "chalk";
import mongoose from "mongoose";

const connectDatabase = async () => {
  mongoose.set("strictQuery", false);
  try {
    const uri = process.env.MONGODB_URL;

    const res = await mongoose.connect(uri);
    if (res) {
      console.log(chalk.yellow("Database connected successfully..."));
    }
    else {
      console.log(chalk.red("Database connection failed..."));
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
