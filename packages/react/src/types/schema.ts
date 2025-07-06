export type FieldType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "textarea"
  | "checkbox"
  | "select";

export interface FormagenXField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: string }[]; // for select
}

export interface FormagenXSchema {
  fields: FormagenXField[];
}
