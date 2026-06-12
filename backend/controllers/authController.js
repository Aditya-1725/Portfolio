const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Admin = require("../models/Admin");
const sendEmail = require("../utils/sendEmail");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      email: admin.email,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const forgotPassword = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    const admin =
      await Admin.findOne({
        email:
          email.toLowerCase(),
      });

    if (!admin) {
      return res.status(404).json({
        message:
          "Administrator account not found",
      });
    }

    // Generate Reset Token

    const resetToken =
      crypto
        .randomBytes(32)
        .toString("hex");

    // Store Hashed Token

    admin.resetPasswordToken =
      crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // 15 Minutes Expiry

    admin.resetPasswordExpire =
      Date.now() +
      15 * 60 * 1000;

    await admin.save();

    // Reset Link

    const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password/${resetToken}`;

    const message = `
      <div style="font-family:Arial,sans-serif;">
        <h2>Admin Password Reset System</h2>

        <p>Hello,</p>

        <p>
          A password reset request was received for your portfolio administrator account.
        </p>

        <p>
          Click the link below to create a new password:
        </p>

        <p>
          <a href="${resetUrl}">
            Reset Password
          </a>
        </p>

        <p>
          This link will expire in 15 minutes.
        </p>

        <p>
          If you did not request this reset, you can safely ignore this email.
        </p>

        <br/>

        <p>
          — Dynamic Security System
        </p>
      </div>
    `;

    await sendEmail({
      email: admin.email,
      subject:
        "Portfolio Admin Password Reset",
      message,
    });

    res.json({
      message:
        "Recovery email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (
  req,
  res
) => {
  try {
    const resetPasswordToken =
      crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const admin =
      await Admin.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
          $gt: Date.now(),
        },
      });

    if (!admin) {
      return res.status(400).json({
        message:
          "Invalid or expired reset link",
      });
    }

    const {
      password,
      confirmPassword,
    } = req.body;

    if (
      password !==
      confirmPassword
    ) {
      return res.status(400).json({
        message:
          "Passwords do not match",
      });
    }

    admin.password =
      await bcrypt.hash(
        password,
        10
      );

    admin.resetPasswordToken =
      "";

    admin.resetPasswordExpire =
      undefined;

    await admin.save();

    res.json({
      message:
        "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};