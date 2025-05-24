import jwt from "jsonwebtoken";
const genToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRETKEY, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.log(error);
  }
};

export default genToken;
