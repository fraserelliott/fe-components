# fe-components

A lightweight collection of reusable React components, hooks, and providers with a flexible, theme-aware styling system.

Designed for use independently or alongside `@fraserelliott/fe-utilities` and `@fraserelliott/fe-slate`.

View the live demo at https://fraserelliott.github.io/fe-components/

---

## Overview

`fe-components` provides reusable UI components and application helpers without enforcing a particular visual design.

The library focuses on:

- **Reusability** – components that can be shared across different applications.
- **Customisation** – slot-based styling with inline styles and CSS classes.
- **Optional theming** – neutral defaults that can be replaced or extended by a theme.
- **Separation of concerns** – reusable component behaviour without application-specific business logic.
- **Composition** – smaller primitives that support more specialised components.

Components can be used with their default appearance, styled individually, or themed across an entire application.

---

## Installation

```bash
npm install @fraserelliott/fe-components
```

The library uses React and relies on the styling utilities provided by `@fraserelliott/fe-utilities`.

For the optional Slate dark theme:

```bash
npm install @fraserelliott/fe-slate
```

---

## Styling system

The styling system is built around `FEStyleProvider` and `useFEStyles`.

Each component defines its own default styles, while a theme or consuming application can override individual styling slots.

### FEStyleProvider

`FEStyleProvider` makes a theme available to descendant components.

```jsx
import { FEStyleProvider } from "@fraserelliott/fe-components";
import { feSlateTheme } from "@fraserelliott/fe-slate";
import "@fraserelliott/fe-slate/fe-slate.css";

function App() {
  return (
    <FEStyleProvider theme={feSlateTheme}>
      <MyApplication />
    </FEStyleProvider>
  );
}
```

The provider is optional. Without it, components use their own default styling.

### useFEStyles

`useFEStyles` composes component defaults, theme styles, consumer overrides, and local overrides.

```jsx
import { useFEStyles } from "@fraserelliott/fe-components";

function MyButton({
  children,
  style = {},
  className = {},
  noAnim = false,
}) {
  const defaultStyles = {
    inline: {
      BtnPrimary: {
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
      },
    },
    anim: {
      anim: {
        BtnPrimary: "my-button",
      },
    },
  };

  const { styleComponent } = useFEStyles(
    defaultStyles,
    style,
    className,
    noAnim
  );

  return (
    <button {...styleComponent("BtnPrimary")}>
      {children}
    </button>
  );
}
```

`styleComponent` returns an object containing `style` and `className`, ready to spread onto a React element.

### Styling slots

Components expose named styling slots corresponding to their internal elements or semantic roles.

For example, a modal's panel can be customised without affecting the rest of the component:

```jsx
<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  style={{
    Panel: {
      width: "400px",
      height: "300px",
    },
  }}
>
  Modal content
</Modal>
```

The `style` and `className` props are objects keyed by slot name, rather than ordinary single-element React style props.

### Style precedence

Inline styles are composed in the following order, with later values taking precedence:

1. Component default styles.
2. Static no-animation styles, when `noAnim` is enabled.
3. Theme inline styles.
4. Consumer-provided slot styles.
5. Local overrides supplied to `styleComponent`.

Styles are merged using `sx` from `fe-utilities`, supporting nested objects and property removal with `null`.

### Animations and interactive styling

Interactive appearance, including hover and active states, is handled through CSS classes.

Themes can replace a component's default animation classes for a particular slot, preventing conflicting CSS rules.

The `noAnim` option suppresses these classes and allows static appearance styles to be used instead.

### Theme structure

A theme uses the following structure:

```javascript
const theme = {
  inline: {
    Panel: {
      backgroundColor: "#1e293b",
      color: "#f1f5f9",
    },
  },
  anim: {
    anim: {
      BtnPrimary: "custom-button",
    },
    noAnim: {
      BtnPrimary: {
        backgroundColor: "#64748b",
      },
    },
  },
};
```

The `inline` section defines slot-based inline styles.

The `anim.anim` section defines interactive CSS classes, while `anim.noAnim` provides static styles for components using `noAnim`.

---

## Components

### ToastProvider, useToast and ToastMessageDisplay

A lightweight toast notification system for displaying temporary messages.

`ToastProvider` manages notification state and timing, `useToast` exposes the notification controls, and `ToastMessageDisplay` renders the active messages.

```jsx
import {
  ToastProvider,
  ToastMessageDisplay,
  useToast,
} from "@fraserelliott/fe-components";

function SaveButton() {
  const { addToastMessage } = useToast();

  return (
    <button
      onClick={() =>
        addToastMessage("Saved successfully", "success")
      }
    >
      Save
    </button>
  );
}

function App() {
  return (
    <ToastProvider fadeMs={150} defaultDelayMs={2350}>
      <SaveButton />
      <ToastMessageDisplay position="bottom-right" />
    </ToastProvider>
  );
}
```

