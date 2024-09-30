interface UserData extends Record<string | number, number | string>{
	id: number
	username: string
	type: string
	createdAt: string
	phone: string
}

export default UserData