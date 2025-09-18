const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Dashboard stats
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const totalBooks = await pool.query('SELECT COUNT(*) FROM books');
    const issuedBooks = await pool.query('SELECT COUNT(*) FROM books WHERE current_status = $1', ['Issued']);
    const availableBooks = await pool.query('SELECT COUNT(*) FROM books WHERE current_status = $1', ['In Stock']);
    const totalEmployees = await pool.query('SELECT COUNT(*) FROM employees');
    
    res.json({
      totalBooks: parseInt(totalBooks.rows[0].count),
      issuedBooks: parseInt(issuedBooks.rows[0].count),
      availableBooks: parseInt(availableBooks.rows[0].count),
      totalEmployees: parseInt(totalEmployees.rows[0].count)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Currently issued books
router.get('/issued-books', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.book_id, b.name_of_book, b.name_of_writer, e.name_of_employee, i.date_of_issue
      FROM books b
      JOIN employees e ON b.issued_to_id = e.emp_id
      JOIN issues i ON b.book_id = i.book_id AND e.emp_id = i.employee_id
      WHERE b.current_status = 'Issued'
      ORDER BY i.date_of_issue DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Books in stock
router.get('/available-books', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT book_id, name_of_book, category, name_of_writer, price_of_book
      FROM books 
      WHERE current_status = 'In Stock'
      ORDER BY name_of_book
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Issue/Return history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { book_id, employee_id } = req.query;
    
    let issueQuery = `
      SELECT i.*, b.name_of_book, e.name_of_employee, 'Issue' as type
      FROM issues i
      JOIN books b ON i.book_id = b.book_id
      JOIN employees e ON i.employee_id = e.emp_id
      WHERE 1=1
    `;
    
    let returnQuery = `
      SELECT r.*, b.name_of_book, e.name_of_employee, 'Return' as type
      FROM returns r
      JOIN books b ON r.book_id = b.book_id
      JOIN employees e ON r.employee_id = e.emp_id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (book_id) {
      issueQuery += ` AND i.book_id = $${params.length + 1}`;
      returnQuery += ` AND r.book_id = $${params.length + 1}`;
      params.push(book_id);
    }
    
    if (employee_id) {
      issueQuery += ` AND i.employee_id = $${params.length + 1}`;
      returnQuery += ` AND r.employee_id = $${params.length + 1}`;
      params.push(employee_id);
    }
    
    const query = `(${issueQuery}) UNION ALL (${returnQuery}) ORDER BY date_of_issue DESC, date_of_return DESC`;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;