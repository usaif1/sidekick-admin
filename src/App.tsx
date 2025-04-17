import { useCallback } from "react";
import ModalStore from "./globalStore/modalStore";
import ReactModal from "react-modal";
import { BrowserRouter } from "react-router";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import UnProtectedRoutes from "./routes/UnprotectedRoutes";
import { useAuth } from "./modules/auth/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  const {
    ModalComponent,
    ModalCloseButton,
    isModalOpen,
    clearModalCallback,
    modalTransitionCallback,
  } = ModalStore();

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
      <BrowserRouter>
        {isAuthenticated ? <ProtectedRoutes /> : <UnProtectedRoutes />}
      </BrowserRouter>
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
