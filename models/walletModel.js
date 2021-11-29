const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Wallet", WalletSchema)