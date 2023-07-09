import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      opacity="low"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        lang="ru"
        name="avatarUrlInput"
        placeholder="Ссылка на аватар"
        id="input-avatar-url"
        className="popup__input"
        required
        ref={avatarRef}
      />

      <span className="popup__error" id="input-avatar-url-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
