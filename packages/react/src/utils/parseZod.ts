import { z, ZodObject } from "zod";
import { FormagenXField, FormagenXSchema } from "../types/schema";

export function parseZodToSchema(zodSchema: ZodObject<any>): FormagenXSchema {
  const shape = zodSchema.shape;
  const fields: FormagenXField[] = [];

  for (const key in shape) {
    const def = shape[key];
    const defType = def._def.typeName;

    const field: FormagenXField = {
      name: key,
      label: key[0].toUpperCase() + key.slice(1),
      type: getFieldType(defType),
      required: !def.isOptional(),
    };

    fields.push(field);
  }

  return { fields };
}

function getFieldType(typeName: string): FormagenXField["type"] {
  switch (typeName) {
    case "ZodString":
      return "text";
    case "ZodNumber":
      return "number";
    case "ZodBoolean":
      return "checkbox";
    default:
      return "text";
  }
}
