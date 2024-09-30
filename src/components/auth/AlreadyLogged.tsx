import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../ui/button/Button'

interface Props {
	isLoading: boolean
}

function AlreadyLogged(props: Props) {
	const navigate = useNavigate()
	
	const handleLogout = () => {
		Cookies.remove("isLogged")
		Cookies.remove("userID")
		navigate('/')
	}

		return (
			<div className="registration-cart">
				<p>Вы уже вошли в систему</p>
				<Button onClick={handleLogout} disabled={props.isLoading}>
					{props.isLoading ? "Выход..." : "Выход из аккаунта"}
				</Button>
				<Link to="/profile">Перейти в профиль</Link>
			</div>
		)
}

export default AlreadyLogged