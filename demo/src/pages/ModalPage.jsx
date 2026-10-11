import { Modal, OptionalPortal } from "@fraserelliott/fe-components";
import { UI } from "@styles";
import { useState } from "react";

export function ModalPage() {
  const [showModal, setShowModal] = useState(false);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [showCloseButtons, setShowCloseButtons] = useState(false);
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const [overlay, setOverlay] = useState("blur");

  return (
    <div className={UI.Panel("fe-d-flex fe-flex-column fe-gap-2")}>
      <div className="fe-d-flex fe-justify-center">
        <label>Close on escape</label>
        <input
          type="checkbox"
          onChange={(e) => setCloseOnEscape(e.target.checked)}
          checked={closeOnEscape}
        />
      </div>

      <div className="fe-d-flex fe-justify-center">
        <label>Close on backdrop click</label>
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

      <button onClick={() => setShowModal(true)} className={UI.BtnPrimary()}>
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
        >
          <p>Modal Text</p>
          <button
            className={UI.BtnPrimary()}
            onClick={() => alert("Look at me!")}
          >
            I'm Mr Meeseeks
          </button>
        </Modal>
      </OptionalPortal>
    </div>
  );
}
