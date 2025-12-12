# 🚀 Quick Start Guide
# คู่มือเริ่มต้นอย่างรวดเร็ว

## ⚡ One-Command Setup / ตั้งค่าด้วยคำสั่งเดียว

### Step 1: Install mkcert (One-time setup) / ติดตั้ง mkcert (ครั้งเดียว)

**macOS:**
```bash
brew install mkcert nss && mkcert -install
```

**Windows:**
1. Download from: https://github.com/FiloSottile/mkcert
2. Run: `mkcert -install`

**Linux:**
```bash
sudo apt install libnss3-tools && brew install mkcert && mkcert -install
```

### Step 2: Generate Certificates / สร้าง Certificates

```bash
# In project root directory
./setup_https.sh           # Backend certificate
./setup_frontend_https.sh  # Frontend certificate
```

### Step 3: Start Backend / เริ่ม Backend

**Terminal 1:**
```bash
./gradlew bootRun
```

Wait until you see: `Started RestaurantApplication`
รอจนกว่าจะเห็น: `Started RestaurantApplication`

Backend URL: **https://localhost:8090**

### Step 4: Start Frontend / เริ่ม Frontend

**Terminal 2:**
```bash
cd frontend
npm install  # First time only / ครั้งแรกเท่านั้น
npm start
```

Frontend URL: **https://localhost:3001**

---

## 🔐 Default Test Users / ผู้ใช้ทดสอบเริ่มต้น

Create test users by signing up or using the SQL script:
สร้างผู้ใช้ทดสอบโดยการสมัครสมาชิกหรือใช้สคริปต์ SQL:

### Create Admin User / สร้างผู้ดูแลระบบ
```bash
curl -k -X POST https://localhost:8090/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "name": "Admin User"
  }'

# Then manually update role to ROLE_ADMIN in H2 console
# จากนั้นอัปเดตบทบาทเป็น ROLE_ADMIN ใน H2 console
```

### Create Regular User / สร้างผู้ใช้ทั่วไป
```bash
curl -k -X POST https://localhost:8090/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user",
    "password": "user123",
    "name": "Regular User"
  }'
```

---

## 🎯 What to Test / สิ่งที่ควรทดสอบ

### 1. Login / เข้าสู่ระบบ
1. Go to `https://localhost:3001/login`
2. Enter username and password
3. Check that you're redirected to restaurant list
4. Open DevTools → Application → Cookies
5. Verify `token` cookie exists with:
   - HttpOnly: ✅
   - Secure: ✅
   - SameSite: Strict

### 2. View Restaurants / ดูร้านอาหาร
1. On the restaurant list page
2. You should see your username and role
3. Restaurants should be listed in a table

### 3. Test Logout / ทดสอบออกจากระบบ
1. Click "Logout" button
2. You should be redirected to login
3. Cookie should be cleared

### 4. Test Admin Features (Admin only) / ทดสอบคุณสมบัติผู้ดูแล (เฉพาะผู้ดูแล)
1. Login as admin
2. You should see "Create Restaurant" button
3. Click it to create a new restaurant
4. Fill the form and submit
5. You should see the new restaurant in the list

### 5. Test Cookie Persistence / ทดสอบความคงอยู่ของ Cookie
1. Login and view restaurants
2. Refresh the page (F5)
3. You should stay logged in (no redirect to login)

---

## 📊 Architecture Overview / ภาพรวมสถาปัตยกรรม

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│                  https://localhost:3001                      │
│                                                               │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │   Login    │  │ Restaurants  │  │ Create Restaurant │    │
│  │    Page    │→ │     Page     │→ │      Page        │    │
│  └────────────┘  └──────────────┘  └──────────────────┘    │
│                                                               │
│  Cookie: token=eyJhbGc... (HttpOnly, Secure, SameSite)     │
└────────────────────────┬──────────────────────────────────┬─┘
                         │                                   │
                         │ HTTPS + Cookie                   │
                         ↓                                   ↓
