import fitz  # PyMuPDF
from PIL import Image
from fuzzywuzzy import fuzz  # เพิ่มการใช้ fuzzywuzzy
from pdf2image import convert_from_path
from pytesseract import image_to_string

# ฟังก์ชันเพิ่มรูปภาพที่ตำแหน่งที่ค้นหา
def add_signature(page, x0, y0, x1, y1, signature_image, fixed_width, fixed_height):
    # กำหนดระยะห่างใต้ข้อความ
    margin_bottom = -20  # ระยะห่างระหว่างข้อความและลายเซ็น

    # คำนวณตำแหน่งสำหรับลายเซ็นให้อยู่ใต้ข้อความ
    new_x0 = (x0 + x1) / 2 - (fixed_width / 2)  # ตำแหน่งกลางในแนวนอน
    new_y0 = y1 + margin_bottom  # ใต้ข้อความ
    new_x1 = new_x0 + fixed_width
    new_y1 = new_y0 + fixed_height

    # สร้างพื้นที่ของภาพลายเซ็น
    rect = fitz.Rect(new_x0, new_y0, new_x1, new_y1)
    print(f"แทรกภาพที่ตำแหน่ง: {rect}")  # ตรวจสอบตำแหน่ง

    # แทรกรูปลายเซ็นโดยกำหนดขนาดตายตัว
    page.insert_image(rect, filename=signature_image, overlay=True)

# ฟังก์ชันดึงข้อความจาก PDF (รวมการใช้ OCR)
def extract_text(page, pdf_path, page_num):
    text = page.get_text("text")
    if not text.strip():  # หากไม่มีข้อความใน text layer ใช้ OCR
        print(f"หน้า {page_num + 1} ไม่มีข้อความใน text layer จะใช้ OCR แทน")
        images = convert_from_path(pdf_path, first_page=page_num + 1, last_page=page_num + 1)
        ocr_text = ""
        for image in images:
            ocr_text += image_to_string(image, lang="tha") + "\n"
        return ocr_text
    return text

# เปิดไฟล์ PDF
doc = fitz.open(r"C:\Users\ACER\Desktop\Auto-Signature\PDF\A-2.pdf")

# ระบุพาธของรูปลายเซ็น
signature_image = r"C:\Users\ACER\Desktop\Auto-Signature\signature\signature.png"

# กำหนดขนาดคงที่ของลายเซ็น (เช่น 200x100 px)
fixed_width = 200
fixed_height = 100

# กำหนดคำที่ต้องการค้นหาด้วยการตรวจจับข้อความใกล้เคียง
target_keywords = ["ขอแสดงความนับถือ", "ลงชื่อ", "ลายเซ็นต์", "(...)"]

# อ่านข้อมูลจากแต่ละหน้า
pdf_path = r"C:\Users\ACER\Desktop\Auto-Signature\PDF\A-2.pdf"
for page_num in range(len(doc)):
    page = doc.load_page(page_num)

    # ดึงข้อความจากหน้า (รวม OCR หากจำเป็น)
    text = extract_text(page, pdf_path, page_num)
    print(f"ข้อความในหน้า {page_num + 1}: {text}")

    found_signature_position = False  # ตัวแปรเพื่อระบุว่าพบตำแหน่งลายเซ็นแล้วหรือยัง

    # ค้นหาคำที่บ่งบอกตำแหน่งลายเซ็น
    for keyword in target_keywords:
        blocks = page.get_text("dict")["blocks"]
        for block in blocks:
            if block['type'] == 0:  # คือข้อความ
                for line in block["lines"]:
                    for span in line["spans"]:
                        # เปรียบเทียบข้อความกับคำที่ต้องการ (ตรวจจับคำผิดบางคำ)
                        ratio = fuzz.ratio(keyword, span["text"])
                        print(f"เปรียบเทียบ '{keyword}' กับ '{span['text']}' ได้คะแนน: {ratio}")

                        if ratio > 80 and not found_signature_position:
                            # ดึงพิกัดที่ข้อความอยู่และแทรกลายเซ็น
                            x0, y0, x1, y1 = span["bbox"]
                            add_signature(page, x0, y0, x1, y1, signature_image, fixed_width, fixed_height)
                            found_signature_position = True  # เปลี่ยนเป็น True เพื่อไม่ให้แทรกซ้ำ
                            print(f"แทรกลายเซ็นในตำแหน่ง: ({x0}, {y0}, {x1}, {y1})")
                            break
                    if found_signature_position:
                        break
                if found_signature_position:
                    break  # ถ้าพบตำแหน่งลายเซ็นแล้วไม่ต้องค้นหาต่อ

    if not found_signature_position:
        print(f"ไม่พบคำที่บ่งบอกตำแหน่งลายเซ็นในหน้า {page_num + 1}")

# บันทึกไฟล์ PDF ใหม่ที่มีการเพิ่มลายเซ็น
doc.save(r"C:\Users\ACER\Desktop\Auto-Signature\output\A2.pdf")

print("ลายเซ็นถูกแทรกและบันทึกในไฟล์ใหม่เรียบร้อยแล้ว!")
