import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
dotenv.config()
const JWT = process.env.JWT
mongoose.set('strictQuery', true);

const vendorSchema = new mongoose.Schema({

    type: {
        type: String,
        default: 'vendor'
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter a valid email address");
            }
        },
    },
    contact: {
        type: String,
        validate(value) {
            if (!value.length === 10) {
                throw new Error("Enter a valid contact number");
            }
        }
    },
    password: {
        type: String,
        trim: true
    },
    membershipId: {
        type: String,
        trim: true
    },
    preferredPlanId: {
        type: String,
        trim: true
    },
    currentMemberType: { type: String },
    previosMemberType: { type: String },
    cardStatus: { type: String },
    isAppliedForCard: { type: String },
    membershipPlan: {
        type: String,
        enum: ['Unsubscribed', 'Basic', 'Elite', "Founder"],
        default: 'Unsubscribed'
    },
    subscriptionId: {
        type: String,
        trim: true,
    },
    prevSubscriptionIds: [
        { type: String, trim: true }
    ],
    linkedIn: {
        type: String,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    },
    angleList: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    professionalTitle: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    street: {
        type: String,
        trim: true
    },
    unit: {
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
    state: {
        type: String,
        trim: true
    },
    pincode: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    areaOfExpertise: {
        type: String,
        trim: true
    },
    passions: {
        type: String,
        trim: true
    },
    status: {
        type: String
    },
    redeemed: [
        { type: String }
    ],
    saved: [
        { type: String }
    ],
    resetToken: String,
    expireToken: Date,
    otp: { type: String },
    otpExpireIn: { type: Date, expireAfterSeconds: 150 },

    tokens: [{
        token: {
            type: String,
            required: true,
        },
    },],
}, {
    timestamps: true
});

vendorSchema.methods.toJSON = function () {
    const vendor = this
    const subscriptionStatus = vendor.subscriptionStatus
    const planId = vendor.plan_id
    const vendorObject = vendor.toObject()

    vendorObject.subscriptionStatus = subscriptionStatus
    vendorObject.plan_id = planId
    delete vendorObject.password
    delete vendorObject.tokens
    delete vendorObject.otp
    return vendorObject
}

vendorSchema.methods.generateAuthToken = async function () {
    const vendor = this;
    const token = jwt.sign({ _id: vendor._id.toString() }, JWT, { expiresIn: '1h' });
    vendor.tokens = vendor.tokens.concat({ token });
    await vendor.save();
    return token;
};

vendorSchema.statics.findByCredentials = async (email, password) => {
    const vendor = await vendor.findOne({
        email
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

vendorSchema.pre('save', async function (next) {
    const vendor = this
    if (vendor.isModified('password')) {
        vendor.password = await bcrypt.hash(vendor.password, 8)
    }
    next()
})

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor