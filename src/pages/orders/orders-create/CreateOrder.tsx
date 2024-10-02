import Cookies from 'js-cookie'
import React, { useState } from 'react'
import Header from '../../../components/header/Header'
import defaultOrder from '../../../components/order/defaultOrder.ts'
import Order from '../../../components/order/OrderInterface.ts'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'

/**
* CreateOrder component.
*
* Renders a form for creating a new order.
*
* @returns {React.ReactElement} CreateOrder component.
**/
function CreateOrder(): React.ReactElement {
	const [order, setOrder] = useState<Order>(defaultOrder())
	const [isLoading, setIsLoading] = useState(false)
	// Check if user is logged in
	if (Cookies.get('isLogged') !== 'true') {
		return (
			<>
				<Header links={[
					{ to: "/login", label: "Логин" },
					{ to: "/registration", label: "Регистрация" },
				]} />
				<p>Вы не авторизованы</p>
			</>
		)
	}
	/**
	 * Handle form submit.
	 *
	 * If user is logged in, add client id to order and send it to the server.
	 * If user is not logged in, return an error page.
	 */
	const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)
		order.executor = 0
		order.status = 'waiting'

		if (Cookies.get('userID') !== undefined) {
			order.client = Number(Cookies.get('userID'))
		} else {
			return (
				<>
					<Header links={[]} />
					<div>
						<p>Произошла ошибка</p>
					</div>
				</>
			)
		}


		try {
			const response = await fetch('http://localhost:8080/api/orders/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(order),
			})

			if (!response.ok) {
				console.log(await response.text())
				console.log(order)
				throw new Error('Failed to create order')
			}

			console.log('Order created successfully', `status: ${response.status}`)

			const element = document.getElementById('message')
			if (element) {
				element.innerHTML = 'Заказ успешно создан!'
				setOrder(defaultOrder())
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<>
			<Header links={[
				{ to: "/profile", label: "Профиль" },
			]} />
			<div className="flex justify-center items-center w-full h-full">
				<form onSubmit={handleSumbit} className="transition ease-in border-4 border-sky-300 p-4 rounded-xl hover:shadow-2xl hover:shadow-sky-200">
					<div className="flex py-4 justify-between border-b-4 items-center">
						<label htmlFor="hardware" className="mr-12">Оборудование, которое требует ремонта</label>
						<Input
							type="text"
							id="hardware"
							value={order?.hardware}
							onChange={(e) => {
								setOrder({
									...order,
									hardware: e.target.value.trim()
								})
							} }
							required />
					</div>
					<div className="flex py-4 justify-between border-b-4 items-center">
						<label htmlFor="description" className="mr-12">Описание</label>
						<Input
							type="text"
							id="description"
							value={order?.description}
							onChange={(e) => {
								setOrder({
									...order,
									description: e.target.value.trim()
								})
							} }
							required />
					</div>
					<div className="flex py-4 justify-between border-b-4 items-center">
						<label htmlFor="typeFailure" className="mr-12">Тип неисправности</label>
						<Input
							type="text"
							id="typeFailure"
							value={order?.type_failure}
							onChange={(e) => {
								setOrder({
									...order,
									type_failure: e.target.value.trim()
								})
							}}
							required />
					</div>
					<div className="flex mb-8 justify-center items-center pt-8">
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Создание..." : "Создать"}
						</Button>
					</div>
					<div className='flex my-4 justify-center items-center'>
					<p id="message"></p>
					</div>
				</form>
			</div>
		</>
	)
}

export default CreateOrder