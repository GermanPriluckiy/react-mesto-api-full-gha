import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      name="add-card"
      opacity="low"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        lang="ru"
        name="cardPlaceInput"
        placeholder="Название"
        id="input-place"
        className="popup__input"
        required
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error" id="input-place-error"></span>
      <input
        type="url"
        lang="ru"
        name="cardUrlInput"
        placeholder="Ссылка на картинку"
        id="input-url"
        className="popup__input"
        required
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span className="popup__error" id="input-url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
