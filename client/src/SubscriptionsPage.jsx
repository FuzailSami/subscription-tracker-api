import React, { useEffect, useState } from 'react';

export default function SubscriptionsPage({ userId }) {
  const [subs, setSubs] = useState([]);
  const [error, setError] = useState('');

  const fetchSubs = async () => {
    setError('');
    try {
      const res = await fetch(`/api/subscription/user/${userId}`, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      const data = await res.json();
      if (res.ok) setSubs(data.subscriptions || []);
      else setError(data.message || 'Failed to fetch subscriptions');
    } catch (err) {
      setError('Network error');
    }
  };

  useEffect(() => { fetchSubs(); }, [userId]);

  const cancelSub = async (subId) => {
    try {
      const res = await fetch(`/api/subscription/${subId}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      if (res.ok) fetchSubs();
      else setError('Failed to cancel');
    } catch {
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>Your Subscriptions</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {subs.map(sub => (
          <li key={sub._id}>
            {sub.name} - {sub.status}
            <button onClick={() => cancelSub(sub._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 