const express = require('express');
const validator = require('./routes/validator');
const app = express();
const port = 5000;

app.use(express.json());
app.use('/card-validator', validator);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
