import { useState, useEffect } from 'react';
import LogRegister from './comps/LogRegister';
import App from './App';

function MainMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState('');
  const handleLogin = async (userName, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: userName, password: password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setUser(data.userData);  // Set user data received from the backend
      setIsLoggedIn(true)
      console.log('Login successful', data); // Log the user data
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (userName, password) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: userName, password: password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      setUser(data.userData);  // Set user data received from the backend
      setIsLoggedIn(true)
      console.log('Registration successful', data); // Log the user data
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  useEffect(() => {
    // Check if the user is logged in by making a call to your backend
    fetch("http://localhost:5000/user", {
      credentials: 'include',  // to send the session cookies
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setIsLoggedIn(true);
          setUser(data.user);
          setUserName(data.userName);
        }
      })
      .catch(error => {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <div className="MainMenu">
      {isLoggedIn ? (
        <App user={user} setUser={setUser} userName={userName}/>  // A component for the logged-in user
      ) : (
        <LogRegister onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
  );
}

export default MainMenu;

