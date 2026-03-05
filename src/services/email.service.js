const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bank Backend" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegisterationEmail(userEmail, name) {
  const subject = "Welcome to Bank Backend – Account Successfully Created 🎉";

  const text = `
Hello ${name},

Welcome to Bank Backend!

Your account has been successfully created.
We are excited to have you on board.

Login here:
https://yourbankwebsite.com/login

Best regards,
The Bank Backend Team
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:30px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" 
style="background-color:#ffffff;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.1);overflow:hidden;">

<tr>
<td align="center" style="background-color:#0a3d62;padding:30px;color:#ffffff;">
<h1 style="margin:0;font-size:26px;">🏦 Bank Backend</h1>
<p style="margin:8px 0 0 0;font-size:14px;">Secure • Reliable • Modern Banking</p>
</td>
</tr>

<tr>
<td style="padding:40px 30px;color:#333333;font-size:16px;line-height:1.6;">

<p>Hello <strong>${name}</strong>,</p>

<p>
Thank you for registering with <strong>Bank Backend</strong>.
Your account has been successfully created.
</p>

<p>
You can now access your dashboard and start exploring our platform.
</p>

<div style="text-align:center;margin:30px 0;">
<a href="https://yourbankwebsite.com/login"
style="background-color:#0a3d62;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:4px;font-weight:bold;display:inline-block;">
Access Your Dashboard
</a>
</div>

<p>
If you have any questions, feel free to contact our support team.
</p>

<p>
Best regards,<br>
<strong>The Bank Backend Team</strong>
</p>

</td>
</tr>

<tr>
<td align="center" style="padding:20px;background-color:#f4f6f8;color:#888888;font-size:12px;">
© ${new Date().getFullYear()} Bank Backend. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Successfully Completed!";

  const text = `Hello ${name},\n\nYour transaction of ${amount} to account ${toAccount} was successfull.\n\nBest regards,\nThe Backend Ledger Team`;

  const html = `<p>Hello ${name},</p><p>Your transaction of ${amount} to account ${toAccount} was successful.<p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html)


}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Failed!";

  const text = `
Hello ${name},

Your transaction could not be completed.

Transaction Details:
Amount: ${amount}
Recipient Account: ${toAccount}
Status: FAILED

Please check your account balance or try again later.

Best regards,
The Backend Ledger Team
`;

  const html = `
<h3>Hello ${name},</h3>

<p>We regret to inform you that your transaction could not be completed.</p>

<p>
<b>Transaction Details:</b><br>
Amount: <b>${amount}</b><br>
Recipient Account: <b>${toAccount}</b><br>
Status: <span style="color:red;"><b>FAILED</b></span>
</p>

<p>Please check your account balance or try again later.</p>

<p>Best regards,<br>
<strong>The Backend Ledger Team</strong></p>
`;

  await sendEmail(userEmail, subject, text, html)


}

module.exports = { sendRegisterationEmail, sendTransactionEmail, sendTransactionFailureEmail };
