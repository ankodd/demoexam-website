import {ButtonHTMLAttributes} from "react";


function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			className="
				transition ease-in-out delay-150
				border-solid border-2 border-sky-300 px-4 py-2
				poppins-semibold
				rounded
				hover:shadow-sky-200 hover:shadow-md
				duration-300
				">
			{children}
		</button>
	)
}

export default Button