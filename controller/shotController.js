import SHOT from "../model/shotModel.js";
import VENDOR from "../model/vendorModel.js";
import response from "../util/response.js";
// import crypto from 'crypto'
// import otp from 'otp-generator'
// import { sendCouponMail, sendWelcomeMail, sendResetMail, sendOtpMail, sendRedeemMail } from '../email.js'

//-------------NEW SHOT-------------//
export const add_shot = async (req, res) => {
  try {
    req.body.owner = req._id;
    const shot = await new SHOT(req.body);
    await shot.save();
    response.r200(res, shot);
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------GET ALL SHOT-------------//
export const get_shot = async (req, res) => {
  try {
    const shot = await SHOT.find({})
      .select("title category description tags images owner")
      .populate("owner", "name follower following likedshot email");

    if (!shot) {
      throw Error("NO SHOT FOUND");
    }
    response.r200(res, shot);
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------GET SHOT BY ID-------------//
export const getshot_byid = async (req, res) => {
  try {
    const shot = await SHOT.findById(req.params.id)
      .select("title category description tags images owner")
      .populate("owner", "name follower following likedshot email");

    if (!shot) {
      throw Error("NO SHOT FOUND");
    }
    response.r200(res, shot);
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------DELETE SHOT BY ID-------------//
export const delete_shot = async (req, res) => {
  try {
    const shot = await SHOT.findByIdAndDelete(req.params.id);
    if (!shot) {
      throw Error("NO SHOT FOUND");
    }
    response.r200(res, shot);
  } catch (error) {
    res.status(500).send(error);
  }
};

//-------------LIKE SHOT BY ID-------------//
export const like_shot = async (req, res) => {
  try {
    const { shotId, v_id } = req.params;
    console.log(shotId, v_id);
    const shot = await SHOT.findOne({ _id: shotId });
    if (shot.like.lenght > 0) {
      const isLikedBefore = shot.like?.find((id) => id == v_id);
      console.log("isLikedBefore", isLikedBefore);
      if (isLikedBefore) response.r200(res, {}, "Already Liked !");
    }

    shot.like = shot.like.push(v_id);

    console.log(" shot", shot);
    // await shot.save()
    const vendor = await VENDOR.findOne({ _id: v_id });
    vendor.likedShot = vendor.likedShot.push({
      id: shotId,
      image: shot.images[0].url,
      performance: {
        like: Number(shot.like.length),
        comments: Number(shot.comments.length),
        view: shot.view,
      },
    });
    console.log(" vendor", vendor);
    await vendor.save();
    if (!shot || !vendor) {
      throw Error("NO SHOT FOUND");
    }
    response.r200(res, { vendor, shot }, "Shot Liked !");
  } catch (error) {
    res.status(500).send(error);
  }
};
