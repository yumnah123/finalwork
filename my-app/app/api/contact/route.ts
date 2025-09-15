import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, recaptchaToken } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification is required' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA with Google
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=6LeyWcorAAAAAEDT__yMHDMUG-vf1BQTrSN6yUYj&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Create transporter (using Gmail as example - you can change this)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'baigannas9@gmail.com', // Your email
        pass: 'ttdn ikwh tgiz gvjo', // Your app password
      },
    });

    // Email content
    const mailOptions = {
      from: 'baigannas9@gmail.com',
      to: email, // Send to the user's email
      subject: 'Thank you for contacting Goldstar Executive',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #235e99, #1a4773); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #235e99; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; color: #666; margin-top: 20px; font-size: 14px; }
            .btn { display: inline-block; background: #235e99; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
              <p>Your message has been received</p>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for reaching out to <strong>Goldstar Executive</strong>. We have received your message and will get back to you as soon as possible.</p>

              <div class="message-box">
                <h3>Your Message:</h3>
                <p><em>"${message}"</em></p>
              </div>

              <p>Our team typically responds within 24 hours during business days. If your inquiry is urgent, please feel free to call us directly.</p>

              <p>We look forward to assisting you with your executive transportation needs.</p>

              <p>Best regards,<br>
              <strong>The Goldstar Executive Team</strong></p>
            </div>
            <div class="footer">
              <p>Goldstar Executive - Premium Car & Chauffeur Service</p>
              <p>Surrey, London and the Home Counties</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}