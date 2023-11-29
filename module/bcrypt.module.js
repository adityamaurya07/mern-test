import bcrypt from "bcrypt";

export const encrypt = async (data) => {
  const encrypted = await bcrypt.hash(data, 12);
  return encrypted;
};

export const decrypt = async (realPassword, typedPassword) => {
  const isVerified = await bcrypt.compare(typedPassword, realPassword);
  return isVerified;
};
