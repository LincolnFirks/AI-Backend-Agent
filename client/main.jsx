import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import './main.css';

Meteor.startup(() => {
    Meteor.subscribe('history');
    Meteor.subscribe('current');
    const container = document.getElementById('react-target');
    const root = createRoot(container);
    root.render(<App />);
});

export const formatDateAndTime = (date) => {
    if (date === "-") return date;
    const formattedDate = date.toLocaleDateString('en-US');
    const formattedTime = date.toLocaleTimeString('en-US');
    return `${formattedDate} ${formattedTime}`;
  };
