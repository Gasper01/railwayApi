const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/materiales', async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM materiales');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.get('/materiales/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM materiales WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'materiales not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/materiales', async (req, res, next) => {
  try {
    const { codigo, descripcion, cantiadad, UND } = req.body;
    await pool.execute('INSERT INTO materiales (codigo, descripcion,cantiadad,UND VALUES (?, ?, ?, ?)', [codigo, descripcion, cantiadad, UND]);
    res.json({ message: 'materiales created successfully' });
  } catch (error) {
    next(error);
  }
});

router.put('/materiales/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { codigo, descripcion, cantiadad, UND } = req.body;
    await pool.execute('UPDATE materiales SET descripcion = ?, cantiadad = ?, UND = ? WHERE id = ?', [codigo, descripcion, cantiadad, UND, id]);
    res.json({ message: 'materiales updated successfully' });
  } catch (error) {
    next(error);
  }
});

router.delete('/materiales/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM materiales WHERE id = ?', [id]);
    res.json({ message: 'materiales deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
