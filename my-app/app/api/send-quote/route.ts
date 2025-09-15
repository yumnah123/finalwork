import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const {
      customerEmail,
      customerName,
      quote,
      pickupAddress,
      dropoffAddress,
      selectedDate,
      contactNumber
    } = await request.json();

    // Validate required fields
    if (!customerEmail || !customerName || !quote) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'baigannas9@gmail.com',
        pass: process.env.EMAIL_PASS || 'ttdn ikwh tgiz gvjo',
      },
    });

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount);
    };

    // Format distance
    const formatDistance = (distance: number) => {
      return `${distance.toFixed(1)} km (${(distance * 0.621371).toFixed(1)} miles)`;
    };

    // Format duration
    const formatDuration = (duration: number) => {
      const minutes = Math.round(duration / 60);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      if (hours > 0) {
        return `${hours}h ${remainingMinutes}m`;
      }
      return `${minutes} minutes`;
    };

    // Format date
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'baigannas9@gmail.com',
      to: customerEmail,
      subject: `Your Goldstar Executive Quote - ${formatCurrency(quote.total)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #235e99, #1a4773); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .quote-section { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #235e99; }
            .price-highlight { background: #235e99; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .breakdown { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .breakdown-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #dee2e6; }
            .breakdown-item:last-child { border-bottom: none; font-weight: bold; font-size: 1.1em; }
            .journey-details { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
            .detail-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef; }
            .footer { text-align: center; color: #666; margin-top: 30px; font-size: 14px; }
            .btn { display: inline-block; background: #235e99; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .valid-until { background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; text-align: center; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Executive Transport Quote</h1>
              <p>Premium car service with professional chauffeurs</p>
            </div>
            <div class="content">
              <p>Dear ${customerName},</p>
              <p>Thank you for choosing <strong>Goldstar Executive</strong> for your transportation needs. Please find your personalized quote below:</p>

              <div class="price-highlight">
                <h2 style="margin: 0; font-size: 2em;">${formatCurrency(quote.total)}</h2>
                <p style="margin: 5px 0 0 0;">Total Price</p>
              </div>

              <div class="quote-section">
                <h3>Journey Details</h3>
                <div class="journey-details">
                  <div class="detail-box">
                    <strong>📍 From:</strong><br>
                    ${pickupAddress || 'Pickup location'}
                  </div>
                  <div class="detail-box">
                    <strong>🎯 To:</strong><br>
                    ${dropoffAddress || 'Destination'}
                  </div>
                  <div class="detail-box">
                    <strong>📅 Date:</strong><br>
                    ${selectedDate ? formatDate(selectedDate) : 'To be confirmed'}
                  </div>
                  <div class="detail-box">
                    <strong>🚗 Distance:</strong><br>
                    ${formatDistance(quote.distance)}
                  </div>
                </div>
                <p><strong>⏱️ Estimated Duration:</strong> ${formatDuration(quote.estimatedDuration)}</p>
                ${contactNumber ? `<p><strong>📞 Contact:</strong> ${contactNumber}</p>` : ''}
              </div>

              <div class="breakdown">
                <h3>Price Breakdown</h3>
                <div class="breakdown-item">
                  <span>Base Fare</span>
                  <span>${formatCurrency(quote.baseFare)}</span>
                </div>
                <div class="breakdown-item">
                  <span>Distance Cost</span>
                  <span>${formatCurrency(quote.distanceCost)}</span>
                </div>
                <div class="breakdown-item">
                  <span>Waiting Time</span>
                  <span>${formatCurrency(quote.waitingTimeCost)}</span>
                </div>
                ${quote.surgeAmount > 0 ? `
                <div class="breakdown-item">
                  <span>Peak Time Surcharge (${quote.surgeMultiplier}%)</span>
                  <span>${formatCurrency(quote.surgeAmount)}</span>
                </div>
                ` : ''}
                <div class="breakdown-item">
                  <span>Total</span>
                  <span>${formatCurrency(quote.total)}</span>
                </div>
              </div>

              <div class="valid-until">
                ⏰ This quote is valid until: <strong>${quote.validUntil.toLocaleString('en-GB')}</strong>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:baigannas9@gmail.com?subject=Booking Confirmation - Quote ${formatCurrency(quote.total)}" class="btn">
                  Confirm Your Booking
                </a>
              </div>

              <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #235e99; margin-top: 0;">What's Included:</h4>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Professional, uniformed chauffeur</li>
                  <li>Executive class vehicle</li>
                  <li>Flight monitoring (for airport transfers)</li>
                  <li>Complimentary waiting time</li>
                  <li>24/7 customer support</li>
                  <li>All taxes and charges included</li>
                </ul>
              </div>

              <p>To proceed with your booking, simply reply to this email or click the "Confirm Your Booking" button above. Our team will contact you within 2 hours to finalize the details.</p>

              <p>If you have any questions or need to modify your booking, please don't hesitate to contact us.</p>

              <p>We look forward to providing you with exceptional service.</p>

              <p>Best regards,<br>
              <strong>The Goldstar Executive Team</strong></p>
            </div>
            <div class="footer">
              <p>Goldstar Executive - Premium Car & Chauffeur Service</p>
              <p>Surrey, London and the Home Counties</p>
              <p>📧 baigannas9@gmail.com | 📱 Available 24/7</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Quote sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending quote email:', error);
    return NextResponse.json(
      { error: 'Failed to send quote. Please try again later.' },
      { status: 500 }
    );
  }
}