import nodemailer from "nodemailer";
import schedule from "node-schedule";
import { Workshop } from "../database/model/workshop";

async function sendEmailAtTime(email: string) {
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    // Specify your email service provider details here
    service: "Gmail",
    auth: {
      user: "noaworks88@gmail.com",
      pass: "jjlqwhjfswuwodhc",
    },
  });

  // Email content
  let mailOptions = {
    from: "noaworks88@gmail.com",
    to: email,
    subject: "תזכורת סדנא",
    text: "מחר זה קורה.",
  };

  // Send email
  let info = await transporter.sendMail(mailOptions);
  console.log("Email sent: " + info.response);
}

export { sendEmailAtTime };
