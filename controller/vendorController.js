import VENDOR from '../model/vendorModel.js'
import response from '../util/response.js';
// import crypto from 'crypto'
// import otp from 'otp-generator'
// import { sendCouponMail, sendWelcomeMail, sendResetMail, sendOtpMail, sendRedeemMail } from '../email.js'

//-------------GET ALL VENDOR-------------//
export const get_vendor = async (req, res) => {
  try {
    const vendor = await VENDOR.find({})
    if (!vendor) {
      throw Error('NO vendor FOUND')
    }
    response.r200(res, vendor)
  } catch (error) {
    res.send(error)
  }
}

//-------------NEW VENDOR-------------//
export const add_vendor = async (req, res) => {
  try {
    const vendor = await new VENDOR(req.body)
    await vendor.save()
    const token = await vendor.generateAuthToken()

    response.r200(res, { vendor, token })
  } catch (error) {
    res.send(error)
  }
}

//-------------LOGIN VENDOR-------------//
export const login = async (req, res) => {
  try {
    const vendor = await VENDOR.findByCredentials(req.body.email, req.body.password)
    const token = await VENDOR.generateAuthToken()
    if (!vendor) {
      throw new Error('Invalid Attempt, vendor not Found!')
    }
    response.r200(res, { vendor, token })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

//-------------LOGOUT VENDOR-------------//
export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    response.r200(res, {}, 'Logged Out!')
  } catch (error) {
    res.status(500).send(error)
  }
}






















// //----GET All User 
// router.get('/user', async (req, res) => {
//   try {
//     const user = await User.find({})
//     if (!user) {
//       res.status(400).send('NO USERS FOUND')
//     }
//     res.status(200).send(user)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })
// //----GET All User 
// router.get('/user/:type', async (req, res) => {
//   try {
//     const user = await User.find({ currentMemberType: req.params.type })
//     if (!user) {
//       res.status(400).send('NO USERS FOUND')
//     }
//     res.status(200).send(user)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })
// router.get('/get/user/:id', async (req, res) => {
//   try {
//     const user = await User.findById({ _id: req.params.id })
//     if (!user) {
//       res.status(400).send('NO USERS FOUND')
//     }
//     res.status(200).send(user)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// //---- User redeem
// router.post('/user/redeem/:id', auth, async (req, res) => {
//   try {
//     const user = req.user
//     const email = req.user.email
//     if (req.body.coupon) {
//       // sendCouponMail(email, req.body.coupon, user.firstName)
//     }
//     if (!req.body.coupon) {
//       // sendRedeemMail(email, user.firstName)
//     }
//     const product = await Product.findById({ _id: req.params.id })

//     product.redeemers = await product.redeemers.concat(user._id)
//     product.like = product.like + 1;
//     await product.save()
//     user.redeemed = await user.redeemed.concat(req.params.id);
//     await user.save()
//     res.send({ message: 'Email sent Successfully !' })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// //----User self login
// router.get('/user/self', auth, async (req, res) => {
//   res.send(req.user)
// })
// //----User login by email
// router.post('/user/email/login', async (req, res) => {
//   try {
//     const user = await User.findByCredentials(req.body.email, req.body.password)
//     if (!user) {
//       throw Error("Invalid creds");
//     }
//     const token = await user.generateAuthToken()
//     res.status(200).send({ user, token })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })
// //----------new User login via OTP
// router.post('/user/login', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email })
//     if (!user) {
//       return res.status(400).send('NO USERS FOUND')
//     }
//     const isValid = user.otp === req.body.otp
//     if (!isValid) {
//       return res.status(400).send('Invalid OTP')
//     }
//     const token = await user.generateAuthToken()
//     res.send({ user, token })
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })
// //----User logout
// router.post('/user/logout', auth, async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token !== req.token
//     })
//     await req.user.save()
//     res.send()
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })
// //----User save product
// router.post('/product/save/:id', auth, async (req, res) => {
//   try {
//     const user = req.user
//     const isValid = await user.saved.includes(req.params.id)
//     if (!isValid) {
//       user.saved = await user.saved.concat(req.params.id);
//     }
//     await user.save()
//     res.status(200).send({ message: 'Saved !' })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })
// //---user ensave product
// router.post('/product/unsave/:id', auth, async (req, res) => {
//   try {
//     const user = req.user
//     const Id = req.params.id
//     req.user.saved = req.user.saved.filter((saved) => {
//       return saved !== Id
//     })

