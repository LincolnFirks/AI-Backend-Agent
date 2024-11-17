import React, { useState } from 'react';

export const Input = (createError, setResult) => {
  const [value, setValue] = useState(''); // State to track the input value
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    if (value.trim()) {
      console.log('Submitted:', value); // Replace this with your desired functionality
      const response = Meteor.call("GetJSON", value);
      if (response.error) {
        createError(response.error); 
        setResult(response)
      }
      setValue(''); // Clear the input after submission
    }
  };

  return (
    <div className='input-container'>
      <form onSubmit={handleSubmit} className='input-form'>
        <input
          type='text'
          placeholder='Your wish is my command...'
          value={value} // Controlled input linked to state
          onChange={(e) => setValue(e.target.value)} // Update state on user input
          className='input-field'
        />
        <button type='submit' className='submit-button'>
          Submit
        </button>
      </form>
    </div>
  );
};