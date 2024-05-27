import CryptoJS from "crypto-js";
import User from "../model/user.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login instead." });
    }

    const user = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.Crypto_Key
      ).toString(),
    });

    await user.save();

    return res
      .status(200)
      .json({ message: "Account created successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with this credential" });
    }
    const passwordMatch = CryptoJS.AES.decrypt(
      user?.password,
      process.env.Crypto_Key
    ).toString(CryptoJS.enc.Utf8);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
