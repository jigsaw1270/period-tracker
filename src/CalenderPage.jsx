// src/CalendarPage.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { auth, db } from './firebase';  // Firebase auth and Firestore
import { doc, setDoc } from 'firebase/firestore';  // Firestore methods

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());  // State to track selected date

  // Function to save the selected date in Firestore
  const handleDateSelect = async (date) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          periodStartDate: date,
        });
        alert('Date saved successfully');
      } catch (error) {
        alert('Error saving date: ' + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Period Tracker</h1>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <Calendar
          onChange={setDate}  // Set selected date in state
          value={date}  // Value of the calendar
        />
        <p className="mt-4">Selected Date: {date.toDateString()}</p>
        <button
          onClick={() => handleDateSelect(date)}  // Call handleDateSelect on button click
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Save Date
        </button>
      </div>
      <button
        onClick={() => alert('Logout button works')}  // Logout button placeholder
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default CalendarPage;
