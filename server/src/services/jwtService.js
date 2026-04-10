import jwt from "jsonwebtoken";
import env from "dotenv";

export const tokenCreator = (req) => {
  if (!req.user) return null;
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  return token;
};
