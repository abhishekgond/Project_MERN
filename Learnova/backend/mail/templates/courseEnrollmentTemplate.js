const courseEnrollmentTemplate = (username, courseName, dashboardLink) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333; }
      .container { background-color: #fff; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; text-align: center; }
      .header-logo { background-color: #facc15; padding: 10px; border-radius: 5px; font-size: 22px; font-weight: bold; margin-bottom: 20px; }
      .btn { background-color: #facc15; padding: 10px 20px; text-decoration: none; color: black; font-weight: bold; border-radius: 5px; display: inline-block; margin-top: 20px; }
      p { margin: 10px 0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header-logo">StudyNotion</div>
      <h2>Course Registration Confirmation</h2>
      <p>Dear ${username},</p>
      <p>You have successfully registered for the course <strong>"${courseName}"</strong>.</p>
      <p>We’re excited to have you!</p>
      <p>Login to your dashboard and start learning:</p>
      <a href="${dashboardLink}" class="btn">Go to Dashboard</a>
      <p>If you need help, contact us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</p>
    </div>
  </body>
  </html>
  `;
};

module.exports = courseEnrollmentTemplate;

// Time : 34 :00
