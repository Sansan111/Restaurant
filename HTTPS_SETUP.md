# HTTPS Setup Guide / คู่มือการตั้งค่า HTTPS

## English Instructions

### 1. Install mkcert

**macOS:**
```bash
brew install mkcert nss
```

**Windows:**
Download from: https://github.com/FiloSottile/mkcert

**Linux (Ubuntu/Debian):**
```bash
sudo apt install libnss3-tools
brew install mkcert
```

### 2. Create a local Certificate Authority (CA)

Run this command only once:
```bash
mkcert -install
```

This creates a local CA that your system will trust.

### 3. Generate Certificate for Spring Boot

Navigate to your project directory and run:
```bash
mkcert -pkcs12 localhost
```

This creates a file called `localhost.p12`

### 4. Rename and Move the Certificate

```bash
mv localhost.p12 keystore.p12
mv keystore.p12 src/main/resources/
```

### 5. Start the Application

The application is now configured to run on HTTPS at:
```
https://localhost:8090
```

### 6. Testing the Cookie-Based Authentication

1. **Login**: POST to `https://localhost:8090/api/auth/login`
   - The JWT token will be set in an HttpOnly cookie
   - Check the response headers for `Set-Cookie`

2. **Access Protected Resources**: GET `https://localhost:8090/api/restaurants`
   - The cookie will be automatically sent with the request
   - No need to manually add Authorization header

3. **Get User Info**: GET `https://localhost:8090/api/auth/me`
   - Returns username and role from the cookie

4. **Logout**: POST `https://localhost:8090/api/auth/logout`
   - Invalidates the token and clears the cookie

---

## คำแนะนำภาษาไทย

### 1. ติดตั้ง mkcert

**macOS:**
```bash
brew install mkcert nss
```

**Windows:**
ดาวน์โหลดจาก: https://github.com/FiloSottile/mkcert

**Linux (Ubuntu/Debian):**
```bash
sudo apt install libnss3-tools
brew install mkcert
```

### 2. สร้าง Certificate Authority (CA) ในเครื่อง

รันคำสั่งนี้เพียงครั้งเดียว:
```bash
mkcert -install
```

คำสั่งนี้จะสร้าง CA ในเครื่องที่ระบบของคุณจะไว้วางใจ

### 3. สร้าง Certificate สำหรับ Spring Boot

ไปที่ไดเรกทอรีโปรเจกต์และรันคำสั่ง:
```bash
mkcert -pkcs12 localhost
```

คำสั่งนี้จะสร้างไฟล์ชื่อ `localhost.p12`

### 4. เปลี่ยนชื่อและย้าย Certificate

```bash
mv localhost.p12 keystore.p12
mv keystore.p12 src/main/resources/
```

### 5. เริ่มต้นแอปพลิเคชัน

แอปพลิเคชันจะรันบน HTTPS ที่:
```
https://localhost:8090
```

### 6. ทดสอบการตรวจสอบสิทธิ์แบบ Cookie

1. **เข้าสู่ระบบ**: POST ไปที่ `https://localhost:8090/api/auth/login`
   - JWT token จะถูกตั้งค่าใน HttpOnly cookie
   - ตรวจสอบ response headers สำหรับ `Set-Cookie`

2. **เข้าถึงทรัพยากรที่ป้องกัน**: GET `https://localhost:8090/api/restaurants`
   - Cookie จะถูกส่งไปพร้อมกับ request โดยอัตโนมัติ
   - ไม่ต้องเพิ่ม Authorization header ด้วยตัวเอง

3. **ดึงข้อมูลผู้ใช้**: GET `https://localhost:8090/api/auth/me`
   - ส่งคืน username และ role จาก cookie

4. **ออกจากระบบ**: POST `https://localhost:8090/api/auth/logout`
   - ทำให้ token หมดอายุและล้าง cookie

## Security Features Implemented / คุณสมบัติความปลอดภัยที่นำมาใช้

✅ **HttpOnly Cookie** - JavaScript cannot access the cookie / JavaScript ไม่สามารถเข้าถึง cookie ได้

✅ **Secure Flag** - Cookie only sent over HTTPS / ส่ง cookie ผ่าน HTTPS เท่านั้น

✅ **SameSite=Strict** - Protection against CSRF / ป้องกัน CSRF

✅ **Token Invalidation** - Tokens are tracked and can be invalidated / ติดตาม token และสามารถทำให้หมดอายุได้

✅ **CORS Configuration** - Controlled cross-origin access / ควบคุมการเข้าถึงข้ามต้นทาง

✅ **Role-based Access** - User roles returned in /me endpoint / ส่งคืนบทบาทผู้ใช้ใน endpoint /me

## Testing with Postman / ทดสอบด้วย Postman

1. Make sure to **disable SSL certificate verification** in Postman settings (for development only)
   - การตั้งค่า Postman: ปิด SSL certificate verification (เฉพาะการพัฒนา)

2. Enable **cookie management** in Postman to automatically handle cookies
   - เปิดใช้งานการจัดการ cookie ใน Postman เพื่อจัดการ cookie โดยอัตโนมัติ

3. The cookie will be automatically attached to subsequent requests
   - Cookie จะถูกแนบกับ request ถัดไปโดยอัตโนมัติ

