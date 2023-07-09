import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  link,
  name,
  likes,
  onClick,
  owner,
  id,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = likes.some((i) => i === currentUser._id);
  const isLiked = likes.some(like => like === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `like-btn ${
    isLiked && "like-btn_status_active"
  }`;

  function handleCardClick() {
    onClick({ name, link });
    console.log(likes, id, currentUser._id);
    console.log({
      "link": link,
      "name": name,
      "likes": likes,
      "owner": owner,
      "id": id,
    });
    
  }

  function handleLikeClick() {
    onCardLike(likes, id);
  }

  function handleDeleteClick() {
    onCardDelete(id);
  }

  return (
    <div className="places__card">
      <img
        className="places__card-photo"
        src={link}
        alt={name}
        onClick={handleCardClick}
      />
      <div className="places__card-footer">
        <h2 className="places__card-title">{name}</h2>
        <div className="places__card-like-information">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="places__card-like-value">{likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className="delete-btn"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
    </div>
  );
}

export default Card;
