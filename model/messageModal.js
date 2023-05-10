import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Vendor",
    },
    content: { type: String, trim: true, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
