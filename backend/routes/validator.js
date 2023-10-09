const express = require('express');
let router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const params = req.body;

    const isDateValid = validateDate(params.date);
    const isCvvValid = validateCvv(params.cvv, params.cardNumber);
    const isCardNumberValid = validateCardNumber(params.cardNumber);

    res.status(200).send({ isDateValid, isCvvValid, isCardNumberValid });
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

const validateCvv = (cvv, cardNumber) => {
  const AMERICAN_EXPRESS_CVV_LENGTH = 4;
  const CVV_LENGTH = 3;

  if (isAmericanExpress(cardNumber)) {
    const isCvvValid = cvv.length === AMERICAN_EXPRESS_CVV_LENGTH;
    return isCvvValid;
  }

  const isCvvValid = cvv.length === CVV_LENGTH;
  return isCvvValid;
};

const validateCardNumber = (cardNumber) => {
  const MIN_CARD_NUMBER_LENGTH = 16;
  const MAX_CARD_NUMBER_LENGTH = 19;
  const cardNumberLength = cardNumber.length;
  const isCardNumberValid = cardNumberLength >= MIN_CARD_NUMBER_LENGTH && cardNumberLength <= MAX_CARD_NUMBER_LENGTH;

  return isCardNumberValid;
};

const isAmericanExpress = (cardNumber) => {
  const firstTwoDigits = cardNumber.slice(0, 2);
  const americanExpressDigits = ['34', '37'];

  return americanExpressDigits.includes(firstTwoDigits);
};

module.exports = router;
