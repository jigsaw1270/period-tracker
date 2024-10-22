// src/App.js
import React ,{ useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './Login';
import CalendarPage from './CalenderPage';  // Your calendar component

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);  // Stop loading when user state is known
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Optional loading state
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Auth /> : <Navigate to="/calendar" />} />
        <Route path="/calendar" element={user ? <CalendarPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
