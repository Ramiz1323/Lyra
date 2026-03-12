import { body, param, validationResult } from "express-validator";

// Create message validation
export const validateCreateMessage = [
  body("chatId")
    .notEmpty()
    .withMessage("Chat ID is required")
    .isMongoId()
    .withMessage("Invalid chat ID format"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Message content is required")
    .isLength({ min: 1, max: 10000 })
    .withMessage("Message must be between 1 and 10000 characters"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["user", "ai"])
    .withMessage("Role must be either 'user' or 'ai'"),
];

// Get messages validation
export const validateChatId = [
  param("chatId")
    .notEmpty()
    .withMessage("Chat ID is required")
    .isMongoId()
    .withMessage("Invalid chat ID format"),
];

// Delete message validation
export const validateMessageId = [
  param("messageId")
    .notEmpty()
    .withMessage("Message ID is required")
    .isMongoId()
    .withMessage("Invalid message ID format"),
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
