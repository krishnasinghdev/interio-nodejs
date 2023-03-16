import SHOT from '../model/shotModel.js'
import response from '../util/response.js';
// import crypto from 'crypto'
// import otp from 'otp-generator'
// import { sendCouponMail, sendWelcomeMail, sendResetMail, sendOtpMail, sendRedeemMail } from '../email.js'


//-------------NEW SHOT-------------//
export const add_shot = async (req, res) => {
  try {
    req.body.owner = req._id
    const shot = await new SHOT(req.body)
    await shot.save()
    response.r200(res, shot)
  } catch (error) {
    res.status(500).send(error)
  }
}

//-------------GET ALL SHOT-------------//
export const get_shot = async (req, res) => {
  try {
    const shot = await SHOT.find({}).select('title category description tags images owner')
    if (!shot) {
      throw Error('NO SHOT FOUND')
    }
    response.r200(res, shot)
  } catch (error) {
    res.status(500).send(error)
  }
}

//-------------GET SHOT BY ID-------------//
export const getshot_byid = async (req, res) => {
  try {
    const shot = await SHOT.findById(req.params.id).select('title category description tags images owner')
    if (!shot) {
      throw Error('NO SHOT FOUND')
    }
    response.r200(res, shot)
  } catch (error) {
    res.status(500).send(error)
  }
}

//-------------DELETE SHOT BY ID-------------//
export const delete_shot = async (req, res) => {
  try {
    const shot = await SHOT.findByIdAndDelete(req.params.id)
    if (!shot) {
      throw Error('NO SHOT FOUND')
    }
    response.r200(res, shot)
  } catch (error) {
    res.status(500).send(error)
  }
}

