const nodemailer = require('nodemailer');

// Gmail se email bhejne ka setup (user aur password .env se aate hain)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  // Agar .env mein email set nahi hai, to OTP terminal mein dikha do
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('EMAIL (not sent, .env missing) to ' + to + ' | ' + text);
    return;
  }

  await transporter.sendMail({
    from: '"O Positive Health" <' + process.env.EMAIL_USER + '>',
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;