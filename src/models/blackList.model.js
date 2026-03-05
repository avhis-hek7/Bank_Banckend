const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to blacklist"],
      unique: [true, "Token is already blacklist"],
    }
 
  },
  { timestamps: true }
);

// Automatically delete expired tokens
tokenBlacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60*60*24*30/3 });
const tokenBlacklistModel =  mongoose.model("TokenBlacklist", tokenBlacklistSchema);
module.exports = tokenBlacklistModel;