`addToastMessage(message, type, delayMs)` creates a notification.

The `"success"` and `"error"` types receive dedicated styling. Other type strings use the default appearance.

`ToastMessageDisplay` supports:

- `position` – `"bottom-right"`, `"bottom-left"`, `"top-right"` or `"top-left"`.
- `direction` – `"column"` or `"column-reverse"`.
- `clearOnClick` – allows messages to be dismissed by clicking them.
- `style`, `className`, `noAnim` – styling controls.

---

### ActionList

A simple list component that delegates item rendering to the consumer.

It makes no assumptions about the structure of each item or what actions should be available.

```jsx
import { ActionList } from "@fraserelliott/fe-components";

<ActionList
  items={tasks}
  getKey={(task) => task.id}
  renderItem={(task) => (
    <label>
      <input type="checkbox" checked={task.complete} readOnly />
      {task.title}
    </label>
  )}
/>
```

The component renders a list using the supplied `renderItem` function.

Use `ActionList` when the content or behaviour of each list item is application-specific.

---

### ActionTable

A configurable table component for displaying structured data with optional row actions.

```jsx
import { ActionTable } from "@fraserelliott/fe-components";

<ActionTable
  items={people}
  getKey={(person) => person.id}
  columns={[
    { field: "firstName", label: "First name" },
    { field: "surname", label: "Surname" },
    {
      field: "dob",
      label: "Date of birth",
      renderItem: (person) =>
        new Date(person.dob).toLocaleDateString(),
    },
  ]}
  actions={[
    {
      key: "delete",
      label: "Delete",
      buttonStyleSlot: "BtnDanger",
      onAction: (person) => deletePerson(person.id),
    },
  ]}
/>
```

**Key props:**

- `items` – array of records to display.
- `getKey` – returns a unique key for each record.
- `columns` – defines fields, headings, and optional custom renderers.
- `actions` – defines buttons and callbacks for each row.
- `separateActionColumns` – displays actions in individual columns instead of grouping them.
- `showHeadersWhenEmpty` – controls whether headers remain visible with no data.
- `style`, `className` – slot-based styling overrides.

Column renderers receive the complete item, allowing derived values and custom cell content.

Actions can specify a styling slot such as `BtnPrimary` or `BtnDanger`.

---

### ApiProvider and useApi

A small API request abstraction providing consistent success handling, error handling, and optional centralised HTTP 401 handling.

```jsx
import {
  ApiProvider,
  useApi,
} from "@fraserelliott/fe-components";

function App() {
  return (
    <ApiProvider
      onError={(err, fallbackMsg) => {
        console.error(
          err?.response?.data?.error ??
          err?.message ??
          fallbackMsg
        );
      }}
      onUnauthorised={(err) => {
        // Application-specific authentication handling
      }}
    >
      <MyApplication />
    </ApiProvider>
  );
}
```

The provider exposes two request helpers.

**runApiCallback**

Executes an API request and optionally invokes success or error callbacks.

```javascript
const { runApiCallback } = useApi();

await runApiCallback(
  api.get("/items"),
  (data) => setItems(data),
  "Failed to load items"
);
```

Signature:

```javascript
runApiCallback(promise, onSuccess, fallbackMsg, onErrorOverride)
```

Returns response data on success or `null` on a handled request failure.

**runApiTransform**

Executes a request and returns either the response data or a transformed result.

```javascript
const { runApiTransform } = useApi();

const items = await runApiTransform(
  api.get("/items"),
  (data) => data.items,
  (err) => []
);
```

Signature:

```javascript
runApiTransform(
  promise,
  successTransform,
  errorTransform,
  handleUnauthorised = true
)
```

Without transforms, it returns the response data on success or the original error on failure.

When `onUnauthorised` is provided, HTTP 401 responses take precedence over normal error handling. This can be disabled for individual `runApiTransform` calls by passing `false` as the fourth argument.

The provider does not depend on a particular HTTP client, toast system, or authentication implementation. Its request helpers expect promises resolving to objects containing a `data` property, such as Axios responses.

---

### FloatingPanel

A reusable floating container with optional overlay, focus trapping, and dismissal behaviour.

It acts as a foundation for higher-level components such as `Modal` and `ConfirmDialog`.

```jsx
import { FloatingPanel } from "@fraserelliott/fe-components";

<FloatingPanel
  open={isOpen}
  onOpenChange={setIsOpen}
  overlay="blur"
  trapFocus
  closeOnEscape
  closeOnOverlayClick
>
  <p>Floating panel content</p>
</FloatingPanel>
```

**Key props:**

- `open` – controls visibility.
- `onOpenChange` – receives requested visibility changes.
- `overlay` – `false`, `true`, or `"blur"`.
- `trapFocus` – keeps keyboard focus within the panel.
- `closeOnEscape` – allows Escape to request closure.
- `closeOnOverlayClick` – allows clicking outside the panel to request closure.
- `style`, `className`, `defaultStyle`, `noAnim` – styling controls.

