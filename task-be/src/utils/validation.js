const { body, validationResult } = require("express-validator");

const validateRegistration = () => [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateLogin = () => [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validate = (req, res, next, validationType) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    success: false,
    errors: errors.array(),
    message: "Validation failed",
  });
};

module.exports = {
  validateRegistration,
  validateLogin,
  validate,
};
