import { FormagenXField } from "./schema";

export interface FieldRendererProps {
  field: FormagenXField;
  value?: any;
  onChange: (val: any) => void;
  error?: string;
}
