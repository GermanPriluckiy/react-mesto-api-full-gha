import React from "react";
import { Link } from "react-router-dom";
import { register } from "../utils/Auth";

function Register({ showPopupCheck }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    register(email, password)
      .then((res) => {
        console.log(res);
        showPopupCheck(true);
      })
      .catch((err) => {
        console.log(err);
        showPopupCheck(false);
      });
  }

  return (
    <>
      <div className="register">
        <div className="register__container">
          <h2 className="register__title">Регистрация</h2>
          <form
            className="register__form"
            method="post"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              lang="ru"
              placeholder="Email"
              className="register__input"
              required
              minLength="2"
              maxLength="40"
              onChange={handleEmailChange}
              value={email || ""}
            />

            <input
              type="password"
              lang="ru"
              placeholder="Пароль"
              className="register__input"
              required
              minLength="2"
              maxLength="200"
              onChange={handlePasswordChange}
              value={password || ""}
            />
            <button className="register__button" type="submit">
              Зарегистрироваться
            </button>
          </form>

          <p className="register__subtitle">
            Уже зарегистрированы?{" "}
            <Link className="register__subtitle-link" to="/sign-in">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
