import {InputHTMLAttributes} from "react";


function Input(props : InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			{...props}
			className="
				transition ease-in-out delay-150
				border-solid border-2 border-sky-300 px-4 py-2
				poppins-semibold
				rounded
				hover:shadow-sky-200 hover:shadow-md
				duration-300
				"
		/>
	)
}

export default Input