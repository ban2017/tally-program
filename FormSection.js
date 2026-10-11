// FormSection.js - Form Input Section Component
import React from 'react';

const FormSection = ({ section, activeMenu, activePage, formData, onFieldChange, onSave }) => {
  return (
    <section className="form-section">
      <h2 className="section-title">{section.title}</h2>
      <p className="section-desc">{section.desc}</p>

      <form className="data-form" onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}>
        <div className="form-grid">
          {section.fields.map((field, idx) => {
            const fieldKey = `${activeMenu}-${activePage}-${field.label}`;
            const savedValue = formData[fieldKey] ?? field.defaultValue;

            return (
              <div key={idx} className="form-group">
                <label>{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="form-control"
                    value={savedValue}
                    onChange={(e) => onFieldChange(fieldKey, e.target.value)}
                    disabled={field.readonly}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="form-control"
                    value={savedValue}
                    onChange={(e) => onFieldChange(fieldKey, e.target.value)}
                    disabled={field.readonly}
                    placeholder={field.label}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            💾 Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => alert('🔄 Form values remain in the current session.')}
          >
            🔄 Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormSection;
