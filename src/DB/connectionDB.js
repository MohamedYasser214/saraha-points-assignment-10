import mongoose, { connect } from "mongoose";

const connectionDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/SarahaApp", {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`DB Connected😎`);
  } catch (error) {
    console.log(`DB failed Connected🚨`, error);
  }
};

export default connectionDB;
