import UserData from './UserData'

function defaultUserData(): UserData {
	return {
		id: 0,
		username: '',
		type: '',
		createdAt: '',
		phone: '',
	}
}

export default defaultUserData