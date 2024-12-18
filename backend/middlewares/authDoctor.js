import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const {dtoken} = req.headers;
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized. Please log in again.",
      });
    }


    // Verify the token
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id; // Attach user data to `req.user`

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    res.status(401).json({
      success: false,
      message: "Authentication failed. Please log in again.",
    });
  }
};

export default authDoctor;
