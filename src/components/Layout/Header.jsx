// Header.jsx
import React from 'react';
import {Disclaimer} from './Disclaimer';
import {Navbar} from './Navbar';


const Header = () => {
  return (
    <header>
      <Disclaimer />
      <Navbar />
    </header>
  );
};

export {Header};
