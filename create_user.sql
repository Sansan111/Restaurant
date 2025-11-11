-- สร้าง user manager
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'manager') THEN
        CREATE USER manager WITH PASSWORD 'abc123';
        ALTER USER manager CREATEDB;
        RAISE NOTICE 'User manager created';
    ELSE
        ALTER USER manager WITH PASSWORD 'abc123';
        RAISE NOTICE 'User manager already exists, password updated';
    END IF;
END
\$\$;

-- สร้าง database
SELECT 'CREATE DATABASE restaurant'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'restaurant')\gexec

-- ให้สิทธิ์
GRANT ALL PRIVILEGES ON DATABASE restaurant TO manager;
