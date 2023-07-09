import React from "react";
import Card from "./Card";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  loggedIn,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__avatar-container" onClick={onEditAvatar}>
              <img
                className="profile__avatar"
                alt="Фотография пользователя"
                src={currentUser.avatar}
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-btn"
                type="button"
                onClick={onEditProfile}
              ></button>
              <p className="profile__description">{currentUser.about}</p>
            </div>
          </div>
          <button className="add-btn" type="button" onClick={onAddPlace}>
            {loggedIn}
          </button>
        </section>
        <section className="places">
          {cards.map((card) => {
            return (
              <Card
                link={card.link}
                name={card.name}
                likes={card.likes}
                key={card._id}
                onClick={onCardClick}
                owner={card.owner}
                id={card._id}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
