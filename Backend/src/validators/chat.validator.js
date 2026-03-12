import { body, param, validationResult } from "express-validator";

// Create chat validation
export const validateCreateChat = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Chat title is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Chat title must be between 1 and 100 characters"),
];

// Get chat by ID validation
export const validateChatId = [
  param("chatId")
    .notEmpty()
    .withMessage("Chat ID is required")
    .isMongoId()
    .withMessage("Invalid chat ID format"),
];

// Update chat validation
export const validateUpdateChat = [
  param("chatId")
    .notEmpty()
    .withMessage("Chat ID is required")
    .isMongoId()
    .withMessage("Invalid chat ID format"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Chat title must be between 1 and 100 characters"),
];

// Validation error handler middleware
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};
