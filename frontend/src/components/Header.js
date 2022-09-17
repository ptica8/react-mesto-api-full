import React from 'react';
import headerLogo from "../images/logo.svg";

function Header({children}) {
    return (
        <div className="header">
            <img
                src={headerLogo}
                alt="Логотип"
                className="header__logo"
            />
            <div className="header__navigation">{children}</div>
        </div>
    )
}

export default Header;