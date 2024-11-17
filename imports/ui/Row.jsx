import React from 'react';

export const Row = ({result}) => (
    <tr>
        <td>{`${result.method}`}</td>
        <td>{`${result.key}`}</td>
        <td>{`${result.value}`}</td>
    </tr>
);
