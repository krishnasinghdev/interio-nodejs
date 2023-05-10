import VENDOR from '../model/vendorModel.js';
import SHOT from '../model/shotModel.js';
import COLLECTION from '../model/collectionModel.js';
import response from '../util/response.js';
// import crypto from 'crypto'
// import otp from 'otp-generator'
// import { sendCouponMail, sendWelcomeMail, sendResetMail, sendOtpMail, sendRedeemMail } from '../email.js'

//-------------GET ALL VENDOR-------------//
export const get_vendor = async (req, res) => {
  try {
    const vendor = await VENDOR.findOne({_id: req._id}).select('-password -tokens -__v').lean();
    if (!vendor) {
      throw Error('NO vendor FOUND');
    }
    response.r200(res, vendor);
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------GET VENDOR TABS-------------//
export const get_tabs = async (req, res) => {
  try {
    let selectWord = 'shotCollections';
    let tabArr = [];
    if (req.params.tab === 'liked-shot') {
      selectWord = 'likedShot';
    }
    if (req.params.tab === 'work') {
      selectWord = 'ownShot';
    }

    const vendor = await VENDOR.findOne({ _id: req._id }).select(selectWord);
    if (!vendor) {
      throw Error('NO vendor data FOUND');
    }

    if (selectWord === 'shotCollections') {
      const collection = await COLLECTION.findById(vendor.shotCollections[0]);
      tabArr = collection.shots;
    } else if (selectWord === 'likedShot') {
      tabArr = vendor.likedShot;
    } else {
      tabArr = vendor.ownShot;
    }
    if (tabArr.length == 0) {
      response.r200(res, []);
    } else {
      const shots = await SHOT.find({ _id: { $in: tabArr } });
      if (!shots) {
        throw Error('Unable to get shots!');
      }
      return response.r200(res, shots);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------NEW VENDOR-------------//
export const add_vendor = async (req, res) => {
  try {
    const vendor = new VENDOR(req.body);
    await vendor.save();
    const token = await vendor.generateAuthToken();
    response.r200(res, { name: vendor?.name, _id: vendor._id, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------LOGIN VENDOR-------------//
export const login = async (req, res) => {
  try {
    const vendor = await VENDOR.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!vendor) {
      throw new Error('Invalid Attempt, vendor not Found!');
    }
    const token = await vendor.generateAuthToken();
    response.r200(res, { name: vendor?.name, _id: vendor?._id, token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//-------------LOGOUT VENDOR-------------//
export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    response.r200(res, {}, 'Logged Out!');
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------UPDATE VENDOR PASSWORD-------------//
export const update_password = async (req, res) => {
  try {
    const _id = req._id;

    const isVendor = await VENDOR.findByCredentials(
      req.body.email,
      req.body.oldPassword
    );
    if (!isVendor) {
      throw new Error('Invalid Attempt!');
    }
    const vendor = await VENDOR.findOne({ _id });
    vendor.password = req.body.newPassword
    await vendor.save();
    if (!vendor) {
      throw new Error('Invalid Attempt, vendor not Found!');
    }

    response.r200(res, {}, 'Password Updated !');
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------EDIT VENDOR PASSWORD-------------//
export const edit_vendor = async (req, res) => {
  try {
    const _id = req._id;

    const vendor = await VENDOR.findOneAndUpdate({ _id },req.body);
    if (!vendor) {
      throw new Error('Invalid Attempt, vendor not Found!');
    }

    response.r200(res, vendor, 'Profile Updated !');
  } catch (error) {
    res.status(500).send(error);
  }
};
