import { Nav } from './styles.js'
import { Link } from "react-router-dom";
import { ThemeSwich } from "../ThemeSwich";
import { FormattedMessage } from "react-intl";


const Header = () => {
    return (
        <div>
            <Nav>
                <ul>
                    <li >
                        <Link to="/">
                            <FormattedMessage id="menu.home" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/statistics">
                            <FormattedMessage id="menu.statistic" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings">
                            <FormattedMessage id="menu.settings" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <FormattedMessage id="menu.about" />
                        </Link>
                    </li>
                </ul>
                <hr />
            </Nav>
            <ThemeSwich />
        </div>
    )

}


export default Header;