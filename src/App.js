import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header'; // Header ใช้ในทุกหน้า
import FirstPage from './components/FirstPage'; // นำเข้า FirstPage
import Upload from './components/Upload'; // นำเข้าหน้า Upload

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Header ที่จะแสดงทุกหน้า */}
        <Routes>
          {/* หน้าแรก */}
          <Route path="/" element={<FirstPage />} />
          
          {/* หน้า Upload */}
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
