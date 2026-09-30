const resend = require('../config/resend');

module.exports = async (email, otp) => {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: email,
    subject: 'ShopCart OTP',
    html: `<h3>Your new OTP is: <b>${otp}</b></h3>
           <p>This OTP is valid for 60 seconds.</p>`,
  });
};