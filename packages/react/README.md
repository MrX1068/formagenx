# 🔥 formagenx

**The most powerful schema-driven React form builder.**

Build production-ready forms in minutes with zero boilerplate. Powered by Zod validation and fully customizable themi- 🧪 Test form submission

```tsx
<FormagenX zodSchema={userSchema} theme="tailwind" onSubmit={handleSubmit} />
```

## ✨ Why formagenx?

- **🚀 Zero Configuration** — Drop in a Zod schema and get a working form
- **🎨 Beautiful by Default** — Pre-built themes for Tailwind CSS and Bootstrap
- **⚡ Type-Safe** — Full TypeScript support with automatic inference
- **🔧 Completely Customizable** — Override any component or style
- **� Responsive** — Mobile-first design that works everywhere
- **🧪 Battle-Tested** — Production-ready with comprehensive validation

## 📦 Installation

```bash
npm install @FormagenX/react zod
# or
pnpm add @FormagenX/react zod
# or
yarn add @FormagenX/react zod
```

## ⚡ Quick Start

### With Zod Schema (Recommended)

```tsx
import { FormagenX } from '@FormagenX/react'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be 18 or older'),
  newsletter: z.boolean().optional()
})

function App() {
  const handleSubmit = (data: z.infer<typeof userSchema>) => {
    console.log('Form submitted:', data)
    // Handle your form submission
  }

  const handleError = (errors: Record<string, string>) => {
    console.error('Validation errors:', errors)
  }

  return (
    <FormagenX
      zodSchema={userSchema}
      theme="tailwind"
      onSubmit={handleSubmit}
      onError={handleError}
    />
  )
}
```

### With JSON Schema

```tsx
import { FormagenX } from '@FormagenX/react'

const jsonSchema = {
  type: 'object',
  fields: [
    { 
      name: 'name', 
      type: 'text', 
      label: 'Full Name', 
      required: true,
      placeholder: 'Enter your name'
    },
    { 
      name: 'email', 
      type: 'email', 
      label: 'Email Address', 
      required: true 
    },
    { 
      name: 'subscribe', 
      type: 'checkbox', 
      label: 'Subscribe to newsletter' 
    }
  ]
}

function App() {
  return (
    <FormagenX
      schema={jsonSchema}
      theme="bootstrap"
      onSubmit={(data) => console.log('Submitted:', data)}
    />
  )
}
```

## 🎨 Theming & Customization

### Built-in Themes

```tsx
// Tailwind CSS theme (default)
<FormagenX zodSchema={schema} theme="tailwind" />

// Bootstrap theme
<FormagenX zodSchema={schema} theme="bootstrap" />
```

### Custom Theme

```tsx
<FormagenX
  zodSchema={schema}
  theme={{
    form: "max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg",
    label: "block text-sm font-semibold text-gray-800 mb-2",
    input: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500",
    error: "text-red-600 text-sm mt-1",
    button: "w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-md hover:opacity-90 transition-opacity"
  }}
/>
```

### Custom Components

```tsx
import { FieldRendererProps } from '@FormagenX/react'

const CustomInput: React.FC<FieldRendererProps> = ({ field, value, onChange, error }) => (
  <div className="my-custom-field">
    <label>{field.label}</label>
    <input 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className={error ? 'error' : ''}
    />
    {error && <span className="error">{error}</span>}
  </div>
)

<FormagenX
  zodSchema={schema}
  components={{
    text: CustomInput,
    email: CustomInput
  }}
/>
```

## 📋 API Reference

### FormagenX Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `zodSchema` | `ZodObject<any>` | - | Zod schema for validation and form generation |
| `schema` | `FormagenXSchema` | - | JSON schema object (alternative to zodSchema) |
| `theme` | `string \| Partial<FormagenXTheme>` | `"default"` | Theme name or custom theme object |
| `layout` | `"stacked" \| "grid"` | `"stacked"` | Form layout style |
| `onSubmit` | `(data: any) => void` | - | Called when form is successfully submitted |
| `onError` | `(errors: Record<string, string>) => void` | - | Called when validation errors occur |
| `components` | `Partial<Record<FieldType, React.FC>>` | - | Custom field component overrides |

### Supported Field Types

- `text` - Text input
- `email` - Email input with validation
- `password` - Password input
- `number` - Number input
- `textarea` - Multi-line text
- `select` - Dropdown selection
- `checkbox` - Boolean checkbox
- `radio` - Radio button group
- `date` - Date picker

## 🎮 Try the Playground

Experience FormagenX in action with our interactive playground:

**🔗 [https://FormagenX.vercel.app](https://FormagenX.vercel.app)**

- ✨ Live schema editor with Monaco
- 👀 Real-time form preview
- 🎨 Theme switching
- 📋 Copy/export generated code
- 🧪 Test form submission

🛠️ Custom Fields (Coming Soon)
We’re working on a plugin system to allow fully custom field renderers and complex layouts.

## � Roadmap

- [x] **Core Form Generation** - JSON & Zod schema support
- [x] **Theming System** - Built-in and custom themes  
- [x] **Interactive Playground** - Live editor and preview
- [ ] **Advanced Validation** - Custom validators and async validation
- [ ] **Conditional Logic** - Show/hide fields based on values
- [ ] **Multi-step Forms** - Wizard-style form flows
- [ ] **Drag & Drop Builder** - Visual form designer
- [ ] **Field Plugins** - Rich text, file upload, date ranges
- [ ] **AI Integration** - Generate forms from natural language

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## � License

MIT License - see [LICENSE](LICENSE) for details.

---



**Made with ❤️ by the FormagenX team**

[⭐ Star on GitHub](https://github.com/FormagenX/FormagenX) • [🐛 Report Bug](https://github.com/FormagenX/FormagenX/issues) • [💡 Request Feature](https://github.com/FormagenX/FormagenX/issues)

