import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className=" relative m-auto  z-50  min-h-[200px] max-w-[80%] bg-white rounded-lg p-4">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className=" text-2xl hover:cursor-pointer"
              />
            </div>
            {children}
          </div>

          <div
            onClick={onClose}
            className="z-40 absolute top-0 h-screen w-screen  backdrop-blur"
          ></div>
        </>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
