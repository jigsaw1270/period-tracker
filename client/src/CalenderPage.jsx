// src/CalendarPage.js
import  React ,{ useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { auth, db } from './firebase';  // Firebase auth and Firestore
import { doc, setDoc } from 'firebase/firestore';  // Firestore functions
import { logout } from './auth'; 

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());  // State to track selected date

  // Function to save the selected date in Firestore and send a reminder email
  const handleDateSelect = async (date) => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Update the periodStartDate in the user's document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          periodStartDate: date,
        }, { merge: true });  // 'merge: true' ensures other fields are not overwritten

        alert('Date saved successfully');

        // Send a reminder email after saving the date in Firestore
        const response = await fetch('http://localhost:5000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,  // Use the current user's email
            periodStartDate: date.toDateString(),  // Pass the selected date
          }),
        });

        if (response.ok) {
          alert('Reminder email scheduled successfully');
        } else {
          alert('Failed to schedule reminder email');
        }

      } catch (error) {
        alert('Error saving date or sending email: ' + error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert('Logged out successfully');
      // Redirect to login page or perform any post-logout actions
    } catch (error) {
      console.error('Error logging out:', error.message);
      alert('Failed to log out');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-6 text-3xl font-bold">Period Tracker</h1>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <Calendar
          onChange={setDate}  // Set selected date in state
          value={date}  // Value of the calendar
        />
        <p className="mt-4">Selected Date: {date.toDateString()}</p>
        <button
          onClick={() => handleDateSelect(date)}  // Call handleDateSelect on button click
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
        >
          Save Date
        </button>
      </div>
      <button
          onClick={handleLogout}  // Logout button placeholder
        className="px-4 py-2 mt-6 text-white bg-red-500 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default CalendarPage;
