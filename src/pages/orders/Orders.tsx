import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import OrderCart from '../../components/order/OrderCart'
import Order from '../../components/order/OrderInterface'

function Orders() {
	const [orders, setOrders] = useState<Order[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchOrders = async () => {
			setIsLoading(true)
			try {
				const response = await fetch('http://localhost:8080/api/orders', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (!response.ok) {
					throw new Error('Failed to fetch orders')
				}

				const data: Order[] = await response.json()
				setOrders(data)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchOrders()
	}, [])

	if (Cookies.get('isLogged') !== 'true') {
		return(
			<div>
				<Header links={[
					{to: "/login", label: "Логин"},
					{to: "/registration", label: "Регистрация"},
				]}/>
				<p>Вы не авторизованы</p>
			</div>
		)
	}

	return (
		<>
			<Header links={[
				{to: "/profile",label: "Профиль"}
			]}/>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				orders.map((order) => (
					<OrderCart order={order} />
				))
			)})
		</>
	)
}

export default Orders