import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "arhamrafiq831@gmail.com",
    pass: "wesfzxddzptsoidx",
  },
});

export const mailSender = async (email, code) => {
  const info = await transporter.sendMail({
    from: '"AR WEB DEVELOPER" <arhamrafiq831@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "✔ Verification Code", // Subject line
    text: "Thanks for loging to my Website", // plain text body
    html: `<h1>Welcom To AR Dev</h1>
        <p>Thanks for trying ourweb services Your Verification Code is given below</p>
        <h2>${code}</h2>`,
  });
  console.log(`Mail to "${email}" has been sended Successfully`);
};

export const SuccessfulOrderMail = async (email, name, orderId) => {
  const info = await transporter.sendMail({
    from: '"AR WEB DEVELOPER" <arhamrafiq831@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Order Placement", // Subject line
    text: "", // plain text body
    html: `<h1>Thanks for Ordering ${name}</h1>
        <p>Thanks for trying ourweb services.Now You can keep in contact with us thourgh our gmail service for better compleion of your Project. Our Developer will confirm your Order and contact you Soon for further clearification and assisstance and inform you about the Charges.For any query feel free to contact us here!</p>
        `,
  });
  console.log(`Mail to "${email}" has been sended Successfully`);
};
