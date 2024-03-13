import nodemailer from "nodemailer";
import { Workshop } from "../database/model/workshop";

const sendMailReminder = async (
  { i },
  workshopId: any,
  description: string,
  subject: string
) => {
  const workshop = await Workshop.findById(workshopId);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noaworks88@gmail.com",
      pass: "jjlqwhjfswuwodhc",
    },
  });

  const mailOptions = {
    from: "noaworks88@gmail.com",
    to: i.email,
    subject: subject,
    text: description,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export { sendMailReminder };
