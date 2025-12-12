# 🚀 Google OAuth Quick Setup
# การตั้งค่า Google OAuth อย่างรวดเร็ว

## ⚡ 3-Minute Setup / ตั้งค่าใน 3 นาที

### **Step 1: Configure Your Google Client ID**

You already have your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from Google Console. Now you need to:

#### **Backend (.env.properties in project root):**

```bash
# If .env.properties doesn't exist, create it
touch .env.properties

# Add your Google Client ID
echo "GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com" >> .env.properties
```

**Or edit manually:**
```properties
GOOGLE_CLIENT_ID=1234567890-abcdefghijk.apps.googleusercontent.com
```

#### **Frontend (frontend/.env):**

```bash
cd frontend

# Create .env file
echo "REACT_APP_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com" > .env
```

**Or edit `frontend/src/components/GoogleLoginButton.jsx` line 7:**
```javascript
const GOOGLE_CLIENT_ID = "1234567890-abcdefghijk.apps.googleusercontent.com";
```

---

### **Step 2: Install Frontend Dependencies**

```bash
cd frontend
npm install
cd ..
```

This installs the `google-one-tap` package.

---

### **Step 3: Build Backend (Optional but Recommended)**

```bash
./gradlew build -x test
```

This downloads Google API client library.

---

### **Step 4: Start Both Servers**

**Terminal 1 - Backend:**
```bash
./gradlew bootRun
```
Wait for: `Started RestaurantApplication`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Wait for: `Compiled successfully!`

---

### **Step 5: Test It!**

1. Open **Firefox** (recommended)
2. Go to: `https://localhost:3001/login`
3. You should see:
   - Regular login form (top)
   - "Google Login" section (bottom)
   - "Continue with Google" button
4. Click the Google button
5. Login with your @ku.th account
6. ✨ Success! You're redirected to restaurants page

---

## 🔍 Quick Verification / ตรวจสอบอย่างรวดเร็ว

### **Check 1: Google Client ID is Set**

**Backend:**
```bash
cat .env.properties | grep GOOGLE_CLIENT_ID
# Should output: GOOGLE_CLIENT_ID=your-client-id
```

**Frontend:**
```bash
cat frontend/.env | grep GOOGLE_CLIENT_ID
# Should output: REACT_APP_GOOGLE_CLIENT_ID=your-client-id
```

### **Check 2: Backend Compiles**
```bash
./gradlew compileJava --no-daemon
# Should succeed without errors
```

### **Check 3: Frontend Has Dependencies**
```bash
cat frontend/package.json | grep google-one-tap
# Should output: "google-one-tap": "^1.0.6"
```

---

## 🎯 What Changed? / มีอะไรเปลี่ยนแปลง?

### **Backend (Backend เปลี่ยนอะไร):**
```
✅ build.gradle - Google API dependency
✅ GoogleAuthRequest.java - NEW DTO
✅ User.java - Added provider field
✅ UserService.java - Added findOrCreateGoogleUser()
✅ AuthenticationController.java - Added /api/auth/google endpoint
✅ application.properties - Google Client ID config
```

### **Frontend (Frontend เปลี่ยนอะไร):**
```
✅ package.json - google-one-tap dependency
✅ GoogleLoginButton.jsx - NEW component
✅ Login.jsx - Added Google login section
✅ index.html - Google GSI script
```

---

## 🔧 Troubleshooting / แก้ปัญหา

### **Problem: Google button doesn't show**
**Solution:**
```bash
# Check index.html has the script
grep "accounts.google.com/gsi/client" frontend/public/index.html

# Clear browser cache and refresh
```

### **Problem: "Invalid token" error**
**Solution:**
```bash
# Verify Client IDs match
echo "Backend:"
cat .env.properties | grep GOOGLE_CLIENT_ID
echo "Frontend:"
cat frontend/.env | grep GOOGLE_CLIENT_ID
echo "Frontend Code:"
grep "GOOGLE_CLIENT_ID" frontend/src/components/GoogleLoginButton.jsx
```

### **Problem: CORS error**
**Solution:**
- Check backend `CorsConfig.java` allows `https://localhost:3001`
- Already configured in previous lab, should work!

