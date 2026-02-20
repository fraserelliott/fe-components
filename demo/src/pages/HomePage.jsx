import { NavLink } from "react-router-dom";
import { UI } from "@styles";

export function HomePage() {
  return (
    <div
      className={UI.Panel("fec-home-panel fe-d-flex fe-flex-column fe-gap-2")}
    >
      <h1 className={UI.Heading()}>fe-components demo</h1>
      <p>
        Welcome to the demo of fe-components. These demos showcase a small set
        of reusable UI components built with utility-class composition and
        simple override patterns. Defaults aim to be neutral and functional
        while keeping restyling straightforward.
      </p>
      <NavLink to="/toast">
        <h1 className={UI.Heading()}>Toast</h1>
      </NavLink>
      <p>
        A lightweight notification system for transient feedback messages.
        Supports multiple message types (neutral, success, error), stacking,
        fade-out animations, and easy styling overrides via utility classes.
        Designed to be simple to integrate while remaining visually neutral by
        default.
      </p>
      <NavLink to="/confirmdialog">
        <h1 className={UI.Heading()}>ConfirmDialog</h1>
      </NavLink>
      <p>
        A flexible modal dialog component for confirmation flows. Provides
        structured callbacks (onConfirm, onCancel, onOpenChange, onError) with
        sensible default styling and layout. Built to be easily restyled while
        maintaining predictable behaviour and accessibility-friendly structure.
      </p>
      <h1 className={UI.Heading()}>OptionalPortal</h1>
      <p>
        A small utility wrapper that conditionally renders children inside a
        React portal. Used internally by components like Toast and ConfirmDialog
        to avoid layout and stacking issues while still allowing consumers to
        control whether a portal is used.
      </p>
    </div>
  );
}
