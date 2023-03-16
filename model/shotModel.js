import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const shotSchema = new mongoose.Schema({

  title: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    index:true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tags: [String],
  images: [
    {
      title: String,
      url: String
    }
  ],
  owner: {
    type: String,
    requied: true,
    ref: 'Vendor'
  }
}, {
  timestamps: true
})

const Shot = new mongoose.model('Shot', shotSchema)

export default Shot;