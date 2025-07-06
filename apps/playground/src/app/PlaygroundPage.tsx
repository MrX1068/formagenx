"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { FormagenX } from "@formagenx/react";
import { saveAs } from "file-saver";

const defaultJson = `{
  "type": "object",
  "fields": [
    { "name": "name", "type": "text", "label": "Name", "required": true },
    { "name": "email", "type": "text", "label": "Email", "required": true },
    { "name": "age", "type": "number", "label": "Age", "required": false },
    { "name": "subscribe", "type": "checkbox", "label": "Subscribe?" }
  ]
}`;

export default function PlaygroundPage() {
  const [editorValue, setEditorValue] = useState(defaultJson);
  const [jsonSchema, setJsonSchema] = useState<any>(JSON.parse(defaultJson));
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleEditorChange = (value: string | undefined) => {
    setEditorValue(value || "");
    try {
      const parsed = JSON.parse(value || "");
      setJsonSchema(parsed);
    } catch {
      // ignore invalid JSON
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editorValue);
    alert("✅ JSON schema copied to clipboard");
  };

  const handleDownload = () => {
    const blob = new Blob([editorValue], { type: "application/json" });
    saveAs(blob, "form-schema.json");
  };

  return (
    <div className="flex h-screen overflow-hidden text-sm">
      {/* JSON Editor Panel */}
      <div className="w-1/2 border-r p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">🧠 JSON Schema Editor</h2>
          <div className="flex gap-2">
            <button
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              onClick={handleCopy}
            >
              📋 Copy
            </button>
            <button
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              onClick={handleDownload}
            >
              💾 Download
            </button>
          </div>
        </div>
        <Editor
          height="100%"
          defaultLanguage="json"
          value={editorValue}
          onChange={handleEditorChange}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            wordWrap: "on",
          }}
        />
      </div>

      {/* Live Form Preview Panel */}
      <div className="w-1/2 p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-2">📺 Live Preview</h2>
        {jsonSchema ? (
          <FormagenX
            schema={jsonSchema}
            theme="tailwind"
            onSubmit={(data) => setSubmittedData(data)}
          />
        ) : (
          <div className="text-gray-400 text-sm">
            Invalid JSON. Cannot render form.
          </div>
        )}

        {/* Form submission result */}
        {submittedData && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Submitted Data:
            </h3>
            <pre className="bg-gray-100 p-3 rounded text-xs">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
