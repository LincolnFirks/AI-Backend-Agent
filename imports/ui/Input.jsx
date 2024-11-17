import React, { useState } from 'react';

export const Input = ({setError ,createError, setResult}) => {
  const [value, setValue] = useState(''); // State to track the input value

  function getJSON(value) {
    return new Promise((resolve, reject) => {
      Meteor.call("GetJSON", value, (error, response) => {
        if (error) {
          reject(error); // Reject the promise if there's an error
        } else {
          resolve(response); // Resolve the promise with the response
        }
      });
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    let response;
    if (value.trim()) {
      console.log('Submitted:', value); // Replace this with your desired functionality
      try {
        response = await getJSON(value); // Wait for the response to be returned
        console.log('Response:', response); // Now you have the response value

        // Use setResult to update the state or perform any other actions
        setResult(response);
      } catch (error) {
        console.error('Error fetching data:', error); // Handle any errors
        createError(error); // Optionally pass the error to createError for display
      }
      if (response.error) {
        createError(response.error); 
        setResult(response)
      } else {
        setError(false)
      }
      console.log(response)
      setResult(response)
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