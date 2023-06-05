import React from "react";

const ConfirmModal = ({
  title,
  message,
  closeModal,
  handleDelete,
  modalData,
  successBtnName,
  closeBtnName,
}) => {
  return (
    <>
      <input type="checkbox" id="confirmationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => handleDelete(modalData)}
              htmlFor="confirmationModal"
              className="btn bg-red-600 text-white"
            >
              {successBtnName}
            </label>
            <label onClick={closeModal} className="btn text-white">
              {closeBtnName}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
