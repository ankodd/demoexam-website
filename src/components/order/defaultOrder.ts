import Order from './OrderInterface'

function defaultOrder(): Order {
	return {
		id: 0,
		createdAt: '',
		updatedAt: '',
		hardware: '',
		type_failure: '',
		description: '',
		client: 0,
		executor: 0,
		status: '',
	}
}

export default defaultOrder