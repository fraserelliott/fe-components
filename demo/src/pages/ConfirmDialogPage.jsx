import {
  ConfirmDialog,
  OptionalPortal,
  useFEStyles,
  defaultStyles,
} from "@fraserelliott/fe-components";
import { useState } from "react";

function formatDateTime(date) {
  const d = new Date(date);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
}

export function ConfirmDialogPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [eventLog, setEventLog] = useState([]);
  const { styleComponent } = useFEStyles(defaultStyles);

  const log = (message) =>
    setEventLog((prev) => [...prev, { time: new Date(), message }]);

  const onOpenChange = (isOpen, reason) => {
    log(`onOpenChange() called, isOpen=${isOpen}, reason=${reason}`);
    setShowDialog(isOpen);
  };

  const onConfirm = () => {
    log("onConfirm() called");
  };

  const onCancel = () => {
    log("onCancel() called");
  };

  const onError = (err) => {
    log(`onError() called, err={ source: ${err.source}, err: ${err.err}`);
  };

  return (
    <div {...styleComponent("Panel", { alignItems: "center", gap: "1em" })}>
      <button
        {...styleComponent("BtnPrimary", { width: "10rem" })}
        onClick={() => setShowDialog(true)}
      >
        Open Dialog
      </button>

      <ul style={{ listStyle: "none" }}>
        {eventLog.map((event, index) => {
          return (
            <li key={index}>
              {formatDateTime(event.time)} - {event.message}
            </li>
          );
        })}
      </ul>

      <OptionalPortal portalTarget={document.body}>
        <ConfirmDialog
          open={showDialog}
          onOpenChange={onOpenChange}
          onConfirm={onConfirm}
          onCancel={onCancel}
          onError={onError}
          heading="Confirm Dialog Demo"
          text="Select option to add to log."
          cancelLabel="NO!"
          confirmLabel="Okay then"
          closeOnEscape
          overlay={false}
          draggable
        />
      </OptionalPortal>
    </div>
  );
}
