import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header.tsx";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../ui/button/Button.tsx";

interface UserData {
	id: number
	username: string
	type: string
	createdAt: string
	phone: string
}

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
	const [userData, setUserData] = useState<UserData | null>(null)
	const userID = Cookies.get("userID")
	const isLogged = Cookies.get("isLogged")
	
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
					setUserData(null);
				}
			});
		}
	}, [userID]);
	
	if (!isLogged) {
		return (
			<>
				<Header links={[
					{
						to: "/login",
						label: "Логин"
					},
					{
						to: "/registration",
						label: "Регистрация"
					},
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
						<li>
							Имя пользователя: {userData?.username}
						</li>
						<li>
							Дата регистрации: {userData?.createdAt}
						</li>
						<li>
							Ваш уникальный идентификатор: {userData?.id}
						</li>
						<li>
							Роль: {(userData?.type === "executor") ? "Исполнитель" : "Заказчик"}
						</li>
						<li>
							Телефон: {userData?.phone}
						</li>
					</ul>
					{userData?.type === "executor" ?
						<div>
							<p>Посмотреть Заказы доступные для исполенения: <Link to='/orders'>Заказы</Link></p>
							<p>Посмотреть статистику сервиса: <Link to='/statistics'>Статистика</Link></p>
						</div>
						:
						<div>
							<p>Вы можете создать заказ</p>
							<button onClick={() => {}}>Создать</button>
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