Use `FloatingPanel` when you need the underlying floating-container behaviour without the additional structure of a dialog.

---

### ConfirmDialog

A confirmation dialog built on `FloatingPanel`, supporting asynchronous confirmation and cancellation callbacks.

```jsx
import { ConfirmDialog } from "@fraserelliott/fe-components";

<ConfirmDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  heading="Delete item?"
  text="This action cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  onConfirm={async () => {
    await deleteItem();
  }}
  onCancel={() => {
    setShowConfirm(false);
  }}
/>
```

**Key props:**

- `open`, `onOpenChange` – visibility control.
- `heading`, `text` – dialog content.
- `confirmLabel`, `cancelLabel` – button labels.
- `onConfirm`, `onCancel` – action callbacks.
- `overlay`, `trapFocus` – overlay and focus behaviour.
- `closeOnEscape`, `closeOnOverlayClick` – optional dismissal behaviour.
- `style`, `className`, `noAnim` – styling controls.

Callbacks can return promises, allowing the dialog to handle asynchronous operations.

---

### Modal

A general-purpose modal dialog built on `FloatingPanel`.

It provides a heading, content area, and configurable close controls.

```jsx
import { Modal } from "@fraserelliott/fe-components";

<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  heading="Edit item"
  showCloseButtons="both"
>
  <EditForm />
</Modal>
```

**Key props:**

- `open`, `onOpenChange` – visibility control.
- `heading` – modal heading.
- `children` – modal body content.
- `showCloseButtons` – `"corner"`, `"bottom"`, `"both"`, or `false`.
- `disableCloseButtons` – disables the close controls.
- `overlay`, `trapFocus` – overlay and focus behaviour.
- `closeOnEscape`, `closeOnOverlayClick` – optional dismissal behaviour.
- `style`, `className`, `noAnim` – styling controls.

Use `Modal` for forms, detailed content, and other interactions requiring a dedicated overlay.

---

### FocusManagerProvider and useFocusManager

Provides shared focus management for components that need to trap keyboard focus.

It is particularly useful for modal interfaces, including nested dialogs.

The focus manager supports registering focus-trapped elements, handling the active focus trap, and restoring focus when an element is dismissed.

```jsx
import { FocusManagerProvider } from "@fraserelliott/fe-components";

function App() {
  return (
    <FocusManagerProvider>
      <MyApplication />
    </FocusManagerProvider>
  );
}
```

The `useFocusManager` hook exposes the focus management functionality to components within the provider.

Components such as `FloatingPanel` can use this functionality when `trapFocus` is enabled.

---

### OptionalPortal

A small utility component for conditionally rendering content through a React portal.

Useful when a component should sometimes render outside its normal DOM hierarchy without requiring separate implementations.

It can be used to support overlays and other UI elements that need to escape ancestor layout or stacking constraints.

---

## Recommended provider setup

For applications using theming, focus management, API helpers, and toast notifications, the providers can be composed near the application root.

```jsx
import {
  FEStyleProvider,
  FocusManagerProvider,
  ToastProvider,
  ToastMessageDisplay,
  ApiProvider,
} from "@fraserelliott/fe-components";

import { feSlateTheme } from "@fraserelliott/fe-slate";
import "@fraserelliott/fe-slate/fe-slate.css";

function Root() {
  return (
    <FEStyleProvider theme={feSlateTheme}>
      <FocusManagerProvider>
        <ToastProvider>
          <ApiProvider>
            <App />
          </ApiProvider>
          <ToastMessageDisplay />
        </ToastProvider>
      </FocusManagerProvider>
    </FEStyleProvider>
  );
}
```

Only include the providers required by your application.

For the Slate theme's application-wide background and typography, the `fes-app` class can also be applied to the document body.

---

## Related packages

| Package | Purpose |
|---|---|
| `@fraserelliott/fe-utilities` | JavaScript style composition and structural layout utilities |
| `@fraserelliott/fe-slate` | Dark theme tokens, CSS classes, and `feSlateTheme` |
| `@fraserelliott/fe-components` | React components, providers, hooks, and styling integration |

The packages are designed to complement one another while retaining distinct responsibilities.

---

## Design philosophy

`fe-components` aims to provide reusable behaviour without forcing application-specific decisions.

Components define sensible defaults but expose configuration for appearance and interaction.

The styling system separates component structure, theme appearance, and consumer overrides so that the same components can be reused across projects with different visual identities.

The library deliberately avoids becoming a complete application framework or state-management solution.

---

## Summary

`fe-components` provides a collection of reusable React building blocks, including:

- Toast notifications and dialogs.
- Flexible lists and tables.
- API request helpers.
- Floating panels and focus management.
- Conditional portals.
- A shared, slot-based styling system.

Use components individually with their defaults, customise them through their styling slots, or apply a shared theme with `FEStyleProvider`.