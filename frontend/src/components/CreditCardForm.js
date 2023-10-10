import './CreditCardForm.css';

function CreditCardForm({ setReminderData }) {
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

    await fetch('/card-validator', {
      method: form.method,
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <section>
      <h2>Credit Card Validator</h2>
      <form method='POST' onSubmit={handleSubmit}>
        <label className='Add-label'>
          Card Number
          <input
            type='number'
            name='cardNumber'
            min='0'
            placeholder='1234 5678 3456 7890'
            required
          />
        </label>
        <label className='Add-label'>
          Expiration Month
          <input
            type='number'
            name='month'
            placeholder='mm'
            min='1'
            max='12'
            required
          ></input>
        </label>
        <label className='Add-label'>
          Expiration Year
          <input
            type='number'
            name='year'
            placeholder='yyyy'
            min='1'
            required
          ></input>
        </label>
        <label className='Add-label'>
          CVV
          <input
            type='number'
            name='cvv'
            placeholder='cvv'
            min='0'
            className='Add-input'
            required
          ></input>
        </label>
        <button type='submit' className='Add-button'>
          Validate
        </button>
      </form>
    </section>
  );
}

export default CreditCardForm;
