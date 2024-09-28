import React, {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

/**
 * Registration component.
 *
 * Renders a registration form with fields for username, phone, and password.
 *
 * @returns {React.ReactElement} Registration form.
 */
function Registration(): React.ReactElement {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [type, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    Cookies.remove('isLogged');
    navigate('/');
  }

  const isLogged = Cookies.get("isLogged");
  if (isLogged === "true") {
    return (
      <div className="registration-cart">
        <p>Вы уже вошли в систему</p>
        <button onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "Выход..." : "Выход из аккаунта"}
        </button>
        <Link to="/">Перейти в профиль</Link>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const userData = {
        username,
        phone,
        password,
        type,
      };

      const response = await fetch("http://localhost:8080/api/users/registration", {
	      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      console.log(data);

      if (Cookies.get("isRegistered") == undefined) {
        Cookies.set('isRegistered', 'true', { expires: 15 });
      }

      if (Cookies.get("userType") == undefined) {
        Cookies.set('type', type, { expires: 15 });
      }

      navigate('/login')
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="registration-cart">
        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Телефон</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="form-option">
            <label htmlFor="radio">Вы исполнитель</label>
            <input
              type="radio"
              name="radio"
              id="radio"
              value="executor"
              required
              onChange={(event) => setUserType(event.target.value)}
            />
          </div>
          <div className="form-option">
            <label htmlFor="radio">Вы Заказчик</label>
            <input
              type="radio"
              name="radio"
              id="radio"
              value="client"
              required
              onChange={(event) => setUserType(event.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading}>
          {isLoading ? "Регистрация..." : "Регистрация"}
          </button>
        </form>
        <Link to="/login">Уже есть аккаунт? Вход</Link>
      </div>
    </>
  );
}


export default Registration