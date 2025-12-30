import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User({ name, email, password: hashedPassword });

    await user.save();

    return res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    console.log("register error : ", error);

    return res.status(400).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentails" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "password incorrect" });
    }

    const token = jwt.sign({ id: user._id }, jwt_secret);

    return res.json(token);
  } catch (error) {
    console.log("Login error : ", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
