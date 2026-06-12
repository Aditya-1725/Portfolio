require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");

const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin =
      await Admin.findOne({
        email:
          process.env.ADMIN_EMAIL,
      });

    if (existingAdmin) {
      console.log(
        "Admin already exists."
      );
      process.exit();
    }

    const hashedPassword =
      await bcrypt.hash(
        "ChangeThisPassword123!",
        10
      );

    await Admin.create({
      email:
        process.env.ADMIN_EMAIL,
      password:
        hashedPassword,
    });

    console.log(
      "Admin created successfully."
    );

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

createAdmin();