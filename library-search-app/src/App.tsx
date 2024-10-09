import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';
import { signIn } from './state/user/userSlice';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';

function App() {
  const username = useSelector((state: RootState) => state.user.username)
  const dispatch = useDispatch();

  const [loginUser, setloginUser] = useState('');
  const [loginError, setloginError] = useState(false);
  
  const handleLogin = () => {
    if (loginUser) {
      dispatch(signIn(loginUser))
      setloginError(false);
    } else {
      //username was empty -> show warning
      setloginError(true);
    }
  };

  //check if the enter key was pressed in the login input -> 'log in' the user
  const loginInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="container">
      <Header />
      {username ? (
        <div className="logged-in">
          <Search />
        </div>
      ) : (
        <div className="login">
          <h2>Please log in</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={loginUser}
            onChange={(e) => setloginUser(e.target.value)}
            onKeyDown={loginInputKeyDown}
            className={`input ${loginError ? "input-error" : ""}`}
          />
          <button onClick={handleLogin} className="button">Login</button>
          {loginError && <p className="error">Username is required</p>}
        </div>
      )}
    </div>
  );
}

export default App;