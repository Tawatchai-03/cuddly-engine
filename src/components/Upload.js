import React, { useState } from 'react';
import '../App.css'; // ใช้ Path ที่ถูกต้องสำหรับ App.css
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';

// ใช้ worker ที่มาพร้อมกับแพ็กเกจ pdfjs-dist
GlobalWorkerOptions.workerSrc = require('pdfjs-dist/legacy/build/pdf.worker.entry');

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setSelectedFile(file);

        // แปลงหน้าแรกของ PDF เป็นภาพตัวอย่าง
        const fileReader = new FileReader();
        fileReader.onload = async function () {
          const typedArray = new Uint8Array(this.result);
          const pdf = await getDocument(typedArray).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;
          setPreviewImage(canvas.toDataURL()); // เก็บภาพตัวอย่างเป็น Data URL
        };
        fileReader.readAsArrayBuffer(file);
      } else {
        alert('Please upload only PDF files.');
        setSelectedFile(null);
        setPreviewImage(null);
      }
    }
  };

  return (
    <div className="upload-page">
      <div className="advertisement-left">พื้นที่สำหรับโฆษณา</div>
      <main>
        <div className="file-container">
          {/* แสดงตัวอย่าง PDF หากมี */}
          {previewImage && (
            <div className="file-preview">
              <img
                src={previewImage}
                alt="PDF Preview"
                style={{ width: '300px', marginBottom: '20px' }}
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
            accept="application/pdf" // อนุญาตเฉพาะ PDF
            style={{ display: 'none' }} // ซ่อน Input
            onChange={handleFileChange}
          />
          {/* ปุ่ม Upload และ Next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              className="btn"
              style={{ '--clr': '#39FF14' }}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <span>Upload</span>
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
      <div className="advertisement-right">พื้นที่สำหรับโฆษณา</div>
    </div>
  );
}

export default Upload;
