import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const collectionSchema = new mongoose.Schema(
  {
    cname: {
      type: String,
      trim: true,
      required: true,
    },
    shots: [mongoose.Schema.Types.ObjectId],
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

const Collection = new mongoose.model("Collection", collectionSchema);

export default Collection;
