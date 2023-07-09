import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      opacity="low"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        lang="ru"
        name="nameInput"
        placeholder="Имя"
        id="input-name"
        className="popup__input"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
      />

      <span className="popup__error" id="input-name-error"></span>

      <input
        type="text"
        lang="ru"
        name="descriptionInput"
        placeholder="О себе"
        id="input-description"
        className="popup__input"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
      />

      <span className="popup__error" id="input-description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
