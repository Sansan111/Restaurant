# Restaurant Frontend Application
# แอปพลิเคชันฟรอนต์เอนด์ร้านอาหาร

A React-based frontend for the Restaurant Management System with secure cookie-based authentication.

แอปพลิเคชัน React สำหรับระบบจัดการร้านอาหารพร้อมการตรวจสอบสิทธิ์แบบคุกกี้ที่ปลอดภัย

## Features / คุณสมบัติ

- ✅ Secure cookie-based authentication / การตรวจสอบสิทธิ์แบบคุกกี้ที่ปลอดภัย
- ✅ Role-based access control (User/Admin) / การควบคุมการเข้าถึงตามบทบาท (ผู้ใช้/ผู้ดูแลระบบ)
- ✅ HTTPS support for development / รองรับ HTTPS สำหรับการพัฒนา
- ✅ Restaurant listing / รายการร้านอาหาร
- ✅ Restaurant creation (Admin only) / สร้างร้านอาหาร (เฉพาะผู้ดูแลระบบ)
- ✅ User profile display / แสดงโปรไฟล์ผู้ใช้
- ✅ Automatic logout on authentication failure / ออกจากระบบอัตโนมัติเมื่อการตรวจสอบสิทธิ์ล้มเหลว

## Prerequisites / ข้อกำหนดเบื้องต้น

- Node.js 16+ and npm / Node.js 16+ และ npm
- mkcert (for HTTPS certificates) / mkcert (สำหรับ certificate HTTPS)
- Backend server running on `https://localhost:8090` / เซิร์ฟเวอร์แบ็กเอนด์ทำงานที่ `https://localhost:8090`

## Setup Instructions / คำแนะนำการตั้งค่า

### 1. Generate HTTPS Certificates / สร้าง HTTPS Certificates

From the project root directory, run:
จากไดเรกทอรีรากของโปรเจกต์ รันคำสั่ง:

```bash
./setup_frontend_https.sh
```

This will create:
คำสั่งนี้จะสร้าง:
- `localhost.pem` (certificate / ใบรับรอง)
- `localhost-key.pem` (private key / คีย์ส่วนตัว)

### 2. Install Dependencies / ติดตั้ง Dependencies

```bash
cd frontend
npm install
```

### 3. Start the Development Server / เริ่มต้น Development Server

```bash
npm start
```

The application will open at: `https://localhost:3001`

แอปพลิเคชันจะเปิดที่: `https://localhost:3001`

## Project Structure / โครงสร้างโปรเจกต์

```
frontend/
├── public/
│   └── index.html          # HTML template / เทมเพลต HTML
├── src/
│   ├── api/
│   │   └── axios.js        # API configuration / การตั้งค่า API
│   ├── pages/
│   │   ├── Login.jsx       # Login page / หน้าเข้าสู่ระบบ
│   │   ├── Restaurant.jsx  # Restaurant list / รายการร้านอาหาร
│   │   └── CreateRestaurant.jsx  # Create restaurant form / ฟอร์มสร้างร้านอาหาร
│   ├── App.js              # Main app component / คอมโพเนนต์หลัก
│   └── index.js            # Entry point / จุดเริ่มต้น
└── package.json            # Dependencies / Dependencies
```

## Pages / หน้าเว็บ

### Login Page / หน้าเข้าสู่ระบบ
**Path:** `/login`

Login form with username and password. Credentials are sent to the backend, and a secure HttpOnly cookie is set.

ฟอร์มเข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่าน ข้อมูลจะถูกส่งไปยังแบ็กเอนด์และตั้งค่า HttpOnly cookie ที่ปลอดภัย

### Restaurant List / รายการร้านอาหาร
**Path:** `/restaurants`

Displays all restaurants. Shows username and role. Admin users can see a "Create Restaurant" button.

แสดงร้านอาหารทั้งหมด แสดงชื่อผู้ใช้และบทบาท ผู้ดูแลระบบจะเห็นปุ่ม "สร้างร้านอาหาร"

### Create Restaurant / สร้างร้านอาหาร
**Path:** `/restaurants/create`

Form for creating a new restaurant (Admin only). Includes name, location, and rating fields.

ฟอร์มสำหรับสร้างร้านอาหารใหม่ (เฉพาะผู้ดูแลระบบ) ประกอบด้วยชื่อ สถานที่ และคะแนน

## API Integration / การเชื่อมต่อ API

The frontend communicates with the backend using axios with the following configuration:

ฟรอนต์เอนด์สื่อสารกับแบ็กเอนด์โดยใช้ axios ด้วยการตั้งค่าดังนี้:

```javascript
{
  baseURL: 'https://localhost:8090',
  withCredentials: true, // Automatically send cookies
}
```

### API Endpoints Used / API Endpoints ที่ใช้

