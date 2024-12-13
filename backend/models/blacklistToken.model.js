const { Schema, model, default: mongoose } = require("mongoose");

const blacklistTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 86400,
  },
});

const blacklistTokenModel = model("BlacklistToken", blacklistTokenSchema);

module.exports = blacklistTokenModel;
