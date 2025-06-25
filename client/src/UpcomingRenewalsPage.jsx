import React, { useEffect, useState } from 'react';

export default function UpcomingRenewalsPage() {
  const [renewals, setRenewals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRenewals = async () => {
      setError('');
      try {
        const res = await fetch('/api/subscription/upcoming-renewals', {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        const data = await res.json();
        if (res.ok) setRenewals(data.renewals || []);
        else setError(data.message || 'Failed to fetch renewals');
      } catch (err) {
        setError('Network error');
      }
    };
    fetchRenewals();
  }, []);

  return (
    <div>
      <h2>Upcoming Renewals</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {renewals.map(r => (
          <li key={r._id}>{r.name} - {r.renewalDate}</li>
        ))}
      </ul>
    </div>
  );
} 