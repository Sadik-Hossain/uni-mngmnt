import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function bootStrap() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log(`db connected!`);
    app.listen(config.port, () => {
      console.log("Server started on", config.port);
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
bootStrap();
