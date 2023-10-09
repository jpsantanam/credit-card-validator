const express = require('express');
let router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const params = req.body;
    const isDateValid = validateDate(params.date);

    res.status(201).send({ isDateValid });
  } catch (err) {
    res.status(500).send(err);
  }
});

const validateDate = (date) => {
  const now = new Date();
  const expirationDate = new Date(date);
  const isDateValid = expirationDate > now;
  return isDateValid;
};

module.exports = router;
