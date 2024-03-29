import nodemailer from "nodemailer";
import { Workshop } from "../database/model/workshop";

const sendMail = async (email: string, workshopId: string) => {
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
    to: email,
    subject: "ההרשמה לסדנא בוצעה בהצלחה",
    text: ` ${workshop.title} :נרשמת לסדנא
    ${workshop.date} :בתאריך 
     ${workshop.time} :בשעה 
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export { sendMail };
