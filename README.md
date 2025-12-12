# Restaurant Management System / ระบบจัดการร้านอาหาร

A full-stack secure restaurant management application with cookie-based JWT authentication, built with Spring Boot and React.

แอปพลิเคชันจัดการร้านอาหารแบบ full-stack ที่ปลอดภัยพร้อมการตรวจสอบสิทธิ์ JWT แบบคุกกี้ สร้างด้วย Spring Boot และ React

## 🌟 Features / คุณสมบัติ

### Backend (Spring Boot)
- ✅ **Cookie-based JWT Authentication** - Secure HttpOnly cookies / การตรวจสอบสิทธิ์ JWT แบบคุกกี้ที่ปลอดภัย
- ✅ **Role-based Access Control** - User and Admin roles / การควบคุมการเข้าถึงตามบทบาท
- ✅ **HTTPS Support** - Self-signed certificates for development / รองรับ HTTPS ด้วย self-signed certificates
- ✅ **Token Invalidation** - Secure logout with token revocation / ออกจากระบบอย่างปลอดภัยด้วยการเพิกถอน token
- ✅ **CORS Configuration** - Controlled cross-origin resource sharing / การตั้งค่า CORS ที่ควบคุมได้
- ✅ **Argon2 Password Hashing** - Secure password storage / การเข้ารหัสรหัสผ่านที่ปลอดภัย
- ✅ **Audit Logging** - Authentication event logging / การบันทึกเหตุการณ์การตรวจสอบสิทธิ์

### Frontend (React)
- ✅ **Modern React UI** - Clean and responsive interface / UI React ที่ทันสมัย
- ✅ **Secure Cookie Handling** - Automatic credential management / การจัดการคุกกี้ที่ปลอดภัยอัตโนมัติ
- ✅ **Role-based UI** - Different views for users and admins / UI ที่แตกต่างสำหรับผู้ใช้และผู้ดูแลระบบ
- ✅ **Restaurant Management** - View and create restaurants / ดูและสร้างร้านอาหาร
- ✅ **Bilingual Support** - English and Thai / รองรับสองภาษา: อังกฤษและไทย

## 🔒 Security Features Implemented / คุณสมบัติความปลอดภัยที่นำมาใช้

Based on OWASP ASVS V3.3 Cookie Setup requirements:
อิงตามข้อกำหนด OWASP ASVS V3.3 Cookie Setup:

| Requirement | Status | Description |
|-------------|--------|-------------|
| **3.3.1** | ✅ | Cookies have `Secure` attribute set / คุกกี้มี attribute `Secure` |
| **3.3.2** | ✅ | `SameSite` attribute set to `Strict` / attribute `SameSite` ตั้งค่าเป็น `Strict` |
| **3.3.4** | ✅ | `HttpOnly` attribute set for session tokens / attribute `HttpOnly` สำหรับ session tokens |

Additional Security Features:
คุณสมบัติความปลอดภัยเพิ่มเติม:
- ✅ Token store with invalidation capability / การเก็บ token พร้อมความสามารถในการเพิกถอน
- ✅ HTTPS-only communication / การสื่อสารผ่าน HTTPS เท่านั้น
- ✅ CORS with credential support / CORS พร้อมการรองรับ credential
- ✅ Secure HTTP headers / HTTP headers ที่ปลอดภัย

## 📋 Prerequisites / ข้อกำหนดเบื้องต้น

- **Java 17+** - for Spring Boot backend / สำหรับ Spring Boot backend
- **Gradle** - build tool (included via wrapper) / เครื่องมือ build (รวมอยู่ใน wrapper)
- **Node.js 16+** and **npm** - for React frontend / สำหรับ React frontend
- **mkcert** - for generating self-signed SSL certificates / สำหรับสร้าง SSL certificates แบบ self-signed

## 🚀 Quick Start / เริ่มต้นอย่างรวดเร็ว

### 1. Install mkcert / ติดตั้ง mkcert

**macOS:**
```bash
brew install mkcert nss
```

**Windows:**
Download from: https://github.com/FiloSottile/mkcert

**Linux:**
```bash
sudo apt install libnss3-tools
brew install mkcert
```

### 2. Install Local Certificate Authority / ติดตั้ง Local Certificate Authority

Run this once:
รันครั้งเดียว:
```bash
mkcert -install
```

