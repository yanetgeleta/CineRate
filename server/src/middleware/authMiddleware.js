import passport from "passport";

export const ensureAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthenticated user" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
