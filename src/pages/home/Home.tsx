import Header from "../../components/header/Header.tsx";
import "./Home.scss";

function Home() {
	return (
		<div className="home">
			<Header />
			<h1>Добро пожаловать в сервис ремонта оборудования</h1>
		</div>
	);
}

export default Home