### 3. Setup Backend HTTPS / ตั้งค่า Backend HTTPS

```bash
# Generate backend certificate / สร้าง backend certificate
./setup_https.sh
```

This creates `keystore.p12` in `src/main/resources/`
คำสั่งนี้จะสร้าง `keystore.p12` ใน `src/main/resources/`

### 4. Setup Frontend HTTPS / ตั้งค่า Frontend HTTPS

```bash
# Generate frontend certificates / สร้าง frontend certificates
./setup_frontend_https.sh
```

This creates `localhost.pem` and `localhost-key.pem` in the project root.
คำสั่งนี้จะสร้าง `localhost.pem` และ `localhost-key.pem` ในไดเรกทอรีรากของโปรเจกต์

### 5. Start the Backend / เริ่มต้น Backend

```bash
./gradlew bootRun
```

Backend will run on: `https://localhost:8090`
Backend จะทำงานที่: `https://localhost:8090`

### 6. Start the Frontend / เริ่มต้น Frontend

In a new terminal:
ในเทอร์มินัลใหม่:
```bash
cd frontend
npm install
npm start
```

Frontend will run on: `https://localhost:3001`
Frontend จะทำงานที่: `https://localhost:3001`

## 📁 Project Structure / โครงสร้างโปรเจกต์

```
Restaurant/
├── src/
│   └── main/
│       ├── java/ku/cs/restaurant/
│       │   ├── controller/          # REST endpoints
│       │   │   ├── AuthenticationController.java  # Login, Logout, /me
│       │   │   ├── RestaurantController.java      # Restaurant CRUD
│       │   │   └── MenuController.java
│       │   ├── security/            # Security configuration
│       │   │   ├── JwtUtil.java                   # JWT generation & validation
│       │   │   ├── JwtCookieAuthFilter.java       # Cookie authentication filter
│       │   │   ├── SecurityConfig.java            # Security setup
│       │   │   └── CorsConfig.java                # CORS configuration
│       │   ├── dto/                 # Data Transfer Objects
│       │   │   ├── LoginRequest.java
│       │   │   ├── SignupRequest.java
│       │   │   └── UserInfoResponse.java          # User info with role
│       │   ├── entity/              # Database entities
│       │   │   ├── User.java
│       │   │   ├── Restaurant.java
│       │   │   └── Menu.java
│       │   ├── service/             # Business logic
│       │   └── repository/          # Database access
│       └── resources/
│           ├── application.properties  # App configuration
│           └── keystore.p12           # Backend SSL certificate
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js            # API client configuration
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Restaurant.jsx      # Restaurant list
│   │   │   └── CreateRestaurant.jsx # Create restaurant form
│   │   ├── App.js                  # Main app & routing
│   │   └── index.js                # Entry point
│   ├── package.json
│   └── README.md
├── setup_https.sh                  # Backend HTTPS setup script
├── setup_frontend_https.sh         # Frontend HTTPS setup script
├── HTTPS_SETUP.md                  # Detailed HTTPS guide
└── README.md                       # This file
```

## 🔧 Configuration / การตั้งค่า

### Backend Configuration / การตั้งค่า Backend

`src/main/resources/application.properties`:

```properties
# Server
server.port=8090

# HTTPS
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=changeit
server.ssl.key-store-type=PKCS12

# JWT
jwt.secret=your-secret-key
jwt.expiration=3600000  # 1 hour in milliseconds

# Database (H2 in-memory for development)
spring.datasource.url=jdbc:h2:mem:restaurantdb
```

### Frontend Configuration / การตั้งค่า Frontend

`frontend/src/api/axios.js`:

```javascript
{
  baseURL: 'https://localhost:8090',
  withCredentials: true  // Send cookies automatically
}
```

### CORS Configuration / การตั้งค่า CORS

`CorsConfig.java`:
- Allowed origin: `https://localhost:3001`
- Allowed methods: GET, POST, PUT, DELETE
- Credentials: enabled
- Exposed headers: Set-Cookie

## 🔐 Authentication Flow / ขั้นตอนการตรวจสอบสิทธิ์

1. **Login / เข้าสู่ระบบ**
   - User submits credentials to `/api/auth/login`
   - Backend validates and generates JWT token
   - Token stored in HttpOnly cookie (1 hour expiration)
   - Cookie sent with `Secure`, `HttpOnly`, `SameSite=Strict` flags

