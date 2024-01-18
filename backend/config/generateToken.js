const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign(
    {
      data: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;
