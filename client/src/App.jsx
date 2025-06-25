import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SubscriptionsPage from './SubscriptionsPage';
import AddSubscriptionPage from './AddSubscriptionPage';
import UpcomingRenewalsPage from './UpcomingRenewalsPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  // For demo, get userId from localStorage or use a hardcoded one
  const userId = localStorage.getItem('userId') || '665a1b2c3d4e5f6789012345';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <Router>
      <nav style={{marginBottom:20}}>
        <Link to="/">Home</Link> |{' '}
        {loggedIn ? <>
          <Link to="/subscriptions">Subscriptions</Link> |{' '}
          <Link to="/add">Add Subscription</Link> |{' '}
          <Link to="/renewals">Upcoming Renewals</Link> |{' '}
          <button onClick={handleLogout}>Logout</button>
        </> : <>
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link>
        </>}
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to Subscription Tracker</h1>} />
        <Route path="/login" element={<LoginPage onLogin={() => setLoggedIn(true)} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/subscriptions" element={loggedIn ? <SubscriptionsPage userId={userId} /> : <Navigate to="/login" />} />
        <Route path="/add" element={loggedIn ? <AddSubscriptionPage /> : <Navigate to="/login" />} />
        <Route path="/renewals" element={loggedIn ? <UpcomingRenewalsPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
