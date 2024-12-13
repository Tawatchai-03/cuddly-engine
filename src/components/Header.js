import React from 'react';
import './Header.css'; // สำหรับสไตล์ของ Header
import { Link } from 'react-router-dom'; // นำเข้า Link

function Header() {
  return (
    <header className="App-header">
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Auto-Signature
        </Link>
      </h1>
    </header>
  );
}

export default Header;
