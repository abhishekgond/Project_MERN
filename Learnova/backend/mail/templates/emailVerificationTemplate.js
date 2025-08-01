const emailVerificationTemplate = (username, verificationLink) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333; }
      .container { background-color: #fff; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; text-align: center; }
      .btn { background-color: #facc15; padding: 10px 20px; text-decoration: none; color: black; font-weight: bold; border-radius: 5px; display: inline-block; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Email Verification Required</h2>
      <p>Dear ${username},</p>
      <p>Thank you for registering with us. Please click the button below to verify your email address:</p>
      <a href="${verificationLink}" class="btn">Verify Email</a>
      <p>If you didn’t request this, just ignore this email.</p>
      <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
    </div>
  </body>
  </html>
  `;
};

module.exports = emailVerificationTemplate;
