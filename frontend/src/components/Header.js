import logo from "../images/logo.svg";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function Header({ onLogout, userEmail }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Сайта" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__info">
              <p className="header__email">{userEmail}</p>
              <Link className="header__logout" to="/sign-in" onClick={onLogout}>
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/sign-in"
          element={
            <p>
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            </p>
          }
        />
        <Route
          path="/sign-up"
          element={
            <p>
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            </p>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
