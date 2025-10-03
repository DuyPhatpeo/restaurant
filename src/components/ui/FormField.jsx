import React, { memo } from "react";

const FormField = ({
  label,
  type = "text",
  name,
  placeholder = "",
  options = [],
  required = false,
  ...rest
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      {type === "select" ? (
        <select
          id={name}
          name={name}
          className="form-select"
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
          className="form-input"
          required={required}
          {...rest}
        />
      )}
    </div>
  );
};

export default memo(FormField);
