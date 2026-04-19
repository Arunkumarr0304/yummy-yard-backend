import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import OTP from '../models/OTP.js';

// Generate 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Create nodemailer transporter (only if credentials are available)
let transporter = null;

const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  // Check if credentials are properly configured
  if (!emailUser || !emailPass || 
      emailUser === 'your-email@gmail.com' || 
      emailPass === 'your-app-password-here') {
    console.log('⚠️ Email credentials not configured. OTP will be logged to console only.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
};

// Send OTP to email
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email address' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Delete any existing OTP for this email
    await OTP.deleteMany({ email: email.toLowerCase() });

    // Save new OTP to database
    const newOTP = new OTP({
      email: email.toLowerCase(),
      otp: otp
    });
    await newOTP.save();

    // Initialize transporter
    transporter = createTransporter();

    if (transporter) {
      // Send email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP - Yummy Yard',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #22c55e; text-align: center;">Yummy Yard</h2>
            <h3 style="color: #1a1a2e;">Password Reset Request</h3>
            <p style="color: #6b7280; font-size: 14px;">We received a request to reset your password. Use the OTP code below to proceed:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #1a1a2e; font-size: 36px; letter-spacing: 10px; margin: 0;">${otp}</h1>
            </div>
            <p style="color: #6b7280; font-size: 12px;">This OTP will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ OTP email sent to ${email}`);
    } else {
      // Development mode: Log OTP to console
      console.log('=================================');
      console.log('📧 DEVELOPMENT MODE - EMAIL NOT SENT');
      console.log('=================================');
      console.log(`To: ${email}`);
      console.log(`OTP Code: ${otp}`);
      console.log('=================================');
    }

    res.json({
      message: 'OTP sent successfully to your email',
      email: email.toLowerCase()
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Please provide email and OTP' });
    }

    // Find OTP in database
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp: otp
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP or OTP has expired' });
    }

    res.json({
      message: 'OTP verified successfully',
      email: email.toLowerCase()
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and new password' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    // Delete OTP record
    await OTP.deleteMany({ email: email.toLowerCase() });

    res.json({
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
};
