import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

const Header = () => (
  <nav>
    <ul className="menu">
      <li>
        <img src={logo} alt="Cut The Crap" />
      </li>
      <li>
        <Link to="/movies">Фильмы</Link>
      </li>
      <li>
        <Link to="/serials">Сериалы</Link>
      </li>
    </ul>
  </nav>
);

export default Header;
