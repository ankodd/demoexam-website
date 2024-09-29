import React, {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from "../../ui/button/Button.tsx";
import Input from "../../ui/input/Input.tsx";
import Header from "../header/Header.tsx";

interface RegistrationData {
  username: string
  phone: string
  password: string
  type: string
}

/**
 * Registration component.
 *
 * Renders a registration form with fields for username, phone, and password.
 *
 * @returns {React.ReactElement} Registration form.
 */
function Registration(): React.ReactElement {
  const navigate = useNavigate()
  const [data, setData] = useState<RegistrationData>({
    username: "",
    phone: "",
    password: "",
    type: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    Cookies.remove('isLogged')
    navigate('/')
  }

  const isLogged = Cookies.get("isLogged")
  if (isLogged === "true") {
    return (
      <div className="registration-cart">
        <p>Вы уже вошли в систему</p>
        <Button onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "Выход..." : "Выход из аккаунта"}
        </Button>
        <Link to="/profile">Перейти в профиль</Link>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/registration", {
	      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const res = await response.json();
      console.log(res);

      if (Cookies.get("isRegistered") == undefined) {
        Cookies.set('isRegistered', 'true', { expires: 15 });
      }

      if (Cookies.get("userType") == undefined) {
        Cookies.set('type', data.type, { expires: 15 });
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
      <Header links={[]}/>
      <div className="flex justify-center items-center flex-col w-full h-full">
        {/* Registration form */}
        <form onSubmit={handleSubmit} className="transition ease-in border-4 border-sky-300 p-4 rounded-xl hover:shadow-2xl hover:shadow-sky-200">
          <div className="flex py-4 justify-between border-b-4 items-center">
            <label htmlFor="username" className="mr-12">Имя пользователя</label>
            <Input
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
                setData({
                  ...data,
                  username: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="flex py-4 justify-between border-b-4 items-center">
            <label htmlFor="email" className="mr-12">Телефон</label>
            <Input
              type="tel"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
                setData({
                  ...data,
                  phone: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="flex py-4 justify-between border-b-4 items-center">
            <label htmlFor="password" className="mr-12">Пароль</label>
            <Input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="flex py-4 justify-between border-b-4 items-center">
            <label htmlFor="radio">Вы исполнитель</label>
            <input
              type="radio"
              name="radio"
              id="radio"
              value="executor"
              required
              onChange={(event) => setData({
                ...data,
                type: event.target.value
              })}
            />
          </div>
          <div className="flex py-4 justify-between border-b-4 items-center">
            <label htmlFor="radio">Вы Заказчик</label>
            <input
              type="radio"
              name="radio"
              id="radio"
              value="client"
              required
              onChange={(event) => setData({
                ...data,
                type: event.target.value
              })}
            />
          </div>
          <div className="flex mb-8 justify-center items-center pt-8">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Регистрация..." : "Регистрация"}
            </Button>
          </div>
          <div className='flex justify-center items-center flex-col'>
            <p>У вас уже есть аккаунт?</p>
            <Link to="/login" className='poppins-bold hover:text-sky-500 transition p-4'>Вход</Link>
          </div>
        </form>
      </div>
    </>
  );
}


export default Registration