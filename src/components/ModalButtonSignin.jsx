import { createPortal } from "react-dom";
import { useState } from "react";

import ModalContentSignin from "./ModalContentSignin";

const ModalButton = ({ handleToken, token }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        SIGN IN
      </button>
      {showModal &&
        createPortal(
          <ModalContentSignin
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
