import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { signOut } from '../state/user/userSlice';
import './../App.css';

interface Props {
  fetchTime: string;
}

const Header: React.FC<Props> = ({ fetchTime }) => {
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  return (
    <header>
      {username && 
        <div className="header">
          <p>Username: {username}</p>
          <p>Average fetch duration {fetchTime ? ` ${fetchTime} seconds` : "unknown"}</p>
          <button onClick={() => dispatch(signOut()) } className="button">Logout</button>
        </div>
      }
    </header>
  );
}

export default Header;