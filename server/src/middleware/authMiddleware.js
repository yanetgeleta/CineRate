export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenicated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthenticated User!" });
};
