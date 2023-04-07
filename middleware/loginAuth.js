import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ADMIN from "../model/adminModel.js";
import VENDOR from "../model/vendorModel.js";
dotenv.config();
const JWT = process.env.JWT;

const loginAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT);
    let user;
    if (req.body.role === "_admin") {
      user = await ADMIN.findOne({ _id: decoded._id, "tokens.token": token });
    } else {
      user = await VENDOR.findOne({ _id: decoded._id, "tokens.token": token });
    }

    if (!user) {
      throw new Error("Token Expired!");
    }
    req.token = token;
    req.user = user;
    req._id = decoded._id;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate", error });
  }
};

export default loginAuth;
