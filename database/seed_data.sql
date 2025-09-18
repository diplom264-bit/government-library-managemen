-- Sample data for Government Library Management System

-- Insert sample employees
INSERT INTO employees (emp_id, name_of_employee, designation, date_of_birth, date_joining, mobile_no) VALUES
(1001, 'Rajesh Kumar', 'Librarian', '1985-06-15', '2010-03-01', 9876543210),
(1002, 'Priya Sharma', 'Assistant Librarian', '1990-08-22', '2015-07-15', 9876543211),
(1003, 'Amit Singh', 'Library Clerk', '1988-12-10', '2012-09-20', 9876543212),
(1004, 'Sunita Devi', 'Senior Librarian', '1982-04-05', '2008-01-10', 9876543213);

-- Insert sample books
INSERT INTO books (book_id, name_of_book, category, name_of_writer, price_of_book, year_of_purchase, remarks, theme_of_book, current_status) VALUES
(2001, 'Indian Constitution', 'Law', 'Dr. B.R. Ambedkar', 450.00, 2020, 'Good condition', 'Constitutional law and governance in India', 'In Stock'),
(2002, 'Gitanjali', 'Literature', 'Rabindranath Tagore', 250.00, 2019, 'Classic edition', 'Collection of poems by Nobel laureate', 'In Stock'),
(2003, 'Wings of Fire', 'Biography', 'A.P.J. Abdul Kalam', 350.00, 2021, 'Inspirational', 'Autobiography of former President of India', 'In Stock'),
(2004, 'Discovery of India', 'History', 'Jawaharlal Nehru', 400.00, 2020, 'Historical importance', 'History and culture of India', 'In Stock'),
(2005, 'Ramayana', 'Mythology', 'Valmiki', 500.00, 2018, 'Sanskrit epic', 'Ancient Indian epic about Lord Rama', 'In Stock');

-- Insert default admin user (password: admin123)
INSERT INTO admins (username, password_hash) VALUES 
('admin', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kOqZ8kHp0rQZ8kHp0rQZ8kHp0rQZ8kHp0r');