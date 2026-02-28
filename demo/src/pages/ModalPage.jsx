import { Modal, OptionalPortal } from "@fraserelliott/fe-components";
import { UI } from "@styles";
import { useState } from "react";

export function ModalPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={UI.Panel()}>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      <OptionalPortal portalTarget={document.body}>
        <Modal
          open={showModal}
          onOpenChange={setShowModal}
          heading="Modal Demo"
        >
          <p>Modal Text</p>
        </Modal>
      </OptionalPortal>
    </div>
  );
}
