import React, { memo } from "react";

const FormField = ({
  label,
  type = "text",
  name,
  placeholder = "",
  options = [],
  required = false,
  error = "",
  ...rest
}) => {
  return (
    <div className="form-group">
      {label && (
        <div className="label-wrapper">
          <label htmlFor={name} className="form-label">
            {label} {required && <span className="required-star">*</span>}
          </label>
          {error && <span className="form-error">{error}</span>}
        </div>
      )}

      {type === "select" ? (
        <select
          id={name}
          name={name}
          className={`form-select ${error ? "input-error" : ""}`}
          required={required}
          {...rest}
        >
          <option value="" disabled>
            -- Select --
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`form-input ${error ? "input-error" : ""}`}
          required={required}
          {...rest}
        />
      )}
    </div>
  );
};

export default memo(FormField);
