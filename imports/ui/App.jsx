import React from 'react';
import { useState } from 'react'; 
import { Input } from './Input';
import { ResultTable } from './ResultTable';
import { LogTable } from './LogTable';
import { HelpButton } from './HelpButton';
import { useRef } from 'react';


export const App = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState({
    method: '-',
    key: '-',
    value: '-'
  });
  console.log(result);

  const createError = (errorMessage) => {
    setError(true);
    setErrorMessage(errorMessage);  
  }

  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const helpDialogRef = useRef(null)
  const toggleHelp = () => {
    console.log('Help button clicked');
    console.log(isHelpVisible);
    setIsHelpVisible(!isHelpVisible);
    if (helpDialogRef.current) {
      if (isHelpVisible) {
        console.log('Showing help dialog');
      } else {
        console.log('hiding help dialog');
      }
    }
  }
return (
    <div className='body'>
      {isHelpVisible && (
        <div className="help-dialog" ref={helpDialogRef}>
          <h2>Hi, I'm Duke!</h2>
          <p>I am a natural language processing model that can help you
            operate a backend system by managing a database.
            I can help you create, read, update, and delete data!
            When you enter in data for me to store,
            we suggest that you enter what you want to do with a key name and its corresponding value,
            as well as your intented action.
          </p>
          
          <p>If you're still not sure what to tell me, try following some of our suggested examples!
            Don't worry if you make a mistake, we'll let you know with an error, just try to be as specfic as possible.
            by signifying with dashes.
          </p>

          <h3>Create</h3>
          <p>Example: "Create a key 'color' with its value as 'cyan'."</p>
          
          <h3>Read</h3>
          <p>Example: "What is the value of the key 'color'?"</p>
          
          <h3>Update</h3>
          <p>Example: "Update key 'color' with value 'magenta'"</p>
          
          <h3>Delete</h3>
          <p>Example: "Delete key 'color'</p>
        </div>
      )}
    <div className='header'>
      <h1>Duke</h1>
      <HelpButton toggleHelp={toggleHelp}/>
    </div>
    <div className='content'>
    
    
    <div className='log-container'>
      <h2>Database Log</h2>
      <LogTable />
    </div>
    <div className='chat-container'>
      <div className='chat-box'>
        <h2>How would you like to modify the database?</h2>
        <Input createError setResult/>
      </div>
      <div className='chat-result'>
        <div className='result-container'>
          <h3>Is this what you wish?</h3>
          <ResultTable error errorMessage result={result}/>
          </div>
          <div className='confirm-container'>
            <p>Confirm?</p>
            <button className='confirm' aria-label='confirm button'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> <path d="M3 10C3 9.44772 3.44772 9 4 9H7V21H4C3.44772 
                21 3 20.5523 3 20V10Z" stroke="#74AA9C" stroke-width="2" stroke-linecap="round" 
                stroke-linejoin="round"></path> <path d="M7 11V19L8.9923 20.3282C9.64937 20.7662 
                10.4214 21 11.2111 21H16.4586C17.9251 21 19.1767 19.9398 19.4178 18.4932L20.6119 
                11.3288C20.815 10.1097 19.875 9 18.6391 9H14" stroke="#74AA9C" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 9L14.6872 
                5.56415C14.8659 4.67057 14.3512 3.78375 13.4867 3.49558V3.49558C12.6336 3.21122 
                11.7013 3.59741 11.2992 4.4017L8 11H7" stroke="#74AA9C" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round"></path> </g>
              </svg>
            </button>
          </div>
      </div>
    </div>

    </div>
    </div>
  );

}