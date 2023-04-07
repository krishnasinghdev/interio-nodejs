import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const shotSchema = new mongoose.Schema(
  {
    cname: {
      type: String,
      trim: true,
      required: true,
    },
    shots: [
      {
        shot: {
          type: String,
        },
      },
    ],
    owner: {
      type: String,
      requied: true,
      ref: "Vendor",
    },
  },
  {
    timestamps: true,
  }
);

const Shot = new mongoose.model("Shot", shotSchema);

export default Shot;
