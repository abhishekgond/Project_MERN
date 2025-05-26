// import jwt  from "jsonwebtoken";

// export const isAuth = async (req, res, next) => {
//   try {
//     console.log("Cookies from client:", req.cookies); // See what's inside

//     const { token } = req.cookies;
//     if (!token) {
//       return res.status(401).json({ message: "Token not found, please login" });
//     }

//     const verifyToken = jwt.verify(token, process.env.JWT_SECRETKEY);
//     // console.log("Token verified:", verifyToken);

//     req.userId = verifyToken.userId;
//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error);
//     return res.status(500).json({ message: "Authentication error" });
//   }
// };
import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRETKEY);
    console.log(verified);
    req.userId = verified.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
