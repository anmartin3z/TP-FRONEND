

import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY;

export const generateToken = (payload, expiresIn = '2h') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}