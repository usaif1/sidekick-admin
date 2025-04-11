import { useCallback } from "react";
import ModalStore from "./globalStore/modalStore";
import Router from "./routes/Router";
import ReactModal from "react-modal";

function App() {
  const { ModalComponent, ModalCloseButton, isModalOpen, clearModalCallback, modalTransitionCallback } = ModalStore();

  const onAfterClose = useCallback(() => {
    if (modalTransitionCallback) {
      // Open the next modal component
      modalTransitionCallback();
      // Clear the callback so it doesn't run again on every close
      clearModalCallback();
    }
  }, [modalTransitionCallback, clearModalCallback]);

  return (
    <>
      <Router />
      <ReactModal
        isOpen={isModalOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        onAfterClose={onAfterClose}
        style={{
          content: {
            maxHeight: "80vh",
            height: "fit-content",
            alignSelf: "center",
            borderColor: "#787878",
            background: "#ffffff",
            width: "fit-content",
            margin: "auto",
            padding: "3rem 2rem",
            borderRadius: "0.75rem",
          },
          overlay: {
            zIndex: 99,
            background: "rgba(24,24,27,0.52)",
          },
        }}
      >
        <div className="absolute top-2 right-2">
          <ModalCloseButton />
        </div>
        {ModalComponent && <ModalComponent />}
      </ReactModal>
    </>
  );
}

export default App;
