const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        id, 
        jobTitle, 
        companyName, 
        location, 
        jobType, 
        experience, 
        description, 
        applicationDeadline,
        salaryMin,
        salaryMax,
        COALESCE('₹' || salaryMin, 'N/A') || ' - ' || COALESCE('₹' || salaryMax, 'N/A') || ' /Month' AS salary
      FROM jobs
      ORDER BY postedAt DESC;
    `;
    const { rows } = await db.query(query);
    console.log("Jobs fetched:", rows); // check what data comes from database
    res.json(rows);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      jobType,
      applicationDeadline,
      salaryMin,
      salaryMax,
      experience,
      description
    } = req.body;

    const query = `
      INSERT INTO jobs 
      (jobTitle, companyName, location, jobType, applicationDeadline, salaryMin, salaryMax, experience, description)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;
    const values = [jobTitle, companyName, location, jobType, applicationDeadline, salaryMin, salaryMax, experience, description];
    
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Database insert error:", err);
    res.status(500).json({ error: "Failed to create job" });
  }
});

module.exports = router;
