import React from 'react';
import { Row } from './Row.jsx';

export const ResultTable = ({error, errorMessage, result}) => (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <Row result={result}/>
            </tbody>
        </table>
        {!error &&
            <div className="error">
                <p>{`${errorMessage}`}</p>
            </div>}
    </div>
);