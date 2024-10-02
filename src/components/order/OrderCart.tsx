import Cookies from 'js-cookie'
import Button from '../../ui/button/Button'
import Order from './OrderInterface'

interface Labels {
	[key: string]: string
	id: string
	createdAt: string
	updatedAt: string
	hardware: string
	type_failure: string
	description: string
	client_id: string
	executor_id: string
	status: string
}

/**
 * React component for rendering an order.
 *
 * @param {Order} order
 * The order to render.
 *
 * @returns {React.ReactElement}
 * The rendered element.
 */
function OrderCart({ order }: { order: Order }): React.ReactElement {
	const labels: Labels = {
		id: 'Уникальный идентификатор',
  	createdAt: 'Дата создания',
  	updatedAt: 'Дата обновления',
  	hardware: 'Оборудование',
  	type_failure: 'Тип неисправности',
  	description: 'Описание',
  	client_id: 'Клиент',
  	executor_id: 'Исполнитель',
  	status: 'Статус'
	}

	const changeStatus = async () => {
		const orderRequset = { 
			...order, status: order.status === 'working' ? 'done' : 'working',
			executor_id :
			Cookies.get('userID') !== undefined ? Number(Cookies.get('userID')) : 0
		}

		const resp = await fetch(`http://localhost:8080/api/orders/update/?id=${order.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderRequset),
		})
	
		if (!resp.ok) {
			console.log(await resp.text())
			return
		}
	
		console.log('Status changed successfully')
	}

	return (
		<>
			<div className='flex justify-center items-center w-50'>
				<div className='flex justify-center items-center border-2'>
					<article>
						<ul>
						{Object.keys(order).map((key, index) => (
						<li key={index} className='my-2'>
							<p>{labels[key]}: {order[key]}</p>
						</li>
					))}
						</ul>
					</article>
					{
						(() => {
							switch (order.status) {
								case 'waiting':
									return <Button onClick={changeStatus}>Начать выполнение</Button>;
								case 'done':
									return <Button disabled>Завершено</Button>;
								case 'working':
									return <Button onClick={changeStatus}>Завершить</Button>;
								default:
									return null;
							}
						})()
					}
				</div>
			</div>
		</>
	)
}

export default OrderCart