### **Problem: Build errors**
**Solution:**
```bash
# Clean and rebuild
./gradlew clean
./gradlew build --no-daemon
```

---

## 📋 Complete Test Checklist / รายการทดสอบครบถ้วน

```
[ ] Backend starts without errors
[ ] Frontend starts without errors
[ ] Can access https://localhost:3001/login
[ ] Regular login still works
[ ] Google button appears on login page
[ ] Click Google button opens Google login
[ ] Can login with @ku.th account
[ ] Redirected to /restaurants after Google login
[ ] Email shown as username
[ ] Can access restaurant list
[ ] Can logout successfully
[ ] Can re-login with Google
[ ] Cookie is HttpOnly and Secure
[ ] Both login methods work
```

---

## 🎓 Architecture Overview / ภาพรวมสถาปัตยกรรม

```
┌─────────────────────────────────────────────────────────────┐
│                    User's Browser                            │
│                 https://localhost:3001                       │
│                                                               │
│  ┌──────────────┐         ┌──────────────────────┐          │
│  │  Login.jsx   │ ──────> │ GoogleLoginButton.jsx│          │
│  │              │         │ (renders button)     │          │
│  └──────────────┘         └──────────┬───────────┘          │
│                                       │                       │
│                                       │ Click                │
│                                       ▼                       │
│                            ┌──────────────────────┐          │
│                            │  Google OAuth Page   │          │
│                            │  (external)          │          │
│                            └──────────┬───────────┘          │
│                                       │                       │
│                                       │ Returns ID Token     │
│                                       ▼                       │
│                            ┌──────────────────────┐          │
│                            │ POST /api/auth/google│          │
│                            │ { credential: "..." }│          │
│                            └──────────┬───────────┘          │
└────────────────────────────────────────┼──────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Spring Boot Backend                             │
│             https://localhost:8090                           │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │ AuthenticationController.loginWithGoogle()       │       │
│  │                                                   │       │
│  │ 1. Verify ID token with Google                   │       │
│  │ 2. Extract email & name                          │       │
│  │ 3. Find or create user (provider=google)         │       │
│  │ 4. Generate our JWT token                        │       │
│  │ 5. Set HttpOnly cookie                           │       │
│  │ 6. Return success                                │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │ Database (H2)                                     │       │
│  │                                                   │       │
│  │ user_info:                                        │       │
│  │ - username: john.doe@ku.th                       │       │
│  │ - provider: google                               │       │
│  │ - role: ROLE_USER                                │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📞 Need Help? / ต้องการความช่วยเหลือ?

### **Check Logs:**

**Backend:**
```bash
tail -f log/restaurant-api.log
# Look for: "User 'email' signed in with roles: ROLE_USER"
```

**Frontend:**
```bash
# Open browser DevTools → Console
# Look for: "Logged in via Google"
```

### **Check Environment:**
```bash
# Backend Java version
java -version
# Should be 17+

# Frontend Node version  
node -version
# Should be 16+

# Check if servers are running
lsof -i :8090  # Backend
lsof -i :3001  # Frontend
```

---

## ✅ Success Indicators / สัญญาณความสำเร็จ

When everything works, you should see:

เมื่อทุกอย่างทำงาน คุณจะเห็น:

1. ✅ Google button renders on login page
2. ✅ Clicking opens Google login popup/redirect
3. ✅ After login, redirected to `/restaurants`
4. ✅ Your email displayed as username
5. ✅ Backend log shows: "User 'your.email@ku.th' signed in"
6. ✅ Can access protected routes
7. ✅ Cookie visible in DevTools (HttpOnly, Secure)
8. ✅ Logout works correctly
9. ✅ Can login again seamlessly

---

## 🎉 You're Done! / เสร็จแล้ว!

Your Restaurant app now supports:
- ✅ Username/Password login (Lab 8)
- ✅ Google OAuth login (Lab 9)
- ✅ HttpOnly cookies
- ✅ HTTPS security
- ✅ Role-based access
- ✅ Single Sign-On (SSO)

**Amazing work!** 🎊

**ทำได้ยอดเยี่ยม!** 🎊

