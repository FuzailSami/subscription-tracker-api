import React, { useState } from 'react';

export default function AddSubscriptionPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ name, price, renewalDate })
      });
      if (res.ok) setMessage('Subscription added!');
      else setMessage('Failed to add subscription');
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <div>
      <h2>Add Subscription</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="date" placeholder="Renewal Date" value={renewalDate} onChange={e => setRenewalDate(e.target.value)} required />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
} 