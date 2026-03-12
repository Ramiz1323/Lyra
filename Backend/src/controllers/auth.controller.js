import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists)
    return res.status(400).send({ message: "User already exists" });

  const user = await userModel.create({ username, email, password });

  await sendEmail({
    to: user.email,
    subject: "Welcome to our platform",
    html: "<h1>Welcome to our platform</h1> <h3>Thank you for registering</h3>",
  });

  res.status(201).send({
    message: "User created successfully",
    user,
  })
}
