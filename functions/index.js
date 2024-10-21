import { firestore } from 'firebase-functions';
import { initializeApp, firestore as _firestore } from 'firebase-admin';
import { createTransport } from 'nodemailer';

initializeApp();
const db = _firestore();

// Configure Nodemailer transporter with Gmail SMTP
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'mahmudul@bluebnc.com',   // Replace with your Gmail address
    pass: 'Blue2024!',    // Replace with your Gmail password
  },
});

export const scheduleEmailReminder = firestore
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
      setTimeout(sendReminderEmail, 1000);  
    //   25 * 24 * 60 * 60 * 1000)
    }
  });
