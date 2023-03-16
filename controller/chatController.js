import VENDOR from '../model/vendorModel.js';
import CHAT from '../model/chatModel.js';
import response from '../util/response.js';

//-------------NEW CHAT-------------//
export const newChat = async (req, res) => {
  try {
    const chat = await new CHAT(req.body)
    await chat.save()

    response.r200(res, chat)
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------GET CHATS-------------//
export const fetchChats = async (req, res) => {
  try {
    const chats = await CHAT.find({ vendors: { $elemMatch: { $eq: req._id } } }).populate("latestMessage").sort({ updatedAt: -1 })

    const results = await VENDOR.populate(chats, {
      path: "latestMessage.sender",
      // select: "name pic email",
    });
    res.status(200).send(results);

  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------NEW CHATS-------------//
// export const accessChat = async (req, res) => {
//   const userId = req._id;

//   if (!userId) {
//     console.log("UserId param not sent with request");
//     return res.sendStatus(400);
//   }

//   let isChat = await CHAT.find({
//     $and: [
//       { vendors: { $elemMatch: { $eq: req.user._id } } },
//       { vendors: { $elemMatch: { $eq: userId } } },
//     ],
//   })
//     .populate("vendors", "-password")
//     .populate("latestMessage");

//   isChat = await VENDOR.populate(isChat, {
//     path: "latestMessage.sender",
//     select: "name pic email",
//   });

//   if (isChat.length > 0) {
//     res.send(isChat[0]);
//   } else {
//     const chatData = {
//       chatName: "sender",
//       vendors: [req.user._id, userId],
//     };

//     try {
//       const createdChat = await CHAT.create(chatData);
//       const FullChat = await CHAT.findOne({ _id: createdChat._id }).populate(
//         "vendors",
//         "-password"
//       );
//       res.status(200).json(FullChat);
//     } catch (error) {
//       res.status(400);
//       throw new Error(error.message);
//     }
//   }
// };