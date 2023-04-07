import MESSAGE from "../model/messageModal.js";
import VENDOR from "../model/vendorModel.js";
import CHAT from "../model/chatModel.js";
import response from "../util/response.js";

//-------------GET ALL MESSAGE-------------//
export const allMessages = async (req, res) => {
  try {
    const messages = await MESSAGE.find({ chat: req.params.chatId })
      .select("-chat -updatedAt -__v")
      .populate("chat")
      .sort({ createdAt: 1 });
    const { vendors } = await CHAT.findById(req.params.chatId).populate(
      "vendors",
      "name follower following likedShot"
    );

    response.r200(res, { messages, vendors });
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------NEW MESSAGE-------------//
export const sendMessage = async (req, res) => {
  const { content, chat } = req.body;
  console.log(req.body);

  try {
    if (!content || !chat) throw new Error("Invalid data passed into request");
    const message = await new MESSAGE({
      sender: req._id,
      content: content,
      chat,
    });

    await message.save();
    await CHAT.findByIdAndUpdate(chat, { latestMessage: message._id });
    response.r200(res, message);
  } catch (error) {
    res.status(500).send(error);
  }
};
