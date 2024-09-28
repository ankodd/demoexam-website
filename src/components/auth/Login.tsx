import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

/**
 * Login component.
 *
 * Renders a login form with fields for username and password.
 *
 * @returns {React.ReactElement} Login form.
 */
function Login(): React.ReactElement {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
    
    const userData = {
      username,
      password,
    }

	  try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Failed to login')
      }

      const data = await response.json()
      console.log(data)

      if (Cookies.get("isLogged") == undefined) {
        Cookies.set('isLogged', 'true', {expires: 15})
      }

      navigate('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-cart">
      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-3xl hover:bg-sky-700">Пароль</label>
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-button">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </div>
      </form>
      <Link to="/registration">Нету аккаунта? Регистрация</Link>
    </div>
  )
}

export default Login