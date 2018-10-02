import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const NotFound = () => (
  <div className="app-page not-found">
    <header className="header">
      <Header />
    </header>
    <div className="_404">404</div>
    <Link className="dashed" to="/movies">
      Перейти на главную
    </Link>
  </div>
);

export default NotFound;
