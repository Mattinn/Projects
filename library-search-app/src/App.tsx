import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';
import { signIn } from './state/user/userSlice';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';

class Tracker {
  private times: number[] = [];

  addNew(timeInMs: string) {
      const time = parseFloat(timeInMs);
      if (!isNaN(time)) {
          this.times.push(time);
      }
  }

  calculate(): number {
      const total = this.times.reduce((acc, curr) => acc + curr, 0);
      return this.times.length > 0 ? total / this.times.length : 0; // Avoid division by zero
  }
}

function App() {
    const username = useSelector((state: RootState) => state.user.username)
    const dispatch = useDispatch();

    const durationTracker = new Tracker();
    const [loginUser, setloginUser] = useState('');
    const [loginError, setloginError] = useState(false);
    const [loadingTime, setLoadingTime] = useState('');
    
  
    const handleLogin = () => {
      if (loginUser) {
        dispatch(signIn(loginUser))
        setloginError(false);
      } else {
        //Username was empty -> show warning
        setloginError(true);
      }
    };

    //Check if the enter key was pressed in the login input -> 'log in' the user
    const loginInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleLogin()
      }
    }
    // Called when we recive a new response in search component
    const updateAverageDuration = useCallback((duration: string) => {
      durationTracker.addNew(duration);
  
      const average = durationTracker.calculate();
      //Pass the new average to the Header component
      setLoadingTime(average.toFixed(2));
    }, [durationTracker, setLoadingTime]);

  return (
    <div className="container">
      <Header fetchTime={loadingTime} />
      {username ? (
        <div className="logged-in">
          <Search newFetch={updateAverageDuration} />
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