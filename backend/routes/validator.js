const express = require('express');
let router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const params = req.body;
    const now = new Date();
    const expirationDate = new Date(params.date);
    const isDateValid = expirationDate > now;

    res.status(201).send({ isDateValid });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