- `POST /api/auth/login` - Login / เข้าสู่ระบบ
- `POST /api/auth/logout` - Logout / ออกจากระบบ
- `GET /api/auth/me` - Get current user info / ดึงข้อมูลผู้ใช้ปัจจุบัน
- `GET /api/restaurants` - Get all restaurants / ดึงร้านอาหารทั้งหมด
- `POST /api/restaurants` - Create restaurant (Admin) / สร้างร้านอาหาร (ผู้ดูแลระบบ)

## Security Features / คุณสมบัติความปลอดภัย

1. **HttpOnly Cookies** - JWT tokens stored in HttpOnly cookies, inaccessible to JavaScript
   - JWT tokens เก็บใน HttpOnly cookies ซึ่ง JavaScript เข้าถึงไม่ได้

2. **HTTPS Only** - All communication over HTTPS
   - การสื่อสารทั้งหมดผ่าน HTTPS

3. **Secure Cookie Attributes** - Cookies have `Secure` and `SameSite` flags
   - Cookies มี flag `Secure` และ `SameSite`

4. **Automatic Credential Handling** - Cookies automatically sent with requests
   - ส่ง cookies โดยอัตโนมัติพร้อมกับ request

5. **Role-based UI** - Different features shown based on user role
   - แสดงคุณสมบัติต่างๆ ตามบทบาทผู้ใช้

## Testing / การทดสอบ

### Test User Login / ทดสอบการเข้าสู่ระบบผู้ใช้

1. Make sure the backend is running / ตรวจสอบว่าแบ็กเอนด์ทำงานอยู่
2. Navigate to `https://localhost:3001/login` / ไปที่ `https://localhost:3001/login`
3. Enter credentials / ใส่ข้อมูลเข้าสู่ระบบ
4. You should be redirected to the restaurant list / คุณจะถูกนำไปที่รายการร้านอาหาร

### Test Cookie Persistence / ทดสอบความคงอยู่ของ Cookie

1. Login and navigate to restaurants / เข้าสู่ระบบและไปที่ร้านอาหาร
2. Refresh the page / รีเฟรชหน้า
3. You should remain logged in / คุณควรยังคงเข้าสู่ระบบอยู่

### Test Logout / ทดสอบการออกจากระบบ

1. Click the "Logout" button / คลิกปุ่ม "Logout"
2. You should be redirected to login / คุณจะถูกนำไปหน้าเข้าสู่ระบบ
3. Cookie should be cleared / Cookie ควรถูกล้าง

### Test Admin Features / ทดสอบคุณสมบัติผู้ดูแลระบบ

1. Login as an admin user / เข้าสู่ระบบในฐานะผู้ดูแลระบบ
2. You should see "Create Restaurant" button / คุณจะเห็นปุ่ม "Create Restaurant"
3. Click it to access the creation form / คลิกเพื่อเข้าถึงฟอร์มสร้าง

## Troubleshooting / การแก้ปัญหา

### Certificate Errors / ข้อผิดพลาดจาก Certificate

If you see certificate warnings:
หากคุณเห็นคำเตือนเกี่ยวกับ certificate:

1. Make sure you ran `mkcert -install` / ตรวจสอบว่าคุณรันคำสั่ง `mkcert -install` แล้ว
2. Regenerate certificates using the setup script / สร้าง certificates ใหม่โดยใช้สคริปต์ตั้งค่า
3. Restart your browser / รีสตาร์ทเบราว์เซอร์

### CORS Errors / ข้อผิดพลาดจาก CORS

If you see CORS errors:
หากคุณเห็นข้อผิดพลาดจาก CORS:

1. Make sure the backend is running on `https://localhost:8090` / ตรวจสอบว่าแบ็กเอนด์ทำงานที่ `https://localhost:8090`
2. Check that the backend CORS configuration allows `https://localhost:3001` / ตรวจสอบว่าการตั้งค่า CORS ของแบ็กเอนด์อนุญาต `https://localhost:3001`

### Cookie Not Being Set / Cookie ไม่ถูกตั้งค่า

1. Verify that both frontend and backend use HTTPS / ตรวจสอบว่าทั้งฟรอนต์เอนด์และแบ็กเอนด์ใช้ HTTPS
2. Check that `withCredentials: true` is set in axios config / ตรวจสอบว่าตั้งค่า `withCredentials: true` ใน axios config
3. Clear browser cookies and try again / ล้าง cookies ของเบราว์เซอร์และลองอีกครั้ง

## Notes / หมายเหตุ

- This frontend is for development purposes only / ฟรอนต์เอนด์นี้สำหรับการพัฒนาเท่านั้น
- In production, use proper SSL certificates / ในการใช้งานจริง ใช้ SSL certificates ที่เหมาะสม
- Cookie expiration is set to 1 hour / Cookie จะหมดอายุใน 1 ชั่วโมง

