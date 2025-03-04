import{ useState } from 'react';

function LogRegister({ onLogin, onRegister }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setErrorMessage('Please provide both username and password');
      return;
    }

    try {
      // Call the parent onLogin function
      await onLogin(userName, password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Login failed');
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setErrorMessage('Please provide both username and password');
      return;
    }

    try {
      // Call the parent onRegister function
      await onRegister(userName, password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Registration failed');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>LogIn / Register</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" onClick={handleLogin}>Login</button>
          <button type="submit" onClick={handleRegister}>Register</button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default LogRegister;
