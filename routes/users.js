const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Access: PUBLIC
// @desc REGISTER A USER
// @request POST
// @route /api/users
router.post("/users", async (req, res) => {
  const user = await User.findOne({
    $or: [
      { username: req.body.username.toLowerCase() },
      { email: req.body.email },
    ],
  });
  try {
    if (req.body.password != req.body.confirmPassword) {
      return res.status(200).json({
        success: false,
        msg: "Passwords do not match",
      });
    }

    if (user) {
      return res.status(400).json({
        success: false,
        msg: "User already exists with this username or email",
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
      };
      const nUser = await User.create(newUser);

      jwt.sign(
        { id: nUser._id },
        process.env.PRIVATE_KEY,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) throw err;
          return res.status(201).json({
            success: true,
            msg: "User account created",
            data: nUser,
            token,
          });
        }
      );
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// Access: PUBLIC
// @desc USER LOGIN
// @request POST
// @route /api/users/login
router.post("/users/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username.toLowerCase(),
  });

  try {
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "No User Found",
      });
    }

    // Validate password and login
    if (await bcrypt.compare(req.body.password, user.password)) {
      jwt.sign(
        { id: user._id },
        process.env.PRIVATE_KEY,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            data: user,
            token,
          });
        }
      );
    } else {
      res.status(400).json({
        success: false,
        msg: "Password incorrect",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
});

// Access: PRIVATE
// @desc Get User Data
// @request GET
// @route /api/users
router.get("/users", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  return res.status(200).json({
    data: user,
  });
});

module.exports = router;
