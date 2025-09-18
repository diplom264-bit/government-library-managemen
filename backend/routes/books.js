const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all books with search and filter
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { search, category, status } = req.query;
    let query = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name_of_book ILIKE $' + (params.length + 1) + ' OR name_of_writer ILIKE $' + (params.length + 1) + ')';
      params.push(`%${search}%`);
    }
    if (category) {
      query += ' AND category = $' + (params.length + 1);
      params.push(category);
    }
    if (status) {
      query += ' AND current_status = $' + (params.length + 1);
      params.push(status);
    }

    query += ' ORDER BY book_id';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new book
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { book_id, name_of_book, category, name_of_writer, price_of_book, year_of_purchase, remarks, theme_of_book } = req.body;
    
    const result = await pool.query(
      'INSERT INTO books (book_id, name_of_book, category, name_of_writer, price_of_book, year_of_purchase, remarks, theme_of_book) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [book_id, name_of_book, category, name_of_writer, price_of_book, year_of_purchase, remarks, theme_of_book]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update book
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name_of_book, category, name_of_writer, price_of_book, year_of_purchase, remarks, theme_of_book } = req.body;
    
    const result = await pool.query(
      'UPDATE books SET name_of_book = $1, category = $2, name_of_writer = $3, price_of_book = $4, year_of_purchase = $5, remarks = $6, theme_of_book = $7 WHERE book_id = $8 RETURNING *',
      [name_of_book, category, name_of_writer, price_of_book, year_of_purchase, remarks, theme_of_book, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete book
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM books WHERE book_id = $1', [id]);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;