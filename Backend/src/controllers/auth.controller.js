import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists)
    return res.status(400).send({ message: "User already exists" });

  const user = await userModel.create({ username, email, password });

  const emailVerificationToken = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  await sendEmail({
    to: user.email,
    subject: "Welcome to our platform",
    html: `<h1>Welcome, ${user.username}!</h1>
    <p>Thank you for registering on our platform.</p>
    <p>We're excited to have you on board!</p>
    <p>Verify your account to explore our features and services.</p>
    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}" class="btn btn-primary" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
    <p>Best regards,<br/>The Team</p>`,
  });

  res.status(201).send({
    message: "User created successfully",
    user,
  });
}

export async function verifyEmail(req, res) {
  const { token } = req.query;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findOne({ email: decoded.email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  user.verified = true;
  await user.save();

  const html = `<h1>Email Verified</h1>
  <p>Thank you, ${user.username}! Your email has been successfully verified.</p>
  <p>You can now log in to your account and enjoy our services.</p>
  <p>Best regards,<br/>The Team</p>`;
  res.send(html);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  if (!user.verified) {
    return res.status(401).send({
      message: "Please verify your email",
      success: false,
      err: "Email not verified",
    });
  }

  const token = jwt.sign({ userId: user._id,email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token);

  res.status(200).json({
    message: "Logged in successfully",
    user:{
      _id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified,
    }
  });
}

export async function getMe(req, res) {
  const user = req.user;
  res.status(200).json({
    message: "User profile fetched successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified,
    }
  });
}
