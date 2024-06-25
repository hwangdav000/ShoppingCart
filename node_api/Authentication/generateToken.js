//importing express top class and then creating express server
require('dotenv').config();
const jwt = require('jsonwebtoken');

let refreshTokens = [];
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
}

function generateTokens(userId) {
  const user = { userId: userId };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  return { accessToken, refreshToken };
}

function generateAccessFromRefreshToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
}

module.exports = {
  generateTokens,
  generateAccessFromRefreshToken,
};
