import nodemailer from "nodemailer";

const sendMailToAdmin = (name: string, email: string, phone: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noaworks88@gmail.com",
      pass: "jjlqwhjfswuwodhc",
    },
  });

  const mailOptions = {
    from: "noaworks88@gmail.com",
    to: "noanagar88@gmail.com",
    subject: "משתתף נוסף לסדנא",
    text: `${name} ${phone} ${email} :משתתף חדש נוסף לסדנא `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent to Admin:", info.response);
    }
  });
};

export { sendMailToAdmin };
