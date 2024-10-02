import Cookies from 'js-cookie'
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../ui/button/Button.tsx"
import Input from "../../ui/input/Input.tsx"
import Header from '../header/Header.tsx'
import AlreadyLogged from './AlreadyLogged.tsx'

interface LoginData {
  username: string
  password: string
}

interface ResponseData {
  id: number
}

/**
 * Login component.
 *
 * Renders a login form with fields for username and password.
 *
 * @returns {React.ReactElement} Login form.
 */
function Login(): React.ReactElement {
  const navigate = useNavigate()
  const [data, setData] = useState<LoginData>({} as LoginData)
  const [isLoading, setIsLoading] = useState(false)
  const isLogged = Cookies.get("isLogged");

  if (isLogged === "true") {
    return (
      <AlreadyLogged isLoading={isLoading}/>
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

	  try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to login')
      }    

      const res: ResponseData = await response.json()
      console.log(res.id)

      if (Cookies.get("isLogged") == undefined) {
        Cookies.set('isLogged', 'true', {expires: 15})
      }

      if (Cookies.get("userID") == undefined) {
        Cookies.set('userID', res.id.toString(), {expires: 15})
      }

      navigate(`/profile`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header links={[]}/>
      <div className="flex justify-center items-center flex-col w-full h-full">
        {/* Login form */}
        <form onSubmit={handleSubmit}
              className="transition ease-in border-4 border-sky-300 p-4 rounded-xl hover:shadow-2xl hover:shadow-sky-200">
          <div className="flex py-4 justify-between border-b-4 items-center">
            <label htmlFor="username" className="mr-12">Имя пользователя</label>
            <Input
              type="text"
              id="username"
              value={data.username}
              required
              onChange={(e) => {
                setData({
                  ...data,
                  username: e.target.value.trim(),
                });
              }}
            />
          </div>
          <div className="flex py-4 justify-between border-b-4 items-center">
            <label htmlFor="password" className="mr-12">Пароль</label>
            <Input
              type="password"
              id="password"
              value={data.password}
              required
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value.trim(),
                });
              }}
            />
          </div>
          <div className="flex mb-8 justify-center items-center pt-8">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </div>
          <div className='flex justify-center items-center flex-col'>
            <p>Ещё нету аккаунта?</p>
            <Link to="/registration" className='poppins-bold hover:text-sky-500 transition p-4'>Регистрация</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login