interface Order extends Record<string | number, string | number>{
	id: number
	createdAt: string
	updatedAt: string
	hardware: string
	type_failure: string
	description: string
	client: number
	executor: number
	status: string
}

export default Order