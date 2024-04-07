import { createPortal } from "react-dom";
import { useState } from "react";

import ModalContentLogin from "./ModalContentLogin";

const ModalButton = ({ token, handleToken }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        LOG IN
      </button>
      {showModal &&
        createPortal(
          <ModalContentLogin
            handleToken={handleToken}
            token={token}
            closeModal={() => {
              setShowModal(false);
            }}
          />,
          document.body
        )}
    </>
  );
};
export default ModalButton;
