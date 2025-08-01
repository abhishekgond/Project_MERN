const passwordUpdate = (username) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333; }
      .container { background-color: #fff; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; }
      .btn { background-color: #facc15; padding: 10px 20px; text-decoration: none; color: black; font-weight: bold; border-radius: 5px; display: inline-block; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Password Update Successful</h2>
      <p>Dear ${username},</p>
      <p>Your password has been successfully updated. If this was not you, please reset your password immediately.</p>
      <a href="[ResetLink]" class="btn">Reset Password</a>
      <p>For help, contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
    </div>
  </body>
  </html>
  `;
};

module.exports = passwordUpdate;
