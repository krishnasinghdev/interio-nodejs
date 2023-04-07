import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const JWT = process.env.JWT;
mongoose.set("strictQuery", true);

const adminSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "admin",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter a valid email address");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.length <= 7) {
        throw new Error("Password must be minimum 7 characters long");
      }
    },
  },
  role: {
    type: String,
    default: "_admin",
  },
  resetToken: String,
  expireToken: Date,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

adminSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

adminSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT, {
    expiresIn: "1h",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

adminSchema.statics.findByCredentials = async (email, password) => {
  const user = await Admin.findOne({
    email,
  });
  if (!user) {
    throw new Error("Invalid Username or Sign up first !!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Password!");
  }
  return user;
};

adminSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
