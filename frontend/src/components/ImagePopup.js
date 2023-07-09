import React from "react";

function ImagePopup({ card, opacity, onClose }) {
  return (
    <div
      className={`popup popup_opacity_${opacity} ${
        card ? "popup_opened" : ""
      } `}
      id="popup-view-card"
    >
      <div className="card-view">
        <img
          className="card-view__photo"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h2 className="card-view__title">{card ? card.name : ""}</h2>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
