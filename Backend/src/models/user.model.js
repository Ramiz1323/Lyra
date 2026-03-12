import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
    minlength:6,
  },
  verified:{
    type:Boolean,
    default:false
  }
}, { timestamps: true });

// Hashing password before saving to database
userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

//Compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User", userSchema);

export default userModel;