//     await user.save()
//     res.status(200).send({ message: 'Unsaved !' })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })
// //----User logout from all devices
// router.post('/user/logoutall', auth, async (req, res) => {
//   try {
//     req.user.tokens = []
//     await req.user.save()
//     res.send()
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })
// //----New User Join via otp 
// router.post('/user', async (req, res) => {

//   try {
//     let user = await User.find({ email: req.body.email });
//     if (user.length > 0) {
//       throw new Error("User already exists");
//     }
//     const OTP = otp.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
//     user = new User(req.body)
//     user.otp = OTP
//     user.otpExpireIn = Date.now() + 60;

//     await user.save()
//     // sendOtpMail(user.email, user.otp)
//     res.send({ message: 'OTP is sent to your given email . Please also check your spam and promotion box for OTP too.' })
//   } catch (error) {
//     res.status(409).send(error)
//   }
// })
// router.post('/user/resend', async (req, res) => {

//   try {

//     const OTP = otp.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
//     const user = await User.findOne({ email: req.body.email })
//     user.otp = OTP
//     user.otpExpireIn = Date.now() + 60;

//     await user.save()
//     // sendOtpMail(user.email, user.otp)
//     res.send({ message: 'OTP sent.' })
//   } catch (error) {
//     res.send(error)
//   }
// })


// //----User updates its profile
// router.patch('/user/me', auth, async (req, res) => {
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['firstName', 'lastName', 'email', 'password', 'contact', 'linkedIn',
//     'companyName', 'professionalTitle', 'dob', 'street', 'unit', 'country', 'city', 'state', 'preferredPlanId',
//     'pincode', 'twitter', 'angleList', 'instagram', 'bio', 'areaOfExpertise', 'passions', 'saved']

//   const isValid = updates.every((update) => allowedUpdates.includes(update))

//   if (!isValid) {
//     res.status(400).send('INVALID UPDATE ATTEMPTS')
//   }
//   try {
//     updates.forEach((update) => req.user[update] = req.body[update])
//     await req.user.save()
//     res.status(200).send(req.user)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })
// //----User delete its account
// router.delete('/user/me', auth, async (req, res) => {
//   try {
//     // sendBackMail(req.user.email, req.user.name)
//     await req.user.remove()
//     res.status(200).send(req.user)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })
// //----User delete its by vendor
// router.delete('/user/delete/vendor/:id', async (req, res) => {
//   try {
//     const user = await User.findOneAndDelete({ _id: req.params.id })
//     if (!user) {
//       return res.send('Not Found')
//     }
//     res.send('User Deleted SUCCESSFULLY')
//   } catch (error) {
//     res.send(error)
//   }
// })
// /////////////--------------user reset password
// router.post('/user/resetpassword', async (req, res) => {
//   try {
//     const Buff = crypto.randomBytes(32)
//     const token = Buff.toString('hex')


//     const user = await User.findOne({ email: req.body.email })
//     if (!user) {
//       throw new Error('Unable to find account ')
//     }
//     user.resetToken = token
//     user.expireToken = Date.now() + 3600000;
//     await user.save()

//     // sendResetMail(req.body.email, user.resetToken, 'userpassword', 'http://yolo.trivy.co')
//     res.send(user)

//   } catch (error) {
//     res.send(error)
//   }
// })

// router.get('/user/reset/:token', async (req, res) => {
//   try {
//     const user = await User.findOne({ resetToken: req.params.token })
//     if (!user) {
//       throw new Error('Invalid')
//     }
//     res.send(user)
//   } catch (error) {
//     res.send(error)
//   }
// })



// router.post('/user/reset/:token', async (req, res) => {
//   try {
//     const user = await User.findOne({ resetPasswordToken: req.params.token, expireToken: { $gt: Date.now() } })
//     if (!user) {
//       throw new Error("Invalid")
//     }
//     user.password = req.body.password;
//     user.resetToken = undefined
//     user.expireToken = undefined
//     await user.save()
//     res.send({ message: 'Password Changed Successfully' })
//   } catch (error) {
//     res.send(error)
//   }
// })


// export default router