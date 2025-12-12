#!/bin/bash

# Frontend HTTPS Setup Script / สคริปต์ตั้งค่า HTTPS สำหรับ Frontend
# This script generates certificates for React development server
# สคริปต์นี้สร้าง certificate สำหรับ React development server

echo "========================================="
echo "Frontend HTTPS Setup / การตั้งค่า HTTPS สำหรับ Frontend"
echo "========================================="
echo ""

# Check if mkcert is installed / ตรวจสอบว่าติดตั้ง mkcert แล้วหรือไม่
if ! command -v mkcert &> /dev/null
then
    echo "❌ mkcert is not installed / ยังไม่ได้ติดตั้ง mkcert"
    echo ""
    echo "Please install mkcert first:"
    echo "  macOS: brew install mkcert nss"
    echo "  Windows: Download from https://github.com/FiloSottile/mkcert"
    echo ""
    echo "กรุณาติดตั้ง mkcert ก่อน:"
    echo "  macOS: brew install mkcert nss"
    echo "  Windows: ดาวน์โหลดจาก https://github.com/FiloSottile/mkcert"
    exit 1
fi

echo "✅ mkcert is installed / ติดตั้ง mkcert แล้ว"
echo ""

# Generate PEM certificates for React / สร้าง PEM certificates สำหรับ React
echo "🔐 Generating PEM certificates for React... / กำลังสร้าง PEM certificates สำหรับ React..."
mkcert -cert-file localhost.pem -key-file localhost-key.pem localhost
echo ""

if [ -f "localhost.pem" ] && [ -f "localhost-key.pem" ]; then
    echo "✅ Certificates generated successfully! / สร้าง certificates สำเร็จ!"
    echo ""
    echo "📋 Certificate files created / ไฟล์ certificate ที่สร้างแล้ว:"
    echo "   - localhost.pem (certificate)"
    echo "   - localhost-key.pem (private key)"
    echo ""
    echo "🚀 You can now start the frontend with HTTPS:"
    echo "   cd frontend"
    echo "   npm install"
    echo "   npm start"
    echo ""
    echo "🌐 Frontend will be available at:"
    echo "   https://localhost:3001"
    echo ""
    echo "🚀 คุณสามารถเริ่ม frontend ด้วย HTTPS ได้แล้ว:"
    echo "   cd frontend"
    echo "   npm install"
    echo "   npm start"
    echo ""
    echo "🌐 Frontend จะพร้อมใช้งานที่:"
    echo "   https://localhost:3001"
else
    echo "❌ Failed to generate certificates / ไม่สามารถสร้าง certificates ได้"
    exit 1
fi

