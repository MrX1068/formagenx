import React, { useState } from "react";
import { z, ZodObject } from "zod";
import { FormagenXSchema, FormagenXField, FieldType } from "../types/schema";
import { FieldRenderer } from "./FieldRenderer";
import { parseZodToSchema } from "../utils/parseZod";
import { FieldRendererProps } from "../types/field";
import { FormagenXTheme } from "../types/theme";
import { THEMES } from "../themes";

interface FormagenXProps {
  schema?: FormagenXSchema;
  zodSchema?: ZodObject<any>;
  layout?: "stacked" | "grid";
  onSubmit?: (data: Record<string, any>) => void;
  onError?: (errors: Record<string, string>) => void;
  components?: Partial<Record<FieldType, React.FC<FieldRendererProps>>>;
  theme?: string | Partial<FormagenXTheme>
}

export const FormagenX: React.FC<FormagenXProps> = ({
  zodSchema,
  schema,
  layout = "stacked",
  onSubmit,
  onError,
  components,
  theme = "default",
}) => {
  const effectiveSchema: FormagenXSchema | undefined = zodSchema
    ? parseZodToSchema(zodSchema)
    : schema;

  if (!effectiveSchema) {
    return <div>No schema provided</div>;
  }

  const initialData: Record<string, any> = {};
  effectiveSchema.fields.forEach((field) => {
    initialData[field.name] = field.defaultValue ?? "";
  });

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resolvedTheme: FormagenXTheme = {
  ...THEMES.default,
  ...(typeof theme === 'string' ? THEMES[theme] || {} : theme),
}

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    for (const field of effectiveSchema.fields) {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (zodSchema) {
      const result = zodSchema.safeParse(formData);
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path.length) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
        onError?.(newErrors);
        return;
      }

      onSubmit?.(result.data);
    } else {
      // Fallback to required check only
      const newErrors: Record<string, string> = {};
      for (const field of effectiveSchema.fields) {
        if (field.required && !formData[field.name]) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        onError?.(newErrors);
      } else {
        onSubmit?.(formData);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={resolvedTheme.form}
      // className={
      //   layout === "grid" ? "grid grid-cols-2 gap-4" : "flex flex-col gap-4"
      // }
    >
      {effectiveSchema.fields.map((field) => {
        const CustomComponent = components?.[field.type];

        return CustomComponent ? (
          <CustomComponent
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={(val) => handleChange(field.name, val)}
            error={errors[field.name]}
          />
        ) : (
          <FieldRenderer
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={(val) => handleChange(field.name, val)}
            error={errors[field.name]}
            theme={resolvedTheme}
          />
        );
      })}

      <button
        type="submit"
         className={resolvedTheme.button}
        // className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};
