import { Nav, HeaderContainer } from './styles.js'
import { Link } from "react-router-dom";
import { ThemeSwich } from "../ThemeSwich";
import { FormattedMessage } from "react-intl";
import { ChangeBalance } from '../ChangeBalance';
import { useScreenSize } from '../../hooks.js'
import { СurrencyRate } from "../СurrencyRate";
import { useLocation } from 'react-router-dom';



const Header = ({ onChange }) => {

    const location = useLocation();
    console.log();

    const screenWidth = useScreenSize();

    const renderChangeBalance = (screenWidth <= 767.98);


    const delClasname = (links, target) => {
        for (const li of links) {
            if (li !== target) {
                li.classList.remove("marked");
            }
        }
    }
    const handleLinkClick = (e) => {
        // Додаємо клас "active" до кнопки
        const target = e.currentTarget;

        target.classList.add("marked");
        // Забираємо клас "active" з іншої кнопки
        const otherLinks = document.querySelectorAll(".marked");
        delClasname(otherLinks, target)
    }
    const mainClick = () => {
        const mainLink = document.querySelector(".main");
        const otherLinks = document.querySelectorAll(".marked");

        if (!mainLink.classList.contains("marked")) {
            mainLink.classList.add("marked");
        }
        delClasname(otherLinks, mainLink)
    }


    return (
        <>
            <HeaderContainer>
                <Nav>
                    <ul>
                        <li>
                            <Link onClick={handleLinkClick} className='linkContainer main marked' to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M23.6698 9.56005L21.6698 7.74005L13.9998 0.780046C13.4498 0.288091 12.7377 0.0161133 11.9998 0.0161133C11.2618 0.0161133 10.5498 0.288091 9.99977 0.780046L2.34977 7.78005L0.349774 9.60005C0.2151 9.7367 0.122579 9.9092 0.0832487 10.097C0.0439184 10.2848 0.0594395 10.4799 0.12796 10.6591C0.196481 10.8383 0.315109 10.994 0.469691 11.1077C0.624274 11.2213 0.808286 11.2881 0.999775 11.3C1.25306 11.2886 1.49255 11.1814 1.66977 11L1.99977 10.7V21C1.99977 21.7957 2.31585 22.5588 2.87845 23.1214C3.44106 23.684 4.20412 24 4.99977 24H18.9998C19.7954 24 20.5585 23.684 21.1211 23.1214C21.6837 22.5588 21.9998 21.7957 21.9998 21V10.74L22.3298 11.04C22.5132 11.2067 22.7519 11.2994 22.9998 11.3C23.2014 11.2995 23.3981 11.2381 23.5642 11.1237C23.7303 11.0094 23.8579 10.8475 23.9304 10.6594C24.0028 10.4712 24.0167 10.2656 23.9702 10.0694C23.9237 9.8732 23.819 9.69566 23.6698 9.56005Z" fill="#C6C6C6" />
                                </svg>
                                <FormattedMessage id="menu.home" />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleLinkClick} className='linkContainer' to="/statistics">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M24 11H13V0C15.8412 0.228368 18.5083 1.46063 20.5239 3.47614C22.5394 5.49166 23.7716 8.1588 24 11Z" fill="#C6C6C6" />
                                    <path d="M23.9998 13C23.8007 15.2756 22.9563 17.4471 21.5658 19.2594C20.1752 21.0716 18.2963 22.4493 16.1498 23.2306C14.0032 24.0119 11.6783 24.1643 9.44819 23.6699C7.21806 23.1755 5.17536 22.0549 3.56013 20.4396C1.9449 18.8244 0.824246 16.7817 0.329848 14.5516C-0.16455 12.3214 -0.0121502 9.99652 0.76914 7.85001C1.55043 5.7035 2.92815 3.82457 4.74041 2.43401C6.55267 1.04346 8.72418 0.199045 10.9998 0V12C10.9998 12.2652 11.1051 12.5196 11.2927 12.7071C11.4802 12.8946 11.7346 13 11.9998 13H23.9998Z" fill="#C6C6C6" />
                                </svg>
                                <FormattedMessage id="menu.statistic" />
                            </Link>
                        </li>
                        {renderChangeBalance ?
                            <li onClick={mainClick}>
                                <ChangeBalance onChange={onChange} />
                            </li>
                            : null
                        }
                        <li>
                            <Link onClick={handleLinkClick} className='linkContainer' to="/settings">
                                <svg fill="#000000" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 489.802 489.802" space="preserve">
                                    <g><path d="M20.701,281.901l32.1,0.2c4.8,24.7,14.3,48.7,28.7,70.5l-22.8,22.6c-8.2,8.1-8.2,21.2-0.2,29.4l24.6,24.9c8.1,8.2,21.2,8.2,29.4,0.2l22.8-22.6c21.6,14.6,45.5,24.5,70.2,29.5l-0.2,32.1c-0.1,11.5,9.2,20.8,20.7,20.9l35,0.2c11.5,0.1,20.8-9.2,20.9-20.7l0.2-32.1c24.7-4.8,48.7-14.3,70.5-28.7l22.6,22.8c8.1,8.2,21.2,8.2,29.4,0.2l24.9-24.6c8.2-8.1,8.2-21.2,0.2-29.4l-22.6-22.8c14.6-21.6,24.5-45.5,29.5-70.2l32.1,0.2c11.5,0.1,20.8-9.2,20.9-20.7l0.2-35c0.1-11.5-9.2-20.8-20.7-20.9l-32.1-0.2c-4.8-24.7-14.3-48.7-28.7-70.5l22.8-22.6c8.2-8.1,8.2-21.2,0.2-29.4l-24.6-24.9c-8.1-8.2-21.2-8.2-29.4-0.2l-22.8,22.6c-21.6-14.6-45.5-24.5-70.2-29.5l0.2-32.1c0.1-11.5-9.2-20.8-20.7-20.9l-35-0.2c-11.5-0.1-20.8,9.2-20.9,20.7l-0.3,32.1c-24.8,4.8-48.8,14.3-70.5,28.7l-22.6-22.8c-8.1-8.2-21.2-8.2-29.4-0.2l-24.8,24.6c-8.2,8.1-8.2,21.2-0.2,29.4l22.6,22.8c-14.6,21.6-24.5,45.5-29.5,70.2l-32.1-0.2c-11.5-0.1-20.8,9.2-20.9,20.7l-0.2,35C-0.099,272.401,9.201,281.801,20.701,281.901z M179.301,178.601c36.6-36.2,95.5-35.9,131.7,0.7s35.9,95.5-0.7,131.7s-95.5,35.9-131.7-0.7S142.701,214.801,179.301,178.601z" /></g>
                                </svg>
                                <FormattedMessage id="menu.settings" />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleLinkClick} className='linkContainer' to="/about">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                                    <path d="M10 12.0701C13.3137 12.0701 16 9.38378 16 6.07007C16 2.75636 13.3137 0.0700684 10 0.0700684C6.68629 0.0700684 4 2.75636 4 6.07007C4 9.38378 6.68629 12.0701 10 12.0701Z" fill="#C6C6C6" />
                                    <path d="M13 14H7C5.14348 14 3.36301 14.7375 2.05025 16.0503C0.737498 17.363 0 19.1435 0 21C0 21.7956 0.316071 22.5587 0.87868 23.1213C1.44129 23.6839 2.20435 24 3 24H17C17.7956 24 18.5587 23.6839 19.1213 23.1213C19.6839 22.5587 20 21.7956 20 21C20 19.1435 19.2625 17.363 17.9497 16.0503C16.637 14.7375 14.8565 14 13 14Z" fill="#C6C6C6" />
                                </svg>
                                <FormattedMessage id="menu.about" />
                            </Link>
                        </li>
                    </ul>
                </Nav>
                <div className='container'>
                    <СurrencyRate />
                    <ThemeSwich />
                </div>
            </HeaderContainer>
        </>
    )

}


export default Header;
