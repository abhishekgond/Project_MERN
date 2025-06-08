import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Ensure env is loaded

export const auth = async (req, res, next) => {
  try {
    // Extract token from headers, cookies, or body
    let token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "").trim();

    // If token is still missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token missing.",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = decoded;
      // Attach user info to req for further use
      req.user = decoded;
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Proceed to next middleware or route
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication",
    });
  }
};

export const isStudent = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || user.accountType !== "student") {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not a student.",
      });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("isStudent middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during student verification",
    });
  }
};

export const isInstructor = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not a Instructor.",
      });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("isStudent middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during student verification",
    });
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not a Admin.",
      });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("isStudent middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during student verification",
    });
  }
};
