#!/bin/bash

# HTTPS Setup Script / สคริปต์ตั้งค่า HTTPS
# This script generates a self-signed certificate using mkcert
# สคริปต์นี้สร้าง self-signed certificate โดยใช้ mkcert

echo "========================================="
echo "HTTPS Setup for Restaurant Application"
echo "การตั้งค่า HTTPS สำหรับแอปพลิเคชัน Restaurant"
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

# Install local CA if not already installed / ติดตั้ง CA ในเครื่องถ้ายังไม่ได้ติดตั้ง
echo "📝 Installing local CA... / กำลังติดตั้ง CA ในเครื่อง..."
mkcert -install
echo ""

# Generate certificate / สร้าง certificate
echo "🔐 Generating certificate for localhost... / กำลังสร้าง certificate สำหรับ localhost..."
mkcert -pkcs12 localhost
echo ""

# Rename and move certificate / เปลี่ยนชื่อและย้าย certificate
if [ -f "localhost.p12" ]; then
    echo "📦 Moving certificate to resources folder... / กำลังย้าย certificate ไปยังโฟลเดอร์ resources..."
    mv localhost.p12 keystore.p12
    mv keystore.p12 src/main/resources/
    echo "✅ Certificate installed successfully! / ติดตั้ง certificate สำเร็จ!"
    echo ""
    echo "🚀 You can now run the application with HTTPS:"
    echo "   ./gradlew bootRun"
    echo ""
    echo "🌐 Application will be available at:"
    echo "   https://localhost:8090"
    echo ""
    echo "🚀 คุณสามารถรันแอปพลิเคชันด้วย HTTPS ได้แล้ว:"
    echo "   ./gradlew bootRun"
    echo ""
    echo "🌐 แอปพลิเคชันจะพร้อมใช้งานที่:"
    echo "   https://localhost:8090"
else
    echo "❌ Failed to generate certificate / ไม่สามารถสร้าง certificate ได้"
    exit 1
fi