2. **Authenticated Requests / การส่ง Request ที่ตรวจสอบสิทธิ์แล้ว**
   - Browser automatically sends cookie with each request
   - `JwtCookieAuthFilter` extracts and validates token
   - User authenticated and authorized based on role

3. **Get User Info / ดึงข้อมูลผู้ใช้**
   - Call `/api/auth/me` endpoint
   - Returns username and role from cookie

4. **Logout / ออกจากระบบ**
   - Call `/api/auth/logout` endpoint
   - Token invalidated in backend token store
   - Cookie cleared with `maxAge=0`

## 🎯 API Endpoints / ปลายทาง API

### Authentication / การตรวจสอบสิทธิ์

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register new user / ลงทะเบียนผู้ใช้ใหม่ | Public |
| POST | `/api/auth/login` | Login / เข้าสู่ระบบ | Public |
| POST | `/api/auth/logout` | Logout / ออกจากระบบ | Authenticated |
| GET | `/api/auth/me` | Get user info / ดึงข้อมูลผู้ใช้ | Authenticated |

### Restaurants / ร้านอาหาร

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/restaurants` | List all restaurants / รายการร้านอาหารทั้งหมด | User, Admin |
| POST | `/api/restaurants` | Create restaurant / สร้างร้านอาหาร | Admin |
| PUT | `/api/restaurants` | Update restaurant / อัปเดตร้านอาหาร | Admin |
| DELETE | `/api/restaurants` | Delete restaurant / ลบร้านอาหาร | Admin |

## 🧪 Testing / การทดสอบ

### 1. Create Test Users / สร้างผู้ใช้ทดสอบ

Use the SQL script or signup endpoint:
ใช้สคริปต์ SQL หรือ endpoint signup:

```bash
# Run SQL script
cat create_user.sql | h2-console

# Or use signup endpoint
curl -k -X POST https://localhost:8090/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123","name":"Test User"}'
```

### 2. Test Login / ทดสอบการเข้าสู่ระบบ

```bash
curl -k -X POST https://localhost:8090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}' \
  -c cookies.txt -v
```

Check response headers for `Set-Cookie`.
ตรวจสอบ response headers สำหรับ `Set-Cookie`

### 3. Test Authenticated Request / ทดสอบ Request ที่ตรวจสอบสิทธิ์แล้ว

```bash
curl -k https://localhost:8090/api/restaurants \
  -b cookies.txt
```

### 4. Test User Info Endpoint / ทดสอบ Endpoint ข้อมูลผู้ใช้

```bash
curl -k https://localhost:8090/api/auth/me \
  -b cookies.txt
```

Expected response:
ผลลัพธ์ที่คาดหวัง:
```json
{
  "username": "testuser",
  "role": "ROLE_USER"
}
```

### 5. Test Logout / ทดสอบการออกจากระบบ

```bash
curl -k -X POST https://localhost:8090/api/auth/logout \
  -b cookies.txt -c cookies.txt -v
