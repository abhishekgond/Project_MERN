import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const id = req.userId;
    // console.log(id);
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User Doesn`t find " });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user data" });
  }
};
