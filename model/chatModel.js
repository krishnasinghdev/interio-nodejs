import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true }
);

const Chat =  mongoose.model('Chat', chatSchema)

export default Chat;