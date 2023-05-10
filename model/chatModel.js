import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const chatSchema = mongoose.Schema(
  {
    vendors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
