import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../ui/button/Button'

interface Props {
	isLoading: boolean
}

/**
 * Component that renders a message when the user is already logged in.
 *
 * @param {Props} props
 * @prop {boolean} isLoading Whether the component is in a loading state
 *
 * @returns {React.ReactElement} JSX Element
 */
function AlreadyLogged(props: Props): React.ReactElement {
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