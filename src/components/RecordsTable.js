import React from 'react';

const RecordsTable = ({ title, rows, onAdd, onDelete }) => {
  return (
    <div className="records-panel">
      <div className="records-header">
        <h3>{title}</h3>
        <button className="add-record-btn" onClick={onAdd}>
          ➕ Add New
        </button>
      </div>

      <div className="records-table-wrap">
        {rows.length > 0 ? (
          <table className="records-table">
            <thead>
              <tr>
                {Object.keys(rows[0] || {}).map((key) => (
                  <th key={key}>{key.toUpperCase().replace(/-/g, ' ')}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {Object.values(row).map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}
                  <td>
                    <button
                      className="delete-row-btn"
                      onClick={() => onDelete(row.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-records">No records found. Add one to get started.</div>
        )}
      </div>
    </div>
  );
};

export default RecordsTable;
