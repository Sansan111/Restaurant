# 🔑 Configure Your Google Client ID
# ตั้งค่า Google Client ID ของคุณ

## ⚠️ IMPORTANT: You Need to Configure Your Client ID!
## ⚠️ สำคัญ: คุณต้องตั้งค่า Client ID ของคุณ!

You mentioned you already have your **GOOGLE_CLIENT_ID** from Google Cloud Console. Now you need to add it to **2 places**:

คุณบอกว่ามี **GOOGLE_CLIENT_ID** จาก Google Cloud Console แล้ว ตอนนี้คุณต้องเพิ่มมันใน **2 ที่**:

---

## 📝 Method 1: Using Environment Files (Recommended)
## 📝 วิธีที่ 1: ใช้ไฟล์ Environment (แนะนำ)

### **Step 1: Backend Configuration**

**File:** `.env.properties` (in project root)

```bash
# If file doesn't exist, create it:
touch .env.properties

# Add this line (replace with your actual Client ID):
echo "GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com" >> .env.properties
```

**Or edit manually:**
```properties
GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
```

**Example:**
```properties
GOOGLE_CLIENT_ID=123456789012-abc123def456ghi789jkl012mno345pq.apps.googleusercontent.com
```

---

### **Step 2: Frontend Configuration**

**File:** `frontend/.env`

```bash
cd frontend

# Create .env file with your Client ID:
echo "REACT_APP_GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com" > .env
```

**Or edit manually:**
```
REACT_APP_GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
```

**Example:**
```
REACT_APP_GOOGLE_CLIENT_ID=123456789012-abc123def456ghi789jkl012mno345pq.apps.googleusercontent.com
```

