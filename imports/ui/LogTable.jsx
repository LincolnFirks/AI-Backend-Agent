import React, { useState, useEffect } from 'react';
import { HistoryStore } from '/imports/api/store'; 
import { useTracker } from 'meteor/react-meteor-data';
import { formatDateAndTime } from '../../client/main';
 

export const LogTable = () => {

    const historyEntries = useTracker(() => 
        HistoryStore.find({}, { sort: { time: -1 }, limit: 5 }).fetch()
    );
  

  return (
    <table>
      <thead>
        <tr>
          <th>Action</th>
          <th>Key</th>
          <th>Value</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {historyEntries.map((entry, index) => (
          <tr>
            <td>{`${entry.method}`}</td>
            <td>{`${entry.key}`}</td>
            <td>{`${entry.value}`}</td>
            <td>{`${formatDateAndTime(entry.time)}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};