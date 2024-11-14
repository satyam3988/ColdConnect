"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        try {
          // Send the authorization code to the backend to exchange it for an access token
          const response = await axios.post('http://localhost:8000/auth', { code });
          
          // Store the access token in localStorage or a cookie
          localStorage.setItem('googleAccessToken', response.data.access_token);
          
          // Redirect to home page after successful authentication
          router.push('/');
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      }
    };
    handleAuth();
  }, [router]);

  return <div>Authenticating...</div>;
}
