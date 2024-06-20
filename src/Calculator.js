import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [rows, setRows] = useState([{ id: 1, value: '0', sign: '+', enabled: true }]);
  const [result, setResult] = useState(0);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, value: '0', sign: '+', enabled: true };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleValueChange = (id, value) => {
    const updatedRows = rows.map(row => 
      row.id === id ? { ...row, value: value === '' ? '0' : value } : row
    );
    setRows(updatedRows);
  };

  const handleSignChange = (id) => {
    const updatedRows = rows.map(row => 
      row.id === id ? { ...row, sign: row.sign === '+' ? '-' : '+' } : row
    );
    setRows(updatedRows);
  };

  const handleToggleEnabled = (id) => {
    const updatedRows = rows.map(row => 
      row.id === id ? { ...row, enabled: !row.enabled } : row
    );
    setRows(updatedRows);
  };

  useEffect(() => {
    const calculateResult = () => {
      const result = rows
        .filter(row => row.enabled)
        .reduce((acc, row) => 
          row.sign === '+' ? acc + Number(row.value) : acc - Number(row.value), 0
        );
      setResult(result);
    };

    calculateResult();
  }, [rows]);

  return (
    <div>
      <h1>Simple React Calculator</h1>
      {rows.map(row => (
        <div key={row.id} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={row.value}
            onChange={(e) => handleValueChange(row.id, e.target.value)}
            disabled={!row.enabled}
          />
          <button onClick={() => handleSignChange(row.id)}>{row.sign}</button>
          <button onClick={() => handleToggleEnabled(row.id)}>
            {row.enabled ? 'Disable' : 'Enable'}
          </button>
          <button onClick={() => handleRemoveRow(row.id)} disabled={rows.length === 1}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddRow}>Add Row</button>
      <h2>Result: {result}</h2>
    </div>
  );
};

export default Calculator;
