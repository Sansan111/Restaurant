#!/bin/bash
echo "กำลังทดสอบการเชื่อมต่อ PostgreSQL..."
echo ""
echo "ลองเชื่อมต่อโดยไม่ใส่ password..."
timeout 2 psql -U postgres -d postgres -c "SELECT version();" 2>&1 | head -3
echo ""
echo "ถ้าเห็น 'Password for user postgres:' = ต้องการ password"
echo "ถ้าเห็น version() = ไม่ต้องการ password (กด Enter ได้เลย)"
