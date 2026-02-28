# fe-components

A small set of reusable UI components designed to work cleanly with a utility-class workflow.

- Neutral, functional defaults
- Simple override patterns for styling
- Designed to be easy to integrate in real projects (and easy to restyle)

## Install

```bash
npm i @fraserelliott/fe-components
```

> If your project uses React, you’ll obviously need `react` and `react-dom` installed already.

## Compatibility / Notes

This library is tested primarily with:

- React (Vite + React Router)
- JavaScript / JSX
- Utility-class styling (e.g. `fe-*` utilities)

It should work fine in other React setups too. If something behaves unexpectedly in your stack, please raise an issue with a minimal repro.

## Demo

A live demo showcasing the available components, default styling, and typical integration patterns is available here:

👉 **[View Demo](https://fraserelliott.github.io/fe-components/)**

The demo uses the library exactly as it would be used in a real project with the default styles. It’s intended to serve as:

- a reference implementation
- a quick way to explore the components before integrating them
- a baseline for testing style overrides locally if you want to experiment

### Portals and SSR

Some components are designed to work well with portals (e.g. rendering to `document.body`).
If you are using SSR/SSG, avoid accessing `document` during server render — pass the portal target only on the client (or guard it with `typeof document !== "undefined"`).

## Styling and Overrides

Most components accept a `style` prop which is a map of **named style slots** (e.g. `Panel`, `Heading`, etc).

Each slot can be **one of two things**:

1. A **string** of class names (including template literals / expressions)
2. A **zero-argument function** that returns a string

Why allow functions? Mostly ergonomics: it makes composing and reusing style helpers easier without needing to remember `()` everywhere.

---

### One-off overrides

Override a single part of a component without needing to rewrite the full default styling:

```jsx
<ConfirmDialog
  style={{
    BtnConfirm: "fe-fw-bold",
    Heading: "fe-fs-lg",
  }}
/>
```

### Composable overrides with `cx`

This library pairs naturally with my utility-class library [fe-utilities](https://github.com/fraserelliott/fe-utilities), which explains the styling approach in more detail. It isn’t required, but the components are designed with that workflow in mind.

If you prefer a “single source of styles” for your project, define an appearance object using the same slot names as the components. Anything unused is simply ignored.

**Tip:** Keep layout and appearance conceptually separate. Defaults provide layout; your overrides usually provide colours, borders, shadows, and typography.

Example:

```js
// app/styles/appearance.js
export const appAppearance = {
  Panel: "app-bg app-shadow app-radius",
  BtnSuccess: "app-btn app-btn-confirm",
  BtnDanger: "app-btn app-btn-cancel",
};
```

Then in your component usage:

```jsx
<ConfirmDialog style={appAppearance} />
```

You can also create component-specific “skins” if needed, but many projects work well with a single shared appearance object.

The library defaults aim to be neutral and predictable.
Overrides exist so you can match your own branding without fighting the component internals.

---

## 🎨 Theming Tokens

All visual aspects of `fe-components` can be customised by overriding the following CSS variables If not defined, the values below are used as fallbacks.

```css
:root {
  --fec-bg-primary: #111;
  --fec-text-primary: #eee;
  --fec-confirm: #00c853;
}
```

---

### Backgrounds

| Variable             | Default   | Used For                |
| -------------------- | --------- | ----------------------- |
| `--fec-bg-primary`   | `#f6f6f3` | Primary app background  |
| `--fec-bg-secondary` | `#ecece7` | Secondary surface       |
| `--fec-bg-panel`     | `#ffffff` | Panel / card background |
| `--fec-bg-active`    | `#cfd8e3` | Hover / active states   |

---

### Text

| Variable               | Default   | Used For   |
| ---------------------- | --------- | ---------- |
| `--fec-text-primary`   | `#1f1f1f` | Main text  |
| `--fec-text-secondary` | `#5a5a5a` | Muted text |

---

### Semantic Colours

| Variable        | Default   | Used For                  |
| --------------- | --------- | ------------------------- |
| `--fec-confirm` | `#4caf50` | Success / confirm actions |
| `--fec-danger`  | `#d9534f` | Danger / error actions    |

---

### Borders

| Variable             | Default   | Used For              |
| -------------------- | --------- | --------------------- |
| `--fec-border-width` | `1px`     | Default border width  |
| `--fec-border-style` | `solid`   | Default border style  |
| `--fec-border-color` | `#d6d6d0` | Default border colour |

---

### Shadows

| Variable              | Default                                                   |
| --------------------- | --------------------------------------------------------- |
| `--fec-shadow-soft`   | `0 1px 2px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.06)`  |
| `--fec-shadow-medium` | `0 4px 8px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06)` |

---

### Toast Positioning

| Variable              | Default | Used For                      |
| --------------------- | ------- | ----------------------------- |
| `--fec-toast-inset-x` | `1rem`  | Horizontal distance from edge |
| `--fec-toast-inset-y` | `3rem`  | Vertical distance from edge   |

---

### Dialog Sizing

| Variable         | Default                     |
| ---------------- | --------------------------- |
| `--fec-dialog-w` | `clamp(300px, 60vw, 400px)` |
| `--fec-dialog-h` | `clamp(200px, 60vh, 300px)` |

---

### Modal Sizing

| Variable        | Default                      |
| --------------- | ---------------------------- |
| `--fec-modal-w` | `clamp(320px, 80vw, 1536px)` |
| `--fec-modal-h` | `clamp(240px, 80vh, 864px)`  |

---

## Components

### OptionalPortal

A tiny utility wrapper that conditionally renders children inside a React portal.

Useful when a component _can_ use a portal (to avoid stacking / z-index issues), but you want consumers to control it.

**Example:**

```jsx
import { OptionalPortal } from "@fraserelliott/fe-components";

<OptionalPortal portalTarget={document.body}>
  <div>Rendered in document.body</div>
</OptionalPortal>;
```

If you don’t provide a portal target, it behaves like a normal wrapper (renders in place).

---

### Toast

A lightweight notification system for transient feedback messages. Uses React context so messages can be triggered from anywhere in your app.

Supports:

- multiple toast types (e.g. neutral / success / error)
- stacking
- fade-out
- styling overrides via named style slots

**Typical setup:**

1. Add ToastProvider near the root of your app.

```jsx
import { ToastProvider } from "@fraserelliott/fe-components";

<ToastProvider>
  <App />
</ToastProvider>;
```

2. Render the display (often in a portal):

```jsx
import {
  OptionalPortal,
  ToastMessageDisplay,
} from "@fraserelliott/fe-components";

<OptionalPortal portalTarget={document.body}>
  <ToastMessageDisplay />
</OptionalPortal>;
```

3. Trigger toasts via the toast API exposed by the library.

```js
import { useToast } from "@fraserelliott/fe-components";

const { addToastMessage } = useToast();
addToastMessage("Saved successfully", "success");
addToastMessage("Something went wrong", "error", 2000);
```

---

### ConfirmDialog

A flexible modal dialog component for confirmation flows.

Provides structured callbacks such as:

- `onConfirm`
- `onCancel`
- `onOpenChange`
- `onError`

Designed to be:

- neutral by default
- easy to restyle
- predictable in behaviour

**Example:**

```jsx
import { ConfirmDialog, OptionalPortal } from "@fraserelliott/fe-components";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  const onOpenChange = (isOpen, reason) => {
    setOpen(isOpen);
    // optionally log reason
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>

      <OptionalPortal portalTarget={document.body}>
        <ConfirmDialog
          open={open}
          onOpenChange={onOpenChange}
          onConfirm={() => console.log("confirm")}
          onCancel={() => console.log("cancel")}
          onError={(err) => console.log("error", err)}
          heading="Confirm Dialog Demo"
          text="Select option to add to log."
        />
      </OptionalPortal>
    </>
  );
}
```

---

## Modal

A flexible container component for rendering custom modal content.

Unlike `ConfirmDialog`, `Modal` is unopinionated and simply renders children inside an overlay panel. It is designed to be:

- composable
- predictable
- neutral by default
- easy to restyle via `style` overrides

### Features

- Controlled open state via `open` + `onOpenChange`
- Optional backdrop click closing
- Optional Escape key closing
- Optional persistent mounting via `keepMounted`
- Fully custom content via `children`

---

### Props

| Prop                   | Type                        | Default     | Description                            |
| ---------------------- | --------------------------- | ----------- | -------------------------------------- |
| `open`                 | `boolean`                   | —           | Controls whether the modal is visible  |
| `onOpenChange`         | `(isOpen: boolean) => void` | —           | Called when modal requests to close    |
| `heading`              | `string`                    | `undefined` | Optional heading text                  |
| `closeOnEscape`        | `boolean`                   | `true`      | Closes modal when Escape is pressed    |
| `closeOnBackdropClick` | `boolean`                   | `true`      | Closes modal when clicking the overlay |
| `keepMounted`          | `boolean`                   | `false`     | Keeps modal mounted when closed        |
| `style`                | `object`                    | —           | Optional style override object         |
| `children`             | `ReactNode`                 | —           | Custom modal content                   |

---

### Example

```jsx
import { Modal, OptionalPortal } from "@fraserelliott/fe-components";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <OptionalPortal portalTarget={document.body}>
        <Modal
          open={open}
          onOpenChange={setOpen}
          heading="Modal Demo"
          closeOnEscape
          closeOnBackdropClick
        >
          <p>This content is fully custom.</p>
          <input placeholder="Focusable input" />
        </Modal>
      </OptionalPortal>
    </>
  );
}
```

---

### Behaviour Notes

- Clicking inside the panel will not close the modal.
- Backdrop clicks only close when `closeOnBackdropClick` is `true`.
- Escape only closes when `closeOnEscape` is `true`.
- `keepMounted` prevents unmounting when closed (useful for preserving internal state).

---

### When to Use

Use `Modal` when you need:

- fully custom layouts
- forms inside a dialog
- multi-step flows
- reusable modal shells

Use `ConfirmDialog` when you need:

- structured confirm/cancel behaviour
- consistent confirmation flows
- built-in intent handling

---

## Reporting issues

If something doesn’t work as expected, please open an issue with:

- your React version
- your bundler (Vite / Webpack / etc.)
- a minimal reproducible example

---

## License

MIT
