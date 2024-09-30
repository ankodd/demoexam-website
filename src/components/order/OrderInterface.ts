interface Order extends Record<string | number, string | number>{
	id: number
	createdAt: string
	updatedAt: string
	hardware: string
	typeFailure: string
	description: string
	clientID: number
	executorID: number
	status: string
}

export default Order