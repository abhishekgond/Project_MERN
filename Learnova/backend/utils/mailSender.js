import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailSender = async (email, title, body) => {
  try {
    // Create transporter with SMTP details from env
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: `"StudyPoint" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: title,
      html: body, // can be plain text or HTML
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error During mail sender: " + error.message);
    throw error;
  }
};

export default mailSender;
