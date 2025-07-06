import { tailwindTheme } from "./tailwind";
import { FormagenXTheme } from "../types/theme";
import { bootstrapTheme } from "./bootstrap";

export const THEMES: Record<string, FormagenXTheme> = {
  default: tailwindTheme,
  tailwind: tailwindTheme,
  bootstrap: bootstrapTheme,
};
