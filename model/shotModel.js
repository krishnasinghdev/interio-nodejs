import mongoose, { Mongoose } from "mongoose";
mongoose.set("strictQuery", false);

const shotSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [String],
    images: [
      {
        title: String,
        url: String,
      },
    ],
    owner: {
      type: String,
      requied: true,
      ref: "Vendor",
    },
    like: [{ type: mongoose.Schema.Types.ObjectId }],
    comments: [
      {
        v_id: String,
        comment: String,
      },
    ],
    view: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Shot = new mongoose.model("Shot", shotSchema);

export default Shot;
