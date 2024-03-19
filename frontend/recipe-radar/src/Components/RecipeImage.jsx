import { useState } from "react";
import { Modal } from "@mui/material";

export default function RecipeImage({ recipe, imageUrl }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    closeModal();
  };

  return (
    <>
      <img
        className="recipe-image"
        src={imageUrl || "./images/default-image.png"}
        alt={`${recipe.name} image`}
        style={{ transition: "transform 0.3s", cursor: "pointer" }}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.3)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
        }}
        onClick={openModal}
      />

      <Modal open={showModal} onClose={closeModal} onClick={handleModalClick}>
        <div className="modal-content d-flex justify-content-center align-items-center">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img
            className="modal-image"
            src={imageUrl || "./images/default-image.png"}
            alt={`${recipe.name} image`}
          />
        </div>
      </Modal>
    </>
  );
}
