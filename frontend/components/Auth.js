import { getAuthUrl } from '../lib/googleAuth';

export default function Auth() {
  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}
