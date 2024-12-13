import React, { useState } from 'react';
import '../App.css'; // ใช้ Path ที่ถูกต้องสำหรับ App.css
import Header from './Header'; // Header ต้องใช้ Path ที่ถูกต้อง

function UploadSignature() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        setSelectedFile(file);

        // แปลงไฟล์ภาพเป็น URL สำหรับแสดงตัวอย่าง
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target.result); // เก็บ Data URL ของภาพ
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload only PNG or JPG files.');
        setSelectedFile(null);
        setPreviewImage(null);
      }
    }
  };

  return (
    <div className="upload-page">
      <Header />
      <main>
        <div className="file-container">
          {/* แสดงตัวอย่างรูปภาพลายเซ็น */}
          {previewImage && (
            <div className="file-preview">
              <img
                src={previewImage}
                alt="Signature Preview"
                style={{ width: '300px', marginBottom: '20px', borderRadius: '10px' }}
              />
              <p style={{ color: 'white', textAlign: 'center' }}>
                {selectedFile && selectedFile.name}
              </p>
            </div>
          )}
          {/* Input สำหรับเลือกไฟล์ */}
          <input
            type="file"
            id="file-upload"
            accept="image/png, image/jpeg" // อนุญาตเฉพาะ PNG และ JPG
            style={{ display: 'none' }} // ซ่อน Input
            onChange={handleFileChange}
          />
          {/* ปุ่ม Upload */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              className="btn"
              style={{ '--clr': '#39FF14' }}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <span>Upload Signature</span>
              <i></i>
            </button>
            {selectedFile && (
              <button
                className="btn"
                style={{ '--clr': '#FF44CC' }}
                onClick={() => alert('Next button clicked!')}
              >
                <span>&rarr;</span>
                <i></i>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UploadSignature;
