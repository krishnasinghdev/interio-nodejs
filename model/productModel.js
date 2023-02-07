import mongoose from "mongoose";

const productschema = new mongoose.Schema({

  brandName: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: String,
    trim: true,
    required: true,
    lowercase: true
  },
  subCategory: {
    type: String,
    trim: true,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  averageSavings: {
    type: String,
    required: true
  },
  regions: [
    { type: String }
  ],
  offerOnlyFor: [
    { type: String }
  ],
  aboutCompany: {
    type: String,
    trim: true,
    required: true
  },
  moreDetail: {
    type: String,
    trim: true,
    required: true
  },
  benefits: [{
    type: String,
    trim: true
  }],
  eliteBenefits: [{
    type: String,
    trim: true
  }],
  founderBenefits: [{
    type: String,
    trim: true
  }],
  coupons: [{
    coupon: {
      type: String,
      trim: true,
    },
    offerCoupon: [
      { type: String }
    ]
  }],
  customUrls: [{
    customUrl: {
      type: String,
      trim: true,
    },
    offerCustomUrl: [
      { type: String }
    ]
  }],
  like: {
    type: Number,
    default: 0
  },
  comments: [
    {
      comment: {
        type: String,
        trim: true
      },
      title: {
        type: String,
        trim: true
      },
      imageUrl: {
        type: String,
        trim: true
      }
    }
  ],
  redeemers: [
    {
      type: String,
      trim: true
    }
  ],
  coverPage: [{
    type: String
  }],
  benefitsPage: [{
    type: String
  }],
  styleImage: [{
    type: String
  }],
  status: {
    type: String,
    default: 'pending'
  },
  website: {
    type: String,
    default: ''
  },
  owner: {
    type: String,
    requied: true,
    ref: 'Brands'
  }
}, {
  timestamps: true
})

const Product = new mongoose.model('Product', productschema)

export default Product;
