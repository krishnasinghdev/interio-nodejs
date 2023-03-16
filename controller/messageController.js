import MESSAGE from '../model/messageModal.js';
import VENDOR from '../model/vendorModel.js';
import CHAT from '../model/chatModel.js';
import response from '../util/response.js';

//-------------GET ALL MESSAGE-------------//
export const allMessages = async (req, res) => {
  try {
    const messages = await MESSAGE.find({ chat: req.params.chatId })
      .populate('sender', 'name  email -_id')
      .populate('chat'); 
    
      response.r200(res, messages)
  } catch (error) {
    res.status(500).send(error); 
  }
};

//-------------NEW MESSAGE-------------//
export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.sendStatus(400);
  }

  try {
    const message = await new MESSAGE({
      sender: req._id,
      content: content,
      chat: chatId,
    });

    // message = await message.populate('sender', 'name pic').execPopulate();
    // message = await message.populate('chat').execPopulate();
    // message = await VENDOR.populate(message, {
    //   path: 'chat.users',
    //   select: 'name pic email',
    // });

    await message.save()
    await CHAT.findByIdAndUpdate(chatId, { latestMessage: message._id });
    response.r200(res, message)
  } catch (error) {
    res.status(500).send(error); 
  }
};
