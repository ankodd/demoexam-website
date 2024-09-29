import { Link } from "react-router-dom";
import './Header.scss'
import React from "react";

interface Link {
	to: string;
	label: string;
}

interface HeaderProps {
	links: Link[];
}

/**
 * @function Header
 * @description Header component
 * @param {HeaderProps} props Component props
 * @prop {Link[]} links Links to render
 * @returns {React.ReactElement} JSX Element
 */
function Header({ links }: HeaderProps): React.ReactElement {
	return (
		<header className="header">
			<nav className="nav py-4 bg-blue-200">
				<ul className="flex gap-4 justify-between mx-40">
					<li className='flex-1'>
						<Link to="/" className='hover:underline'>Домашняя страница</Link>
					</li>
					{links.map((link, index) => (
						<li key={index}>
							<Link to={link.to} className='hover:underline'>{link.label}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default Header