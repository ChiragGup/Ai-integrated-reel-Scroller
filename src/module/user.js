import mongoose, { Schema, model, models } from "mongoose";


const NewUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);



const User = mongoose.models.User || mongoose.model("User", NewUserSchema);
module.exports = User;
