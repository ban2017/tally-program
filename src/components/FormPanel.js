import React from 'react';

const FormPanel = ({ title, description, fields, formData, onFieldChange }) => {
  return (
    <div className="form-section">
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{description}</p>

      <form className="data-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-grid">
          {fields.map((field) => (
            <div key={field.key} className="form-group">
              <label>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  className="form-control"
                  value={formData[field.key] || field.defaultValue}
                  onChange={(e) => onFieldChange(field.key, e.target.value)}
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  className="form-control"
                  value={formData[field.key] || field.defaultValue}
                  onChange={(e) => onFieldChange(field.key, e.target.value)}
                  placeholder={field.label}
                />
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            💾 Save Changes
          </button>
          <button type="button" className="btn btn-secondary">
            🔄 Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPanel;
