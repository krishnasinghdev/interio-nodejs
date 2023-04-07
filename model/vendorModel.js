import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const JWT = process.env.JWT;
mongoose.set("strictQuery", true);

const vendorSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "vendor",
    },
    socketId: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid email address");
        }
      },
    },
    contact: {
      type: Number,
      validate(value) {
        if (!value.length === 10) {
          throw new Error("Enter a valid contact number");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      default: null,
    },
    city: {
      type: String,
      trim: true,
      default: null,
    },
    pincode: {
      type: Number,
      trim: true,
      default: null,
    },
    area: {
      type: String,
      trim: true,
      default: null,
    },
    biography: {
      type: String,
      trim: true,
      default: null,
    },
    workHistory: [
      {
        title: String,
        duration: String,
      },
    ],
    lookingfor: [
      {
        title: String,
        duration: String,
      },
    ],
    likedShot: [
      {
        id: mongoose.Schema.Types.ObjectId,
        image: String,
        performance: {
          like: { type: Number },
          comments: { type: Number },
          view: { type: Number },
        },
      },
    ],
    shopProduct: [
      {
        id: String,
        image: String,
        price: Number,
      },
    ],
    shotCollections: [
      {
        id: String,
        image: String,
        performance: Array,
      },
    ],
    socialLinks: [
      {
        platform: String,
        url: String,
      },
    ],

    area: {
      type: String,
      trim: true,
      default: null,
    },
    skill: [String],
    follower: [String],
    following: [String],
    resetToken: String,
    expireToken: Date,
    otp: {
      type: String,
      default: null,
    },
    otpExpireIn: {
      type: Date,
      expireAfterSeconds: 150,
      default: null,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

vendorSchema.virtual("Shot", {
  ref: "shotModel",
  localField: "_id",
  foreignField: "owner",
});

vendorSchema.methods.toJSON = function () {
  const vendor = this;
  const subscriptionStatus = vendor.subscriptionStatus;
  const planId = vendor.plan_id;
  const vendorObject = vendor.toObject();

  vendorObject.subscriptionStatus = subscriptionStatus;
  vendorObject.plan_id = planId;
  delete vendorObject.password;
  delete vendorObject.tokens;
  delete vendorObject.otp;
  return vendorObject;
};

vendorSchema.methods.generateAuthToken = async function () {
  const vendor = this;
  const token = jwt.sign({ _id: vendor._id.toString() }, JWT);
  vendor.tokens = vendor.tokens.concat({ token });
  await vendor.save();
  return token;
};

vendorSchema.statics.findByCredentials = async (email, password) => {
  const vendor = await Vendor.findOne({
    email,
  });
  if (!vendor) {
    throw new Error("Invalid vendorname or Sign up first !!");
  }
  const isMatch = await bcrypt.compare(password, vendor.password);
  if (!isMatch) {
    throw new Error("Invalid Password!");
  }
  return vendor;
};

vendorSchema.pre("save", async function (next) {
  const vendor = this;
  if (vendor.isModified("password")) {
    vendor.password = await bcrypt.hash(vendor.password, 8);
  }
  next();
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
