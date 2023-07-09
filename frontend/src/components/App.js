import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  //Добавление стейт-переменных
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = React.useState(true);

  //Получение начальных карточек
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //Получение информации о пользователе
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfoFromServer()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //Функция лайка/дизлайка карточки
  function handleCardLike(likes, id) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
        console.log(newCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Открытие модальных окон
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function showPopupCheck(status) {
    setIsSuccessTooltipStatus(status);
    setIsInfoTooltipOpen(true);
  }
  //Закрытие модальных окон
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }
  //Авторизация в приложении
  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  }

  //Выход из профиля
  function handleLogout() {
    setLoggedIn(false);
  }
  //Изменение информации о пользователе
  function handleUpdateUser(name, description) {
    api
      .setUserInfo(name, description)
      .then((newInfo) => {
        setCurrentUser(newInfo.user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Изменение аватара
  function handleUpdateAvatar(link) {
    api
      .updateAvatar(link)
      .then((newInfo) => {
        console.log(newInfo);
        setCurrentUser(newInfo.user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Добавление новой карточки
  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Удаление карточки
  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== id));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={userEmail} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              userEmail={userEmail}
            />
          }
        />

        <Route
          path="/sign-in"
          element={
            <Login onLogin={handleLogin} showPopupCheck={showPopupCheck} />
          }
        />

        <Route
          path="/sign-up"
          element={<Register showPopupCheck={showPopupCheck} />}
        />
      </Routes>
      <ImagePopup
        card={selectedCard}
        name="view-card"
        opacity="high"
        onClose={closeAllPopups}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name="delete-card"
        opacity="low"
        title="Вы уверены?"
        buttonTitle="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>

      <InfoTooltip
        name="successful-action"
        opacity="low"
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccessTooltipStatus={isSuccessTooltipStatus}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
