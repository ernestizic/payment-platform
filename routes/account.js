const express = require("express");
// const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const router = express.Router();
const auth = require("../middleware/auth");

// Access: PRIVATE
// @desc ACCOUNT FUNDING
// @request POST
// @route /api/user/fundaccount
router.put("/user/fundaccount", auth, async (req, res) => {
  const wallet = await Wallet.findOne({ userid: req.user.id });

  const currentBal = wallet.balance

  const totalBal = currentBal + parseInt(req.body.balance)

  try {
    if (wallet) {
      const fundWallet = {
        balance: totalBal,
      };
      if (req.body.balance < 1000) {
        return res.status(400).json({
          success: false,
          msg: "Amount should be greater than or equal to 1000",
        });
      } else {
        await Wallet.updateOne(wallet, { $set: fundWallet });
        return res.status(200).json({
            success: true,
            data: fundWallet 
          });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
});


// Access: PRIVATE
// @desc MAKE PAYMENTS
// @request POST
// @route /api/user/payment
router.put("/user/payment", auth, async(req, res)=> {
  const wallet = await Wallet.findOne({ userid: req.user.id });

  const currentBal = wallet.balance

  const totalBal = currentBal - parseInt(req.body.balance)

  try {
    if (wallet) {
      const payMoney = {
        balance: totalBal,
      };

      if (currentBal < req.body.balance) {
        return res.status(400).json({
          success: false,
          msg: "Insufficient funds",
        });
      } else {
        await Wallet.updateOne(wallet, { $set: payMoney });
        return res.status(200).json({
          success: true,
          data: payMoney,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server Error",
    })
  }
})

module.exports = router;
