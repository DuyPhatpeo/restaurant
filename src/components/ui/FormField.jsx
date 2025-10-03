import React, { memo } from "react";

const FormField = ({
  label,
  type = "text",
  name,
  placeholder = "",
  options = [],
  ...rest
}) => {
  // Render label
  const LabelEl = label ? (
    <label htmlFor={name} className="form-label">
      {label}
    </label>
  ) : null;

  // Render input or select
  let InputEl;
  if (type === "select") {
    InputEl = (
      <select id={name} name={name} className="form-select" {...rest}>
        <option value="">-- Select --</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    );
  } else {
    InputEl = (
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className="form-input"
        {...rest}
      />
    );
  }

  return (
    <div className="form-group">
      {LabelEl}
      {InputEl}
    </div>
  );
};

// memo để tránh re-render khi props không đổi
export default memo(FormField);
