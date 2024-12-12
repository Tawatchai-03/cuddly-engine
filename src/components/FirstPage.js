import React from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับเปลี่ยนหน้า
import '../App.css'; // ใช้ Path ที่ถูกต้อง

function FirstPage() {
  const navigate = useNavigate(); // สร้างตัวแปร navigate สำหรับเปลี่ยนหน้า

  return (
    <div className="first-page">
      {/* กรอบครอบปุ่ม */}
      <div className="button-container">
        {/* ปุ่ม Auto-Signature */}
        <button
          className="btn"
          style={{
            '--clr': '#39FF14',
          }}
          onClick={() => navigate('/upload')} // เปลี่ยนไปหน้า /upload
        >
          <span>Auto-Signature</span>
          <i></i>
        </button>

        {/* ปุ่ม Upload-Signature */}
        <button
          className="btn"
          style={{
            '--clr': '#FF44CC',
          }}
          onClick={() => alert('Upload-Signature clicked!')} // ตัวอย่างฟังก์ชัน
        >
          <span>Upload-Signature</span>
          <i></i>
        </button>
      </div>
    </div>
  );
}

export default FirstPage;
