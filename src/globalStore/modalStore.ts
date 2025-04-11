import { create } from "zustand";
import createSelectors from "@/utils/selectors";
import ModalCancelBtn from "@/components/Modal/ModalCloseButton";

type ModalStore = {
  ModalComponent: React.FC | null;
  ModalCloseButton: React.FC;
  isModalOpen: boolean;
  closeModalCallback: () => void;
  modalTransitionCallback?: () => void;
};

type ModalActions = {
  openModal: (component: React.FC) => void;
  closeModal: () => void;
  resetGlobalStore: () => void;
  setModalTransitionCallback: (callback: () => void) => void;
  clearModalCallback: () => void;
};

const modalInitialState: ModalStore = {
  ModalComponent: null,
  ModalCloseButton: ModalCancelBtn,
  isModalOpen: false,
  closeModalCallback: () => null,
};

const modalStore = create<ModalStore & ModalActions>((set) => ({
  ...modalInitialState,
  openModal: (component) =>
    set({ isModalOpen: true, ModalComponent: component }),
  closeModal: () => set({ isModalOpen: false, ModalComponent: null }),
  resetGlobalStore: () => set(modalInitialState),
  setModalTransitionCallback: (callback: () => void) =>
    set({ modalTransitionCallback: callback }),
  clearModalCallback: () => set({ modalTransitionCallback: undefined }),
}));

export default createSelectors(modalStore);
