import {
  Modal,
  OptionalPortal,
  useFEStyles,
  defaultStyles,
  ConfirmDialog,
} from "@fraserelliott/fe-components";
import { useState } from "react";
import { utilities, sx } from "@fraserelliott/fe-utilities";

export function ModalPage() {
  const [showModal, setShowModal] = useState(false);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [showCloseButtons, setShowCloseButtons] = useState(false);
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(false);
  const [overlay, setOverlay] = useState("blur");
  const [draggable, setDraggable] = useState(true);
  const { styleComponent } = useFEStyles(defaultStyles);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div {...styleComponent("Panel", utilities["fe-gap-2"])}>
      <div style={sx(utilities["fe-d-flex"], utilities["fe-justify-center"])}>
        <label>Draggable</label>
        <input
          type="checkbox"
          onChange={(e) => setDraggable(e.target.checked)}
          checked={draggable}
        />
      </div>

      <div style={sx(utilities["fe-d-flex"], utilities["fe-justify-center"])}>
        <label>Close on escape</label>
        <input
          type="checkbox"
          onChange={(e) => setCloseOnEscape(e.target.checked)}
          checked={closeOnEscape}
        />
      </div>

      <div className="fe-d-flex fe-justify-center">
        <label>Close on overlay click</label>
        <input
          type="checkbox"
          onChange={(e) => setCloseOnOverlayClick(e.target.checked)}
          checked={closeOnOverlayClick}
        />
      </div>

      <div className="fe-d-flex fe-justify-center">
        <label htmlFor="overlay">Overlay</label>
        <select
          id="overlay"
          value={String(overlay)}
          onChange={(e) =>
            setOverlay(
              e.target.value === "true"
                ? true
                : e.target.value === "false"
                  ? false
                  : e.target.value,
            )
          }
        >
          <option value="false">False</option>
          <option value="true">True</option>
          <option value="blur">Blur</option>
        </select>
      </div>

      <div className="fe-d-flex fe-justify-center">
        <label htmlFor="close-buttons">Show close button</label>
        <select
          id="close-buttons"
          value={String(showCloseButtons)}
          onChange={(e) =>
            setShowCloseButtons(
              e.target.value === "false" ? false : e.target.value,
            )
          }
        >
          <option value="false">False</option>
          <option value="corner">Corner</option>
          <option value="bottom">Bottom</option>
          <option value="both">Both</option>
        </select>
      </div>

      <button
        onClick={() => setShowModal(true)}
        {...styleComponent("BtnPrimary")}
      >
        Open Modal
      </button>

      <OptionalPortal portalTarget={document.body}>
        <Modal
          open={showModal}
          onOpenChange={setShowModal}
          heading="Modal Demo"
          closeOnOverlayClick={closeOnOverlayClick}
          closeOnEscape={closeOnEscape}
          showCloseButtons={showCloseButtons}
          overlay={overlay}
          style={{ Panel: { width: "400px", height: "300px" } }}
          draggable={draggable}
        >
          <p>Modal Text</p>
          <button
            {...styleComponent("BtnPrimary")}
            onClick={() => alert("Look at me!")}
          >
            I'm Mr Meeseeks
          </button>

          <button
            {...styleComponent("BtnPrimary")}
            onClick={() => setShowDialog(true)}
          >
            Open confirm dialog
          </button>
        </Modal>
      </OptionalPortal>

      <OptionalPortal portalTarget={document.body}>
        <ConfirmDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          onConfirm={() => setShowDialog(false)}
          onCancel={() => setShowDialog(false)}
          heading="Nested Confirm Dialog Demo"
          text="Select option."
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
