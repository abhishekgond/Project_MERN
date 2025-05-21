import jwt from "jsonwebtoken";
const genToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JET_SECRETKEY, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.log(error);
  }
};

export default genToken;
