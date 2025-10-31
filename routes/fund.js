const express = require("express");
const pool = require("../db");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { amount, user_id } = req.body;
    const result = await pool.query(
      "INSERT INTO fund (amount, user_id) VALUES ($1, $2) RETURNING *",
      [amount, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fund");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { amount, user_id } = req.body;
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE fund SET amount = $1, user_id = $2 WHERE id = $3 RETURNING *",
      [amount, user_id, id]
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
    await pool.query("DELETE FROM fund WHERE id = $1", [id]);
    res.json({ message: "Fund deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
