# Government Library Management System

A comprehensive, lightweight Library Book Management System designed for easy integration into any Government Library of India.

## Features

### Core Functionality
- **Book Inventory Management**: Add, edit, delete, and search books
- **Employee Management**: Manage library staff records
- **Issue/Return System**: Track book transactions with automatic status updates
- **Advanced Search & Filtering**: Search by book name, author, category, and availability
- **Comprehensive Reports**: Dashboard statistics, issued books, available books, and transaction history

### Technical Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Secure Authentication**: JWT-based admin authentication
- **Database Integrity**: Foreign key relationships and transaction safety
- **RESTful API**: Clean, documented API endpoints
- **Containerized Deployment**: Docker support for easy deployment

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **Frontend**: React.js + TailwindCSS
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Docker & Docker Compose

## Database Schema

### Tables
1. **Books** - Master inventory table with book details
2. **Employees** - Staff records and official details
3. **Issues** - Transaction log for book issues
4. **Returns** - Transaction log for book returns
5. **Admins** - System administrators

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

4. **Default Login Credentials**
   - Username: `admin`
   - Password: `admin123`

### Manual Setup (Without Docker)

#### Backend Setup
```bash
cd backend
npm install
# Configure .env file with your database credentials
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### Database Setup
```bash
# Create PostgreSQL database
createdb library_management

# Run schema and seed data
psql -d library_management -f database/schema.sql
psql -d library_management -f database/seed_data.sql
```

## API Documentation

### Authentication
- `POST /api/auth/login` - Admin login

### Books Management
- `GET /api/books` - Get all books (with search/filter)
- `POST /api/books` - Add new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Employee Management
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Add new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Transactions
- `POST /api/transactions/issue` - Issue book to employee
- `POST /api/transactions/return` - Return book from employee

### Reports
- `GET /api/reports/dashboard` - Dashboard statistics
- `GET /api/reports/issued-books` - Currently issued books
- `GET /api/reports/available-books` - Available books
- `GET /api/reports/history` - Issue/return history

## Configuration

### Environment Variables (.env)
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library_management
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your_jwt_secret_key_here
```

## Deployment for Government Libraries

### Server Requirements
- **Minimum**: 2GB RAM, 20GB Storage, Linux OS
- **Recommended**: 4GB RAM, 50GB Storage, Ubuntu 20.04+

### Production Deployment
1. **Clone repository on server**
2. **Configure environment variables**
3. **Run with Docker Compose**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Data Migration
- Export existing library data to CSV
- Use provided migration scripts in `/scripts` folder
- Import data through admin interface or API

## Customization for Different Libraries

### Adding New Book Categories
Update the categories in:
- Frontend: `src/pages/Books.js` (dropdown options)
- Database: Add validation if needed

### Custom Fields
1. Modify database schema in `database/schema.sql`
2. Update API routes in `backend/routes/`
3. Update frontend forms in `src/pages/`

### Branding
- Update logo and colors in `frontend/src/index.css`
- Modify header text in `frontend/src/components/Layout.js`

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- SQL injection prevention with parameterized queries
- CORS protection
- Input validation and sanitization

## Backup & Recovery

### Database Backup
```bash
docker exec -t postgres pg_dump -U postgres library_management > backup.sql
```

### Database Restore
```bash
docker exec -i postgres psql -U postgres library_management < backup.sql
```

## Support & Maintenance

### Logs
- Backend logs: `docker logs library-management-backend-1`
- Database logs: `docker logs library-management-postgres-1`

### Updates
1. Pull latest changes
2. Rebuild containers: `docker-compose build`
3. Restart services: `docker-compose up -d`

## License

This project is designed for Government Libraries of India and is available for public use and modification.

## Contributing

1. Fork the repository
2. Create feature branch
3. Submit pull request with detailed description

## Contact

For technical support or customization requests, please create an issue in the repository.

---

**Built for Government Libraries of India** 🇮🇳