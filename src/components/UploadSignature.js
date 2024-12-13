import React, { useState } from 'react';
import '../App.css'; // ใช้ Path ที่ถูกต้องสำหรับ App.css
import Header from './Header'; // Header ต้องใช้ Path ที่ถูกต้อง

function UploadSignature() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState(''); // state สำหรับเก็บชื่อ

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

  const handleSave = () => {
    if (name.trim() === '') {
      alert('Please enter your name.');
    } else {
      alert(`Signature saved successfully for ${name}.`);
    }
  };

  return (
    <div className="upload-page" style={{ display: 'flex' }}>
      {/* แถบซ้าย */}
      <div
        className="advertisement-left"
      >
        พื้นที่สำหรับโฆษณา
      </div>

      {/* เนื้อหากลาง */}
      <div style={{ flex: 1 }}>
        <Header />
        <main>
          <div className="file-container">
            {/* แสดงตัวอย่างรูปภาพลายเซ็น */}
            {previewImage && (
              <div className="file-preview">
                <img
                  src={previewImage}
                  alt="Signature Preview"
                  style={{
                    width: '300px',
                    marginBottom: '20px',
                    borderRadius: '10px',
                  }}
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
            </div>

            {/* แสดงช่องใส่ชื่อและปุ่มบันทึกเมื่ออัปโหลดไฟล์แล้ว */}
            {selectedFile && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '80%',
                    marginBottom: '10px',
                  }}
                />
                <br />
                <button
                  className="btn"
                  style={{ '--clr': '#FF44CC' }}
                  onClick={handleSave}
                >
                  <span>Save</span>
                  <i></i>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* แถบขวา */}
      <div
        className="advertisement-right"
      >
        พื้นที่สำหรับโฆษณา
      </div>
    </div>
  );
}

export default UploadSignature;
