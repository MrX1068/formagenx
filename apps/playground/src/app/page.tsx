"use client";

import { FormagenX } from "@formagenx/react";

import { z } from "zod";
import PlaygroundPage from "./PlaygroundPage";

const CustomTextField = ({ field, value, onChange, error }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-green-600 font-semibold">{field.label} 🌟</label>
      <input
        type="text"
        className="border border-green-400 px-3 py-2 rounded"
        placeholder={field.placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  bio: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, "Must accept terms"),
});

export default function Home() {
  const schema = {
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        defaultValue: "MrX",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        defaultValue: "bhuvi@example.com",
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        required: true,
        defaultValue: "india",
        options: [
          { label: "India", value: "india" },
          { label: "USA", value: "usa" },
          { label: "UK", value: "uk" },
        ],
      },

      {
        name: "terms",
        label: "I accept terms",
        type: "checkbox",
        required: true,
        defaultValue: true,
      },
    ],
  };

  return (
    <PlaygroundPage />
    // <div className="max-w-md mx-auto p-4">
    //   <formagenx
    //     // zodSchema={userSchema}
    //     // theme="tailwind"
    //     theme={{
    //       label: "text-blue-900 font-bold",
    //       input: "border border-blue-400 rounded-md px-3 py-2",
    //       button: "bg-indigo-700 text-white rounded",
    //     }}
    //     schema={schema}
    //     layout="stacked"
    //     onSubmit={(data) => console.log("✅ Data:", data)}
    //     onError={(err) => console.log("❌ Errors:", err)}
    //     // components={{ text: CustomTextField }}
    //   />

    //   <button className="bg-blue-600">tet</button>
    // </div>
  );
}
