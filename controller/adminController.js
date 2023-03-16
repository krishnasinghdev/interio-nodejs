import Admin from '../model/adminModel.js'
import response from '../util/response.js';

// import crypto from 'crypto'
// import { sendBrandApprovedMail, sendResetMail, sendProductApprovedMail } from '../email.js'

//-------------GET ALL ADMIN-------------//
export const get_admin = async (req, res) => {
  try {
    const admin = await Admin.find({})
    if (!admin) {
      throw Error('NO ADMIN FOUND')
    }
    response.r200(res, admin)
  } catch (error) {
    res.status(500).send(error);
  }
}

//-------------NEW ADMIN-------------//
export const add_admin = async (req, res) => {
  try {
    const admin = await new Admin(req.body)
    await admin.save()
    const token = await admin.generateAuthToken()

    response.r200(res, { admin, token })
  } catch (error) {
    res.status(500).send(error);
  }
}

//-------------LOGIN ADMIN-------------//
export const login = async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(req.body.email, req.body.password)
    const token = await admin.generateAuthToken()
    if (!admin) {
      throw new Error('Invalid Attempt, Admin not Found!')
    }
    response.r200(res, { admin, token })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

//-------------LOGOUT ADMIN-------------//
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

















// //----GET All Admin
// router.get('/admin/self', auth, async (req, res) => {
//   try {
//     res.send(req.user)
//   } catch (error) {
//     res.send(error)
//   }
// })



//----User logout from all devices
// router.post('/admin/logoutall', auth, async (req, res) => {
//   try {
//     req.user.tokens = []
//     await req.user.save()
//     res.send()
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })



// //----Admin updates its profile
// router.patch('/admin/me', auth, async (req, res) => {
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['name', 'email', 'password', 'contact']
//   const isValid = updates.every((update) => allowedUpdates.includes(update))

//   if (!isValid) {
//     res.send('INVALID UPDATE ATTEMPTS')
//   }
//   try {
//     updates.forEach((update) => req.user[update] = req.body[update])
//     await req.user.save()
//     res.send(req.user)
//   } catch (error) {
//     res.send(error)
//   }
// })
// //----User delete its account
// router.delete('/admin/:id', async (req, res) => {
//   try {
//     const user = await Admin.findByIdAndRemove(req.params.id)
//     if (!user) {
//       throw Error('Invalid Attempt !')
//     }
//     res.send('Admin Deleted !')
//   } catch (error) {
//     res.send(error)
//   }
// })

// //----Admin approves brand
// router.patch('/admin/brands/:id/:status', async (req, res) => {
//   try {
//     const brand = await Brands.findByIdAndUpdate({ _id: req.params.id }, { status: `${req.params.status}` }, { new: true })
//     await brand.save()
//     // if (req.params.status === 'approved') {
//     //   sendBrandApprovedMail(brand.email)
//     // }
//     res.status(200).send(brand)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })
// //----Admin approves product
// router.patch('/admin/brands/product/:id/:status', async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate({ _id: req.params.id }, { status: `${req.params.status}`, offerOnlyFor: req.body.offerOnlyFor }, { new: true })
//     const brand = await Brands.findById({ _id: product.owner })
//     const email = brand.email
//     // sendProductApprovedMail(email)
//     await product.save()
//     res.status(200).send(product)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })
// //----Admin approves user
// router.patch('/admin/user/:id/:status', async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate({ _id: req.params.id }, { status: `${req.params.status}` }, { new: true })
//     const email = user.email
//     await user.save()
//     res.send(user)
//   } catch (error) {
//     res.send(error)
//   }
// })

// //-------admin reset password
// router.post('/admin/resetpassword', async (req, res) => {
//   try {
//     let token
//     crypto.randomBytes(32, (err, buffer) => {
//       if (err) {
//         throw new Error('inavlid')
//       }
//       token = buffer.toString("hex")
//     })
//     const admin = await Admin.findOne({ email: req.body.email })
//     if (!admin) {
//       throw new Error('Unable to find account ')
//     }
//     admin.resetToken = token
//     admin.expireToken = Date.now() + 3600000;
//     // sendResetMail(req.body.email, admin.resetToken, 'admin', 'http://yolodash.trivy.co')

//     await admin.save()

//     res.send(admin)

//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// router.get('/admin/reset/:token', async (req, res) => {
//   try {
//     const admin = await Admin.findOne({ resetToken: req.params.token, expireToken: { $gt: Date.now() } })

//     if (!admin) {
//       throw new Error('Invalid')
//     }
//     res.send(admin)
//   } catch (error) {
//     res.send(error)
//   }
// })



// router.post('/admin/reset/:token', async (req, res) => {
//   try {
//     const admin = await Admin.findOne({ resetPasswordToken: req.params.token, expireToken: { $gt: Date.now() } })
//     if (!admin) {
//       throw new Error("Invalid")
//     }
//     admin.password = req.body.password;
//     admin.resetToken = undefined
//     admin.expireToken = undefined
//     await admin.save()
//     res.send({ message: 'Password Changed Successfully' })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })