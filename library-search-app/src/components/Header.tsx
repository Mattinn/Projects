import React from 'react';
import './../App.css';

interface Props {
  username: string;
  fetchTime: string;
  logOut: () => void;
}

const Header: React.FC<Props> = ({ username, fetchTime, logOut }) => {
  return (
    <header>
      {username && 
        <div className="header">
          <p>Username: {username}</p>
          <p>{fetchTime ? `Average fetch duration: ${fetchTime} seconds` : ''}</p>
          <button onClick={logOut} className="button">Logout</button>
        </div>
      }
    </header>
  );
}

export default Header;