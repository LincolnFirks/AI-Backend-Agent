import React, { useState } from 'react';

export const HelpButton = ({toggleHelp}) => {
    return (
        <div>
        <button onClick={toggleHelp} className='how-to' aria-label='how to button'>
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#D1D9E0">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> <g id="Layer_2" data-name="Layer 2"> 
          <g id="invisible_box" data-name="invisible box"> 
          <rect width="48" height="48" fill="none"></rect> </g>
           <g id="Icons"> <g> <path d="M24.3,6A11.2,11.2,0,0,0,16,9.3a11,11,0,0,0-3.5,8.2,2.5,
           2.5,0,0,0,5,0,6.5,6.5,0,0,1,2-4.7A6.2,6.2,0,0,1,24.2,11a6.5,6.5,0,0,1,1,12.9,4.4,4.4,
           0,0,0-3.7,4.4v3.2a2.5,2.5,0,0,0,5,0V28.7a11.6,11.6,0,0,0,9-11.5A11.7,11.7,0,0,0,24.3,6Z">
            </path> <circle cx="24" cy="39.5" r="2.5"></circle> </g> </g> </g> </g>
          </svg>
        </button>
        </div>
    );
}