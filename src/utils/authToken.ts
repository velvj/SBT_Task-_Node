import jwt from "jsonwebtoken";

//Token generate and verify
const generateToken = (data: any) => {
  const token = jwt.sign(
    {
      id: data,
      time: Date(),
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  return token;
};

const verifyToken = async (token: any) => {
  try {
    const verifyed = await jwt.verify(token, process.env.JWT_SECRET);
    return verifyed ? verifyed : false;
  } catch (e) {
    return false;
  }
};

export { generateToken, verifyToken };
