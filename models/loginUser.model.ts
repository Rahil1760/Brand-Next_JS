import mongoose from "mongoose";
const loginUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model("User", loginUserSchema);

export default UserModel;
