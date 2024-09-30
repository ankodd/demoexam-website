import Order from './OrderInterface'

function defaultOrder(): Order {
	return {
		id: 0,
		createdAt: '',
		updatedAt: '',
		hardware: '',
		typeFailure: '',
		description: '',
		clientID: 0,
		executorID: 0,
		status: '',
	}
}

export default defaultOrder