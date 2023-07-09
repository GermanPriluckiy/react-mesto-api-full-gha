import React from "react";

function PopupWithForm({
  name,
  opacity,
  title,
  children,
  buttonTitle,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_opacity_${opacity} ${isOpen ? "popup_opened" : ""
        } `}
      id={`popup-${name}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          id={name}
          name={name}
          method="post"
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__button"
            type="submit"
            id={`${name}-button-save`}
          >
            {buttonTitle}
          </button>

        </form>
        <button
          className="popup__button-close"
          id={`${name}-button-close`}
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
