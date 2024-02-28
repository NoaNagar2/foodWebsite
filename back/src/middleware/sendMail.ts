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

//
// const sendRegisteredEmail: RequestHandler = async (req, res, next) => {
//   const { username, email } = req.body;
//   try {
//     if (!username || !email) {
//       throw new ErrorsMes(
//         "Username and email are required for sending emails.",
//         400
//       );
//     }
//     const transporter = createTransport();
//     const mailGenerator = new Mailgen({
//       theme: "cerberus",
//       product: {
//         name: "SocialGram",
//         link: "https://localhost:5173/",
//       },
//     });

//     const emailMessage = {
//       body: {
//         name: username,
//         outro:
//           "I'm happy you joined us and hope you will have excellent time in Social Gram",
//       },
//     };

//     const emailBody = mailGenerator.generate(emailMessage);

//     const message = {
//       from: "noaworks88@gmail.com",
//       to: email,
//       subject: "Registration complete",
//       html: emailBody,
//     };

//     transporter.sendMail(message, (err, info) => {
//       if (err) {
//         return next(err);
//       }
//       next();
//     });
//   } catch (error) {
//     Logger.error(error);
//     next(error);
//   }
// };
