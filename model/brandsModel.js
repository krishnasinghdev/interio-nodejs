import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
dotenv.config()
const JWT = process.env.JWT

const brandsSchema = new mongoose.Schema({

  type: {
    type: String,
    default: 'brands'
  },
  authperson: {
    type: String,
    trim: true
  },
  persondesg: {
    type: String,
    trim: true
  },
  brandName: {
    type: String,
    trim: true
  },
  regcompanyName: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
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
    required: true,
    minLength: 7,
    validate(value) {
      if (value.length <= 7) {
        throw new Error("Password must be minimum 7 characters long");
      }
    },
  },
  contactNumber: {
    type: String,
    trim: true
  },
  panNo: {
    type: String,
    trim: true
  },
  street: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  landMark: {
    type: String,
    trim: true
  },
  gstNo: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
  },
  incorporationCertificate: {
    type: String,
  },
  status: {
    type: String,
    default: '',
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
}, {
  timestamps: true
});

brandsSchema.virtual('Product', {
  ref: 'ProductModel',
  localField: '_id',
  foreignField: 'owner'
})


brandsSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  return userObject
}

brandsSchema.methods.generateAuthToken = async function () {
  const brandUser = this;
  const token = jwt.sign({ _id: brandUser._id.toString() }, JWT, { expiresIn: '1h' });
  brandUser.tokens = brandUser.tokens.concat({ token });
  await brandUser.save();
  return token;
};

brandsSchema.statics.findByCredentials = async (email, password) => {
  const brandUser = await Brands.findOne({ email });
  if (!brandUser) {
    throw new Error("Invalid Username or Sign up first !!");
  }
  const isMatch = await bcrypt.compare(password, brandUser.password);
  if (!isMatch) {
    throw new Error("Invalid Password!");
  }
  return brandUser;
};

brandsSchema.pre("save", async function (next) {
  const brandUser = this;

  if (brandUser.isModified("password")) {
    brandUser.password = await bcrypt.hash(brandUser.password, 8);
  }


  next();
});

const Brands = mongoose.model("Brand", brandsSchema);

export default Brands

