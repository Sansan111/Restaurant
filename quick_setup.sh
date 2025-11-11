#!/bin/bash
echo "═══════════════════════════════════════════════════════════"
echo "  สร้าง user และ database (ลองกด Enter ถ้าถาม password)"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "กำลังเชื่อมต่อ PostgreSQL..."
echo "(ถ้าถาม password ให้ลองกด Enter ก่อน)"
echo ""

psql -U postgres -d postgres << 'SQL'
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'manager') THEN
        CREATE USER manager WITH PASSWORD 'abc123';
        ALTER USER manager CREATEDB;
        RAISE NOTICE '✅ สร้าง user manager สำเร็จ';
    ELSE
        ALTER USER manager WITH PASSWORD 'abc123';
        RAISE NOTICE 'ℹ️  user manager มีอยู่แล้ว อัปเดต password';
    END IF;
END
\$\$;

SELECT 'CREATE DATABASE restaurant'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'restaurant')\gexec

GRANT ALL PRIVILEGES ON DATABASE restaurant TO manager;

\q
SQL

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ สำเร็จ! ตอนนี้รันแอปได้แล้ว: ./gradlew bootRun"
else
    echo ""
    echo "❌ ไม่สำเร็จ - อาจจะต้องการ password"
    echo "กรุณารันเอง: psql -U postgres -d postgres"
fi
