import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { signOut } from '../state/user/userSlice';
import './../App.css';

const Header = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const averageResponseTime = useSelector((state: RootState) => state.books.averageResponseTime);
  const dispatch = useDispatch();
  return (
    <header>
      {username && 
        <div className="header">
          <p>Welcome, {username}</p>
          <p>Average fetch duration {averageResponseTime ? ` ${averageResponseTime} seconds` : "unknown"}</p>
          <button onClick={() => dispatch(signOut()) } className="button">Logout</button>
        </div>
      }
    </header>
  );
}

export default Header;