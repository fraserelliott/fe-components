import { Modal, OptionalPortal } from "@fraserelliott/fe-components";
import { UI } from "@styles";
import { useState } from "react";

export function ModalPage() {
  const [showModal, setShowModal] = useState(false);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [closeOnBackdropClick, setCloseOnBackdropClick] = useState(true);

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
          onChange={(e) => setCloseOnBackdropClick(e.target.checked)}
          checked={closeOnBackdropClick}
        />
      </div>

      <button onClick={() => setShowModal(true)} className={UI.BtnPrimary()}>
        Open Modal
      </button>

      <OptionalPortal portalTarget={document.body}>
        <Modal
          open={showModal}
          onOpenChange={setShowModal}
          heading="Modal Demo"
          closeOnBackdropClick={closeOnBackdropClick}
          closeOnEscape={closeOnEscape}
        >
          <p>Modal Text</p>
        </Modal>
      </OptionalPortal>
    </div>
  );
}
