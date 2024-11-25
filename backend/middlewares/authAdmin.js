import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;

    // If the token is missing, return an immediate response
    if (!atoken) {
      console.log("No token provided");
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
    }

    console.log("Token received, verifying...");

    // Verify the token and decode the payload
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    console.log("Token decoded:", decoded);

    // Check if the decoded email matches the admin's email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      console.log("Unauthorized email:", decoded.email);
      return res.status(403).json({ success: false, message: "Access Denied. Not Authorized." });
    }

    console.log("Token is valid, proceeding to next middleware.");
    // Token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If any error occurs during token verification
    console.error("Error during authentication:", error);
    return res.status(401).json({ success: false, message: "Invalid or Expired Token." });
  }
};

export default authAdmin;