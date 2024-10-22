const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');


  
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from your frontend
  }));

// Example POST route for sending an email
app.post('/send-email', async (req, res) => {
  const { email, periodStartDate } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // From .env
      pass: process.env.EMAIL_PASS,  // From .env
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Period Tracker Reminder',
    text: `Your last period started on ${periodStartDate}. Your period is close!`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
