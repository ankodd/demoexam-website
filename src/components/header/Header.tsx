import { Link } from "react-router-dom";
import './Header.scss'

function Header() {
	return (
		<header className="header">
			<nav className="nav">
				<ul>
					<li>
						<Link to="/">Домашняя страница</Link>
					</li>
					<li>
						<Link to="/registration">Регистрация</Link>
					</li>
					<li>
						<Link to="/login">Логин</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header