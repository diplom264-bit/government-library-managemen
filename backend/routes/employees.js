const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all employees
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY emp_id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new employee
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { emp_id, name_of_employee, designation, date_of_birth, date_joining, mobile_no } = req.body;
    
    const result = await pool.query(
      'INSERT INTO employees (emp_id, name_of_employee, designation, date_of_birth, date_joining, mobile_no) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [emp_id, name_of_employee, designation, date_of_birth, date_joining, mobile_no]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update employee
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name_of_employee, designation, date_of_birth, date_joining, mobile_no } = req.body;
    
    const result = await pool.query(
      'UPDATE employees SET name_of_employee = $1, designation = $2, date_of_birth = $3, date_joining = $4, mobile_no = $5 WHERE emp_id = $6 RETURNING *',
      [name_of_employee, designation, date_of_birth, date_joining, mobile_no, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete employee
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM employees WHERE emp_id = $1', [id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;