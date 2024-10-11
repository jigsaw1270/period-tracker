const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();
const db = admin.firestore();

// Configure Nodemailer transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',   // Replace with your Gmail address
    pass: 'your-email-password',    // Replace with your Gmail password
  },
});

// Cloud Function to schedule an email reminder after 25 days
exports.scheduleEmailReminder = functions.firestore
  .document('users/{userId}')
  .onWrite(async (change, context) => {
    const newValue = change.after.data();
    const userId = context.params.userId;

    if (newValue.periodStartDate) {
      const periodStartDate = new Date(newValue.periodStartDate);
      const reminderDate = new Date(periodStartDate);
      reminderDate.setDate(reminderDate.getDate() + 25);  // Add 25 days

      const userDoc = await db.collection('users').doc(userId).get();
      const userEmail = userDoc.data().email;  // Assuming the email is stored in Firestore

      // Schedule email for 25 days later
      const sendReminderEmail = async () => {
        const mailOptions = {
          from: 'your-email@gmail.com',  // Your Gmail address
          to: userEmail,  // User's email from Firestore
          subject: 'Period Reminder',
          text: `Hi, your period start date was ${periodStartDate.toDateString()}.
                 Your next period is expected to start soon.`,
          html: `<strong>Hi, your period start date was ${periodStartDate.toDateString()}.</strong>
                 <p>Your next period is expected to start soon.</p>`,
        };

        // Send email
        try {
          await transporter.sendMail(mailOptions);
          console.log('Reminder email sent to:', userEmail);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };

      // Schedule the email to be sent 25 days later
      setTimeout(sendReminderEmail, 25 * 24 * 60 * 60 * 1000);  // 25 days in milliseconds
    }
  });
