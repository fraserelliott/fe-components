import { Modal, OptionalPortal } from "@fraserelliott/fe-components";
import { UI } from "@styles";
import { useState } from "react";
import { useToast, ToastMessageDisplay } from "@fraserelliott/fe-components";

export function ModalPage() {
  const [showModal, setShowModal] = useState(false);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [closeOnBackdropClick, setCloseOnBackdropClick] = useState(true);
  const [removeCloseButton, setRemoveCloseButton] = useState(false);
  const { addToastMessage } = useToast();

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

      <div className="fe-d-flex fe-justify-center">
        <label>Remove close button</label>
        <input
          type="checkbox"
          onChange={(e) => setRemoveCloseButton(e.target.checked)}
          checked={removeCloseButton}
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
          removeCloseButton={removeCloseButton}
        >
          <p>Modal Text</p>
          <button
            className={UI.BtnPrimary()}
            onClick={() => addToastMessage("Success toast", "success")}
          >
            Success Toast
          </button>
        </Modal>
      </OptionalPortal>

      <OptionalPortal portalTarget={document.body}>
        <ToastMessageDisplay />
      </OptionalPortal>
    </div>
  );
}
