"use client";

import { useState } from 'react';
import axios from 'axios';
import { getGoogleAuthUrl } from '../lib/googleAuth';

export default function Home() {
  const [contacts, setContacts] = useState([{ id: 1, companyName: '', email: '' }]);
  const [message, setMessage] = useState('');

  const handleContactChange = (id: number, field: string, value: string) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const handleAddRow = () => {
    const newId = Math.max(...contacts.map(c => c.id), 0) + 1;
    setContacts([...contacts, { id: newId, companyName: '', email: '' }]);
  };

  const handleLogin = () => {
    window.location.href = getGoogleAuthUrl();
  };

  const handleSendEmails = async () => {
    const accessToken = localStorage.getItem('googleAccessToken');
    if (!accessToken) {
      alert("Please log in first.");
      return;
    }

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
    <div style={styles.container}>
      <div style={styles.contactsSection}>
        <h2 style={styles.heading}>Contacts</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Company Name</th>
                <th style={styles.tableHeader}>Email</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={contact.companyName}
                      onChange={(e) => handleContactChange(contact.id, 'companyName', e.target.value)}
                      style={styles.input}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      placeholder="Email"
                      value={contact.email}
                      onChange={(e) => handleContactChange(contact.id, 'email', e.target.value)}
                      style={styles.input}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleAddRow} style={styles.addButton}>+ Add Row</button>
      </div>
      <div style={styles.messageSection}>
        <button onClick={handleLogin} style={styles.loginButton}>🔐 Login with Google</button>
        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={handleSendEmails} style={styles.sendButton}>✈️ Send Emails</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  contactsSection: {
    flex: 1,
    paddingRight: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  tableWrapper: {
    border: '1px solid #333',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#2a2a2a',
  },
  tableHeader: {
    padding: '10px',
    backgroundColor: '#333333',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    outline: 'none',
  },
  addButton: {
    marginTop: '12px',
    padding: '10px 20px',
    backgroundColor: '#444',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  messageSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  loginButton: {
    alignSelf: 'flex-end',
    marginBottom: '10px',
    padding: '10px 20px',
    backgroundColor: '#444',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  textarea: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '8px',
    resize: 'none',
    marginBottom: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
