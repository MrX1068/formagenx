import React from "react";
import { FormagenXField } from "../types/schema";
import { FormagenXTheme } from "../types/theme";

interface FieldRendererProps {
  field: FormagenXField;
  value?: any;
  onChange: (val: any) => void;
  error?: string;
  theme: FormagenXTheme;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  error,
  theme,
}) => {
  const renderInputElement = () => {
    const commonProps = {
      name: field.name,
      value: value ?? "",
      onChange: (e: any) =>
        onChange(
          e?.target?.type === "checkbox" ? e.target.checked : e.target.value
        ),
      placeholder: field.placeholder,
      className: theme.input,
    };

    switch (field.type) {
      case "textarea":
        return <textarea {...commonProps} rows={4} />;
      case "select":
        return (
          <select {...commonProps}>
            <option value="">Select</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={!!value}
            onChange={commonProps.onChange}
            className={theme.input}
          />
        );
      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {field.type !== "checkbox" && (
        <label htmlFor={field.name} className={theme.label}>
          {field.label}
        </label>
      )}

      {field.type === "checkbox" ? (
        <div className="flex items-center gap-2">
          {renderInputElement()}
          <label htmlFor={field.name} className={theme.label}>
            {field.label}
          </label>
        </div>
      ) : (
        renderInputElement()
      )}

      {error && <span className={theme.error}>{error}</span>}
    </div>
  );
};