**Important Notes:**
- ⚠️ Frontend needs `REACT_APP_` prefix
- ⚠️ Must use the SAME Client ID for both backend and frontend
- ⚠️ `.env` files are gitignored (won't be committed)

---

## 📝 Method 2: Hardcode in Frontend (Alternative)
## 📝 วิธีที่ 2: ใส่ตรงในโค้ดฟรอนต์เอนด์ (ทางเลือก)

If you don't want to use environment variable for frontend, you can hardcode it:

**File:** `frontend/src/components/GoogleLoginButton.jsx`

**Line 7:** Change from:
```javascript
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
```

**To:**
```javascript
const GOOGLE_CLIENT_ID = "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com";
```

**Replace** `1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com` with your actual Client ID.

---

## 🔍 How to Find Your Client ID
## 🔍 หา Client ID ของคุณได้ที่ไหน

You mentioned you already have it, but just in case:

คุณบอกว่ามีแล้ว แต่เผื่อต้องการ:

1. Go to: https://console.cloud.google.com
2. Select your project ("Restaurant App")
3. Navigate to: **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID
5. Click on the client name
6. Copy the **Client ID** (looks like: `123456...apps.googleusercontent.com`)

**DO NOT use Client Secret** - we only need Client ID!

**อย่าใช้ Client Secret** - เราต้องการแค่ Client ID!

---

## ✅ Verify Configuration / ตรวจสอบการตั้งค่า

### **Check Backend:**
```bash
cat .env.properties | grep GOOGLE_CLIENT_ID
```

**Expected output:**
```
GOOGLE_CLIENT_ID=123456789012-abc123def456ghi789jkl012mno345pq.apps.googleusercontent.com
```

### **Check Frontend:**
```bash
cat frontend/.env | grep GOOGLE_CLIENT_ID
```

**Expected output:**
```
REACT_APP_GOOGLE_CLIENT_ID=123456789012-abc123def456ghi789jkl012mno345pq.apps.googleusercontent.com
```

---

## 🚀 After Configuration / หลังจากตั้งค่าแล้ว

### **1. Install Frontend Dependencies:**
```bash
cd frontend
npm install
cd ..
```

### **2. Start Backend:**
```bash
./gradlew bootRun
```
Wait for: `Started RestaurantApplication`

### **3. Start Frontend (new terminal):**
```bash
cd frontend
npm start
```
Wait for: `Compiled successfully!`

### **4. Test:**
Open Firefox and go to: `https://localhost:3001/login`

You should see the Google "Continue with Google" button!

คุณควรเห็นปุ่ม Google "Continue with Google"!

---

## 🐛 Common Issues / ปัญหาที่พบบ่อย

### **Issue 1: "Invalid token" error**

**Cause:** Client IDs don't match or wrong Client ID

**Solution:**
```bash
# Check both have SAME Client ID
echo "Backend:"
cat .env.properties | grep GOOGLE_CLIENT_ID
echo ""
echo "Frontend:"
cat frontend/.env | grep GOOGLE_CLIENT_ID
```

Make sure they're identical!

### **Issue 2: Environment variable not loaded**

**Symptoms:**
- Backend error: "Could not resolve placeholder 'google.clientId'"
- Or backend uses wrong Client ID

**Solution:**
1. Make sure `.env.properties` exists in project root
2. Check `application.properties` has:
   ```properties
   spring.config.import=optional:classpath:.env.properties
   google.clientId=${GOOGLE_CLIENT_ID}
   ```
3. Restart backend

### **Issue 3: Frontend can't read environment variable**

**Symptoms:**
- Google button shows but doesn't work
- Console error: "client_id is required"

**Solution:**
1. Frontend `.env` must have `REACT_APP_` prefix
2. Restart frontend after creating `.env`
3. Or hardcode in `GoogleLoginButton.jsx` (Method 2)

---

## 📋 Checklist / รายการตรวจสอบ

Before starting the app, verify:

- [ ] `.env.properties` exists in project root
- [ ] `.env.properties` has `GOOGLE_CLIENT_ID=your-client-id`
- [ ] `frontend/.env` exists OR `GoogleLoginButton.jsx` is hardcoded
- [ ] Frontend env has `REACT_APP_GOOGLE_CLIENT_ID=your-client-id`
- [ ] Both use the SAME Client ID
- [ ] Client ID format: `numbers-randomchars.apps.googleusercontent.com`
- [ ] `npm install` has been run in frontend
- [ ] Both backend and frontend can start without errors

---

## 📄 Example Configuration / ตัวอย่างการตั้งค่า

### **Example .env.properties (Backend):**
```properties
# This is an EXAMPLE - use your actual Client ID!
GOOGLE_CLIENT_ID=123456789012-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p.apps.googleusercontent.com
```

### **Example frontend/.env (Frontend):**
```
# This is an EXAMPLE - use your actual Client ID!
REACT_APP_GOOGLE_CLIENT_ID=123456789012-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p.apps.googleusercontent.com
```

**⚠️ IMPORTANT:** These are examples! Replace with your actual Client ID from Google Console.

**⚠️ สำคัญ:** นี่เป็นตัวอย่าง! เปลี่ยนเป็น Client ID จริงของคุณจาก Google Console

---

## 🎯 Quick Command Summary / สรุปคำสั่งอย่างรวดเร็ว

```bash
# 1. Configure backend
echo "GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com" > .env.properties

# 2. Configure frontend
cd frontend
echo "REACT_APP_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com" > .env

# 3. Install dependencies
npm install
cd ..

# 4. Verify
cat .env.properties | grep GOOGLE_CLIENT_ID
cat frontend/.env | grep GOOGLE_CLIENT_ID

# 5. Start backend (terminal 1)
./gradlew bootRun

# 6. Start frontend (terminal 2)
cd frontend
npm start
```

---

## ✨ You're Ready! / พร้อมแล้ว!

Once you've configured your Client ID in both places, you're all set!

เมื่อคุณตั้งค่า Client ID ในทั้ง 2 ที่แล้ว คุณพร้อมแล้ว!

🚀 **Start the servers and test Google login!**

🚀 **เริ่มเซิร์ฟเวอร์และทดสอบการเข้าสู่ระบบด้วย Google!**

