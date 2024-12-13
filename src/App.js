import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // นำเข้า Header ที่ใช้ในทุกหน้า
import FirstPage from './components/FirstPage'; // นำเข้าหน้าแรก
import Upload from './components/Upload'; // นำเข้าหน้าอัปโหลด PDF
import UploadSignature from './components/UploadSignature'; // นำเข้าหน้าอัปโหลดลายเซ็น

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header จะปรากฏในทุกหน้า */}
        <Header />

        {/* Routes สำหรับควบคุมการเปลี่ยนหน้า */}
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload-signature" element={<UploadSignature />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
