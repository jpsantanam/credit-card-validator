import React from 'react';
import './CreditCardForm.css';

function CreditCardForm() {
  const [isCardNumberValid, setIsCardNumberValid] = React.useState(true);
  const [isCvvValid, setIsCvvValid] = React.useState(true);
  const [isDateValid, setIsDateValid] = React.useState(true);
  const [validationText, setValidationText] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const requestBody = {
      cardNumber: formJson.cardNumber,
      cvv: formJson.cvv,
      date: `${formJson.year}/${formJson.month}`,
    };

    const response = await fetch('/card-validator', {
      method: form.method,
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });

    const validation = await response.json();
    setIsCardNumberValid( validation.isCardNumberValid && validation.isLastDigitValid);
    setIsCvvValid(validation.isCvvValid);
    setIsDateValid(validation.isDateValid);

    if (validation.isCardNumberValid && validation.isCvvValid && validation.isDateValid && validation.isLastDigitValid) {
      setValidationText('Valid credit card ✔️');
    } else {
      setValidationText('Invalid credit card ❌');
    }
  };

  return (
    <section>
      <h1>Credit Card Validator</h1>
      <form method='POST' onSubmit={handleSubmit}>
        <label className='Form-label'>
          <span className='Form-span'>Card Number</span>
          <input
            type='number'
            name='cardNumber'
            min='0'
            placeholder='1234 5678 3456 7890'
            className={`Form-input-width Form-input ${isCardNumberValid ? '' : 'Form-invalid-input'}`}
            required
          />
        </label>
        <label className='Form-label'>
          <span className='Form-span'>Expiration Month</span>
          <input
            type='number'
            name='month'
            placeholder='mm'
            min='1'
            max='12'
            className={`Form-input ${isDateValid ? '' : 'Form-invalid-input'}`}
            required
          ></input>
        </label>
        <label className='Form-label'>
          <span className='Form-span'>Expiration Year</span>
          <input
            type='number'
            name='year'
            placeholder='yyyy'
            min='1'
            className={`Form-input ${isDateValid ? '' : 'Form-invalid-input'}`}
            required
          ></input>
        </label>
        <label className='Form-label'>
          <span className='Form-span'>CVV</span>
          <input
            type='number'
            name='cvv'
            placeholder='cvv'
            min='0'
            className={`Form-input ${isCvvValid ? '' : 'Form-invalid-input'}`}
            required
          ></input>
        </label>
        <button type='submit' className='Form-button'>
          Validate
        </button>
      </form>
      <p className='Form-p'>{validationText}</p>
    </section>
  );
}

export default CreditCardForm;
