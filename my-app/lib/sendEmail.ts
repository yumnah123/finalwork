import nodemailer from "nodemailer";

export async function sendResetEmail(to: string, resetLink: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `" Gold Star Admin Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset Link",
    html: `
      <p>Click the link below to reset your password. This link expires in 15 minutes:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
}
