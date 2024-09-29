import Header from "../../components/header/Header.tsx";
import "./Home.scss";

function Home() {
	return (
		<div className="home">
			<Header
			links={[
			{
				to: "/login",
				label: "Логин"
			},
			{
					to: "/registration",
					label: "Регистрация"
			},
			{
					to: "/profile",
					label: "Профиль"
			}
			]}/>
			<h1 className='poppins-bold text-3xl text-center my-40'>Добро пожаловать в сервис ремонта оборудования</h1>
		</div>
	);
}

export default Home