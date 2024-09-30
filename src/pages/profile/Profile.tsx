import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/header/Header.tsx"
import Button from "../../ui/button/Button.tsx"
import UserData from './UserData.ts'
import defaultUserData from './defaultUser.ts'

/**
 * Profile page
 *
 * Fetches user data by id stored in cookies
 *
 * @returns React.ReactElement
 */
function Profile(): React.ReactElement {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [userData, setUserData] = useState<UserData>(defaultUserData())
	const userID = Cookies.get("userID")
	const isLogged = Cookies.get("isLogged")

	const label: Record<string, string> = {
		id: "Уникатльный идентификатор",
		created_at: "Дата регистрации",
		username: "Логин",
		type: "Тип",
		phone: "Телефон",
	}
	
	useEffect(() => {
		const loadProfile = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`http://localhost:8080/api/users/?id=${userID}`);
				if (!response.ok) {
					throw new Error('Failed to fetch profile');
				}

				const data: UserData = await response.json();
				return data;
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		if (Cookies.get("isLogged")) {
			loadProfile().then((data) => {
				if (data) {
					setUserData(data);
				} else {
					setUserData(defaultUserData());
				}
			});
		}
	}, [userID]);
	
	if (!isLogged) {
		return (
			<>
				<Header links={[
					{to: "/login", label: "Логин"},
					{to: "/registration", label: "Регистрация"},
				]}/>
				<p>Вы не авторизованы</p>
			</>
		)
	}
	
	return (
		<>
			<Header links={[]}/>
			{isLoading ? <p>Загрузка...</p> :
				<div>
					<ul>
						{userData && Object.keys(userData || {}).map((key) => (
								key !== 'password' && (
									<li key={key}>
										  {label[key]}: {key === 'type' ? (userData[key] === 'executor' ? 'Исполнитель' : 'Клиент') : userData[key]}
									</li>
								)
							))}
					</ul>
					{userData?.type === "executor" ?
						<div>
							<p>Посмотреть Заказы доступные для исполенения: <Link to='/orders'>Заказы</Link></p>
							<p>Посмотреть статистику сервиса: <Link to='/statistics'>Статистика</Link></p>
						</div>
						:
						<div>
							<p>Вы можете создать заказ</p>
							<button onClick={() => {
								navigate('/orders/create')
							}}>Создать</button>
						</div>
					}
					<Button onClick={() => {
						Cookies.remove("isLogged")
						Cookies.remove("userID")
						navigate('/')
					}}>Выход</Button>
				</div>
			}
		</>
	)
}

export default Profile