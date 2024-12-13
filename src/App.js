import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import Upload from './components/Upload';
import UploadSignature from './components/UploadSignature'; // เพิ่มการนำเข้า

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/upload-signature" element={<UploadSignature />} /> {/* เพิ่มเส้นทาง */}
      </Routes>
    </Router>
  );
}

export default App;
