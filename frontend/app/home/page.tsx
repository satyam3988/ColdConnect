import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [contacts, setContacts] = useState([{ id: 1, companyName: '', email: '' }]);
  const [message, setMessage] = useState('');

  const handleSendEmails = async () => {
    const accessToken = localStorage.getItem('googleAccessToken');
    try {
      const response = await axios.post('http://localhost:8000/email/sendEmails', {
        contacts,
        message,
        access_token: accessToken,
      });
      alert('Emails sent successfully!');
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendEmails}>Send Emails</button>
    </div>
  );
}
