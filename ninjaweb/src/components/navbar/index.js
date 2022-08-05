import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/home'>
			Home
		</NavLink>
		<NavLink to='/user'>
			User Data
		</NavLink>
		<NavLink to='/routes'>
			Route Data
		</NavLink>
		<NavLink to='/followers'>
			Follower Data
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
