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
        <label htmlFor={name} className="form-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}

      {/* Hiển thị lỗi */}
      {error && <span className="form-error">{error}</span>}

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
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={`form-input ${error ? "input-error" : ""}`}
          required={required}
          {...rest}
        />
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
