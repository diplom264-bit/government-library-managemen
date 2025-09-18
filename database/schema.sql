-- Library Management System Database Schema
-- For Government Libraries of India

-- Master Table: Books (Inventory Details)
CREATE TABLE books (
    s_no SERIAL,
    book_id INTEGER PRIMARY KEY,
    name_of_book VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    name_of_writer VARCHAR(100) NOT NULL,
    price_of_book DECIMAL(10,2) NOT NULL,
    year_of_purchase INTEGER NOT NULL,
    remarks VARCHAR(100),
    theme_of_book VARCHAR(250),
    current_status VARCHAR(20) DEFAULT 'In Stock' CHECK (current_status IN ('Issued', 'In Stock')),
    issued_to_id INTEGER REFERENCES employees(emp_id)
);

-- Master Table: Employees (Official Details)
CREATE TABLE employees (
    s_no SERIAL,
    emp_id INTEGER PRIMARY KEY,
    name_of_employee VARCHAR(100) NOT NULL,
    designation VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    date_joining DATE NOT NULL,
    mobile_no BIGINT NOT NULL
);

-- Issue Table
CREATE TABLE issues (
    s_no SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(book_id),
    employee_id INTEGER REFERENCES employees(emp_id),
    transaction_type VARCHAR(20) DEFAULT 'Issue Book' CHECK (transaction_type = 'Issue Book'),
    date_of_issue DATE DEFAULT CURRENT_DATE
);

-- Return Table
CREATE TABLE returns (
    s_no SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(book_id),
    employee_id INTEGER REFERENCES employees(emp_id),
    transaction_type VARCHAR(20) DEFAULT 'Returning Book' CHECK (transaction_type = 'Returning Book'),
    date_of_return DATE DEFAULT CURRENT_DATE
);

-- Admin Table for Authentication
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_books_status ON books(current_status);
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_writer ON books(name_of_writer);
CREATE INDEX idx_issues_date ON issues(date_of_issue);
CREATE INDEX idx_returns_date ON returns(date_of_return);