// dependencies
import React from "react";
import { X } from "@phosphor-icons/react";

// store
import ModalStore from "@/globalStore/modalStore";

const ModalCancelBtn: React.FC = () => {
  const closeModal = ModalStore.use.closeModal();
  const closeModalCallback = ModalStore.use.closeModalCallback();

  const onClick = () => {
    closeModal();
    closeModalCallback();
  };

  return (
    <button
      onClick={onClick}
      className="bg-primary-500 h-6 w-6 rounded-full flex items-center justify-center cursor-pointer"
    >
      <X weight="bold" size={24} color="black" />
    </button>
  );
};

export default ModalCancelBtn;
