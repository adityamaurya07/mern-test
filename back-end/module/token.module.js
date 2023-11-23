import jwt from "jsonwebtoken";

export const CreateToken = async (iss, data, expiresIn = 600000) => {
  const token = await jwt.sign({ iss, data }, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const VerifyToken = async (token) => {
  try {
    const { data } = await jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (err) {
    return null;
  }
};
