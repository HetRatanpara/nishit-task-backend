const express = require("express");
const pool = require("../db");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, email, branch_id } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name, email, branch_id) VALUES ($1, $2, $3) RETURNING *",
      [name, email, branch_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { name, email, branch_id } = req.body;
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, branch_id = $3 WHERE id = $4 RETURNING *",
      [name, email, branch_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
