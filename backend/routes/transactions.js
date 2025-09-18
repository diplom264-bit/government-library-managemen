const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Issue book
router.post('/issue', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { book_id, employee_id } = req.body;
    
    // Check if book is available
    const bookCheck = await client.query('SELECT current_status FROM books WHERE book_id = $1', [book_id]);
    if (bookCheck.rows.length === 0) {
      throw new Error('Book not found');
    }
    if (bookCheck.rows[0].current_status === 'Issued') {
      throw new Error('Book is already issued');
    }
    
    // Update book status
    await client.query('UPDATE books SET current_status = $1, issued_to_id = $2 WHERE book_id = $3', 
      ['Issued', employee_id, book_id]);
    
    // Insert issue record
    const result = await client.query(
      'INSERT INTO issues (book_id, employee_id, date_of_issue) VALUES ($1, $2, CURRENT_DATE) RETURNING *',
      [book_id, employee_id]
    );
    
    await client.query('COMMIT');
    res.status(201).json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Return book
router.post('/return', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { book_id, employee_id } = req.body;
    
    // Check if book is issued
    const bookCheck = await client.query('SELECT current_status, issued_to_id FROM books WHERE book_id = $1', [book_id]);
    if (bookCheck.rows.length === 0) {
      throw new Error('Book not found');
    }
    if (bookCheck.rows[0].current_status === 'In Stock') {
      throw new Error('Book is not issued');
    }
    
    // Update book status
    await client.query('UPDATE books SET current_status = $1, issued_to_id = NULL WHERE book_id = $2', 
      ['In Stock', book_id]);
    
    // Insert return record
    const result = await client.query(
      'INSERT INTO returns (book_id, employee_id, date_of_return) VALUES ($1, $2, CURRENT_DATE) RETURNING *',
      [book_id, employee_id]
    );
    
    await client.query('COMMIT');
    res.status(201).json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;