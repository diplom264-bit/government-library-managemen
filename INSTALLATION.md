# Installation Guide for Government Libraries

## System Requirements

### Minimum Requirements
- **Operating System**: Linux (Ubuntu 18.04+, CentOS 7+, RHEL 7+)
- **RAM**: 2GB
- **Storage**: 20GB free space
- **Network**: Internet connection for initial setup

### Recommended Requirements
- **Operating System**: Ubuntu 20.04 LTS
- **RAM**: 4GB
- **Storage**: 50GB free space
- **CPU**: 2 cores

## Installation Methods

### Method 1: Docker Installation (Recommended)

#### Step 1: Install Docker
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# CentOS/RHEL
sudo yum install docker docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

#### Step 2: Download and Setup
```bash
# Download the application
git clone <repository-url>
cd library-management

# Start the application
sudo docker-compose up -d
```

#### Step 3: Verify Installation
```bash
# Check if all services are running
sudo docker-compose ps

# Access the application
# Open browser and go to: http://your-server-ip:3000
```

### Method 2: Manual Installation

#### Step 1: Install Dependencies
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib
```

#### Step 2: Setup Database
```bash
# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE library_management;
CREATE USER libadmin WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE library_management TO libadmin;
\q

# Import schema
sudo -u postgres psql -d library_management -f database/schema.sql
sudo -u postgres psql -d library_management -f database/seed_data.sql
```

#### Step 3: Setup Backend
```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env file with your database credentials

# Start backend
npm start
```

#### Step 4: Setup Frontend
```bash
cd ../frontend
npm install

# Start frontend
npm start
```

## Configuration

### Database Configuration
Edit `backend/.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library_management
DB_USER=libadmin
DB_PASSWORD=secure_password
JWT_SECRET=your_very_secure_jwt_secret_key
```

### Network Configuration
- **Frontend Port**: 3000
- **Backend Port**: 5000
- **Database Port**: 5432

### Firewall Settings
```bash
# Allow necessary ports
sudo ufw allow 3000
sudo ufw allow 5000
sudo ufw allow 5432
```

## Initial Setup

### 1. Access the Application
Open web browser and navigate to: `http://your-server-ip:3000`

### 2. Login with Default Credentials
- **Username**: admin
- **Password**: admin123

### 3. Change Default Password
1. Login to the system
2. Go to Admin Settings (if available) or contact system administrator
3. Change the default password immediately

### 4. Add Library Data
1. **Add Employees**: Go to Employees section and add library staff
2. **Add Books**: Go to Books section and add your book inventory
3. **Configure Categories**: Customize book categories as per your library

## Data Migration

### From Excel/CSV Files
1. **Prepare Data**: Format your existing data according to the database schema
2. **Use Import Feature**: Use the bulk import feature in the admin panel
3. **Verify Data**: Check all imported records for accuracy

### From Other Systems
1. **Export Data**: Export data from your current system in CSV format
2. **Map Fields**: Ensure field mapping matches our database schema
3. **Import**: Use the provided migration scripts

## Backup Configuration

### Automated Backup Setup
```bash
# Create backup script
sudo nano /usr/local/bin/library-backup.sh

#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker exec postgres pg_dump -U postgres library_management > /backup/library_backup_$DATE.sql
find /backup -name "library_backup_*.sql" -mtime +7 -delete

# Make executable
sudo chmod +x /usr/local/bin/library-backup.sh

# Add to crontab for daily backup
sudo crontab -e
# Add line: 0 2 * * * /usr/local/bin/library-backup.sh
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Error
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check database credentials in .env file
# Verify database exists
sudo -u postgres psql -l
```

#### 2. Port Already in Use
```bash
# Check what's using the port
sudo netstat -tulpn | grep :3000

# Kill the process or change port in configuration
```

#### 3. Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER /path/to/library-management
sudo chmod -R 755 /path/to/library-management
```

#### 4. Docker Issues
```bash
# Restart Docker services
sudo systemctl restart docker

# Rebuild containers
sudo docker-compose down
sudo docker-compose build --no-cache
sudo docker-compose up -d
```

## Security Hardening

### 1. Change Default Passwords
- Change database passwords
- Change JWT secret key
- Change admin login credentials

### 2. Enable HTTPS
```bash
# Install SSL certificate
sudo apt install certbot
sudo certbot --nginx -d your-domain.com
```

### 3. Firewall Configuration
```bash
# Enable firewall
sudo ufw enable

# Allow only necessary ports
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
```

### 4. Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade

# Update application
git pull origin main
sudo docker-compose build
sudo docker-compose up -d
```

## Performance Optimization

### 1. Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_books_search ON books(name_of_book, name_of_writer);
CREATE INDEX idx_issues_date ON issues(date_of_issue);
```

### 2. System Optimization
```bash
# Increase file limits
echo "* soft nofile 65536" >> /etc/security/limits.conf
echo "* hard nofile 65536" >> /etc/security/limits.conf
```

## Support

### Log Files Location
- **Application Logs**: `/var/log/library-management/`
- **Database Logs**: `/var/log/postgresql/`
- **System Logs**: `/var/log/syslog`

### Getting Help
1. Check log files for error messages
2. Refer to troubleshooting section
3. Create issue in project repository
4. Contact system administrator

---

**Installation completed successfully!** 🎉

Your Government Library Management System is now ready to use.