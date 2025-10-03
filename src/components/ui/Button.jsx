import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  hover = false,
  outline = false,
}) {
  let className = "btn";
  if (hover) className += " btn-hover";
  if (outline) className += " btn-outline";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}
