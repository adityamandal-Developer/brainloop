import React from "react";
import { ModeToggle } from "./toggle-theme";

const Header = () => {
	return (
		<header className="absolute top-0 z-10 flex w-full justify-end p-4">
			<ModeToggle />
		</header>
	);
};

export default Header;
