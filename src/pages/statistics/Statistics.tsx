import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'

interface StatisticsModel {
	count_completed_orders: number;
  average_time_in_hours: number;
	count_failures_by_types: { [key: string]: number };
}


/**
 * Statistics component.
 *
 * Renders a page with statistics.
 *
 * @returns {React.ReactElement} Statistics page.
 */
function Statistics(): React.ReactElement {
	const [isLoading, setIsLoading] = useState(false)
	const [statistics, setStatistics] = useState<StatisticsModel>({
		count_completed_orders: 0,
		average_time_in_hours: 0,
		count_failures_by_types: {},
	})

	useEffect(() => {
		const fetchStatistics = async () => {
			setIsLoading(true)
			try {
				const resp = await fetch('http://localhost:8080/api/statistics', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (!resp.ok) {
					throw new Error('Failed to fetch statistics')
				}

				const data: StatisticsModel = await resp.json()
				setStatistics(data)
			} catch(error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}

			if (Cookies.get('isLogged') == undefined) {
				return (
					<>
						<Header links={[]} />
						<h1>Вы не авторизованы</h1>
					</>
				)
			}
	
			if (Cookies.get('type') !== 'executor') {
				return (
					<>
						<Header links={[]} />
						<h1>Вы не являетесь исполнителем, и по этому не можете посмотреть статистику</h1>
					</>
				)
			}
		}

		fetchStatistics()
	}, [])
	return (
		<>
			<Header links={[]}/>
			<div>
				{isLoading ? (
					<p>Загрузка...</p>
				) : (
					<div>
						<h1>Статистика</h1>
						<p>Количество выполненных заказов: {statistics.count_completed_orders}</p>
						<p>Среднее время выполнения заказа: {statistics.average_time_in_hours} часа</p>
						<p>Количество типов заказов по типам {Object.entries(statistics.count_failures_by_types).map(([key, value]) => (
							<React.Fragment key={key}>
								<br />
								<span>{key}: {value}</span>
							</React.Fragment>
						))}</p>
					</div>
				)}
			</div>
		</>
	)
}

export default Statistics