```

Check that cookie is cleared (maxAge=0).
ตรวจสอบว่า cookie ถูกล้าง (maxAge=0)

## 📚 Lab Exercises Completed / แบบฝึกหัดที่เสร็จสิ้น

- ✅ **I. Change Backend Authentication to Cookie-based** / เปลี่ยนการตรวจสอบสิทธิ์แบ็กเอนด์เป็นแบบคุกกี้
  - HttpOnly cookie implementation
  - JwtCookieAuthFilter
  - CORS configuration
  - HTTPS setup

- ✅ **II. Get User Data** / ดึงข้อมูลผู้ใช้
  - `/me` endpoint implementation
  - UserInfoResponse DTO with role support

- ✅ **III. Add Logout** / เพิ่มการออกจากระบบ
  - Token invalidation
  - Cookie clearing
  - Token store implementation

- ✅ **IV. Homework** / การบ้าน
  - Role added to UserInfoResponse
  - CreateRestaurant page with form
  - Role-based UI in frontend

## 🔍 Security Testing Checklist / รายการตรวจสอบการทดสอบความปลอดภัย

- ✅ Cookie has `HttpOnly` flag / คุกกี้มี flag `HttpOnly`
- ✅ Cookie has `Secure` flag / คุกกี้มี flag `Secure`
- ✅ Cookie has `SameSite=Strict` / คุกกี้มี `SameSite=Strict`
- ✅ Token cannot be accessed by JavaScript / JavaScript ไม่สามารถเข้าถึง token ได้
- ✅ Cookie automatically sent with requests / ส่งคุกกี้โดยอัตโนมัติพร้อม requests
- ✅ Token invalidated on logout / token หมดอายุเมื่อออกจากระบบ
- ✅ CORS properly configured / CORS ตั้งค่าอย่างเหมาะสม
- ✅ HTTPS enforced / บังคับใช้ HTTPS
- ✅ Role-based access control working / การควบคุมการเข้าถึงตามบทบาททำงาน

## 📖 Additional Documentation / เอกสารเพิ่มเติม

- [HTTPS Setup Guide](HTTPS_SETUP.md) - Detailed HTTPS configuration / คู่มือการตั้งค่า HTTPS โดยละเอียด
- [Frontend README](frontend/README.md) - Frontend-specific documentation / เอกสารเฉพาะ frontend

## 🐛 Troubleshooting / การแก้ปัญหา

### Certificate Errors / ข้อผิดพลาดจาก Certificate

**Problem:** Browser shows "Your connection is not private"
**Solution:** 
1. Run `mkcert -install`
2. Regenerate certificates using setup scripts
3. Restart browser

**ปัญหา:** เบราว์เซอร์แสดง "การเชื่อมต่อของคุณไม่เป็นส่วนตัว"
**วิธีแก้:**
1. รัน `mkcert -install`
2. สร้าง certificates ใหม่โดยใช้สคริปต์ตั้งค่า
3. รีสตาร์ทเบราว์เซอร์

### CORS Errors / ข้อผิดพลาดจาก CORS

**Problem:** "Access to XMLHttpRequest has been blocked by CORS policy"
**Solution:**
1. Verify backend is running on `https://localhost:8090`
2. Check `CorsConfig.java` allows `https://localhost:3001`
3. Ensure `withCredentials: true` in axios config

**ปัญหา:** "การเข้าถึง XMLHttpRequest ถูกบล็อกโดยนโยบาย CORS"
**วิธีแก้:**
1. ตรวจสอบว่า backend ทำงานที่ `https://localhost:8090`
2. ตรวจสอบว่า `CorsConfig.java` อนุญาต `https://localhost:3001`
3. ตรวจสอบว่ามี `withCredentials: true` ใน axios config

### Cookie Not Being Set / Cookie ไม่ถูกตั้งค่า

**Problem:** Authentication works but cookie is not stored
**Solution:**
1. Both frontend and backend must use HTTPS
2. Check browser developer tools > Application > Cookies
3. Verify `withCredentials: true` in axios
4. Clear browser cache and cookies

**ปัญหา:** การตรวจสอบสิทธิ์ทำงาน แต่ cookie ไม่ถูกเก็บ
**วิธีแก้:**
1. ทั้ง frontend และ backend ต้องใช้ HTTPS
2. ตรวจสอบ browser developer tools > Application > Cookies
3. ตรวจสอบว่ามี `withCredentials: true` ใน axios
4. ล้าง browser cache และ cookies

## 👥 User Roles / บทบาทผู้ใช้

- **ROLE_USER** - Can view restaurants / สามารถดูร้านอาหาร
- **ROLE_ADMIN** - Can view and create restaurants / สามารถดูและสร้างร้านอาหาร

## 📝 Notes / หมายเหตุ

- This application is for **development and learning purposes** / แอปพลิเคชันนี้สำหรับการพัฒนาและการเรียนรู้
- Self-signed certificates should **not be used in production** / self-signed certificates ไม่ควรใช้ในการใช้งานจริง
- H2 in-memory database resets on restart / ฐานข้อมูล H2 ใน memory จะรีเซ็ตเมื่อรีสตาร์ท
- Cookie expiration is set to 1 hour / cookie จะหมดอายุใน 1 ชั่วโมง
- Token store is in-memory (use Redis in production) / token store อยู่ใน memory (ใช้ Redis ในการใช้งานจริง)

## 🤝 Contributing / การมีส่วนร่วม

This is an educational project based on KU CS coursework.
โปรเจกต์นี้เป็นโปรเจกต์การศึกษาอิงตามงานหลักสูตร KU CS

## 📄 License / ใบอนุญาต

Educational use only.
สำหรับการศึกษาเท่านั้น
