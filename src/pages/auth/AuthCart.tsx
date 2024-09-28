import React from "react";
import './AuthCart.scss'

interface AuthCartProps {
	children: React.ReactNode;
}

const AuthCart: React.FC<AuthCartProps> = ({ children }) => {
	return (
		<div className="AuthCart">
			{children}
		</div>
	);
}

export default AuthCart