┌─────────────────────────────────────────────────────────────┐
│              Spring Boot Backend                             │
│            https://localhost:8090                            │
│                                                              │
│  ┌──────────────────┐    ┌──────────────────────────┐      │
│  │ CorsFilter       │ →  │ JwtCookieAuthFilter      │      │
│  │ Allow credentials│    │ Extract & validate token │      │
│  └──────────────────┘    └────────────┬─────────────┘      │
│                                        ↓                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          SecurityFilterChain                        │   │
│  │  /api/auth/login   → Public                         │   │
│  │  /api/auth/me      → Authenticated                  │   │
│  │  /api/restaurants  → User or Admin                  │   │
│  │  POST /restaurants → Admin only                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────┐    ┌──────────────────────────┐      │
│  │   JwtUtil        │    │   Token Store            │      │
│  │ - Generate token │ ←→ │ ConcurrentHashMap        │      │
│  │ - Validate token │    │ Track active tokens      │      │
│  │ - Invalidate     │    │ Support logout           │      │
│  └──────────────────┘    └──────────────────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔒 Security Features / คุณสมบัติความปลอดภัย

| Feature | Status | Benefit |
|---------|--------|---------|
| HttpOnly Cookie | ✅ | JavaScript ไม่สามารถเข้าถึง token |
| Secure Flag | ✅ | ส่งผ่าน HTTPS เท่านั้น |
| SameSite=Strict | ✅ | ป้องกัน CSRF attacks |
| Token Invalidation | ✅ | Logout ทำงานได้จริง |
| HTTPS | ✅ | การเข้ารหัสการสื่อสาร |
| CORS | ✅ | ควบคุมการเข้าถึงข้ามต้นทาง |
| Role-based Access | ✅ | Admin/User มีสิทธิ์ต่างกัน |
| Argon2 Password | ✅ | เข้ารหัสรหัสผ่านที่แข็งแกร่ง |

---

## 🐛 Common Issues / ปัญหาที่พบบ่อย

### Certificate Error / ข้อผิดพลาดจาก Certificate
**Symptom:** "Your connection is not private"

**Solution:**
```bash
mkcert -install
./setup_https.sh
./setup_frontend_https.sh
```
Restart browser / รีสตาร์ทเบราว์เซอร์

### CORS Error / ข้อผิดพลาดจาก CORS
**Symptom:** "blocked by CORS policy"

**Solution:**
1. Ensure backend is running on `https://localhost:8090`
2. Ensure frontend is running on `https://localhost:3001`
3. Check `CorsConfig.java` settings

### Cookie Not Set / ไม่มี Cookie
**Symptom:** Redirect to login after every request

**Solution:**
1. Verify both use HTTPS (not HTTP)
2. Clear browser cookies
3. Check `withCredentials: true` in `axios.js`

### Port Already in Use / พอร์ตถูกใช้งานอยู่
**Backend (8090):**
```bash
lsof -ti:8090 | xargs kill -9
```

**Frontend (3001):**
```bash
lsof -ti:3001 | xargs kill -9
```

---

## 📁 Important Files / ไฟล์สำคัญ

### Backend
- `AuthenticationController.java` - Login/Logout/Me endpoints
- `JwtCookieAuthFilter.java` - Cookie authentication
- `CorsConfig.java` - CORS settings
- `SecurityConfig.java` - Security configuration
- `UserInfoResponse.java` - User DTO with role

### Frontend
- `src/api/axios.js` - API client config
- `src/pages/Login.jsx` - Login page
- `src/pages/Restaurant.jsx` - Restaurant list
- `src/pages/CreateRestaurant.jsx` - Create form

### Setup
- `setup_https.sh` - Backend certificate
- `setup_frontend_https.sh` - Frontend certificate

---

## 📚 Documentation / เอกสาร

- **README.md** - Complete project documentation
- **HTTPS_SETUP.md** - Detailed HTTPS guide
- **frontend/README.md** - Frontend documentation
- **LAB8_COMPLETION_SUMMARY.md** - What was implemented

---

## ✅ Checklist / รายการตรวจสอบ

Before starting:
- [ ] mkcert installed
- [ ] Java 17+ installed
- [ ] Node.js 16+ installed
- [ ] Gradle wrapper executable

Setup:
- [ ] Run `mkcert -install`
- [ ] Run `./setup_https.sh`
- [ ] Run `./setup_frontend_https.sh`

Running:
- [ ] Backend started on https://localhost:8090
- [ ] Frontend started on https://localhost:3001
- [ ] Can access login page
- [ ] Can create user account
- [ ] Can login and see cookies
- [ ] Can view restaurants
- [ ] Can logout

---

**Happy Testing! 🎉**
**สนุกกับการทดสอบ! 🎉**

