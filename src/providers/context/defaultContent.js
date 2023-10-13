import { getFromStorage } from "../../utils/sessionStorage";
import { THEMES } from '../../providers/themes/themeList';
import { LOCALES } from "../i18n";


export default {
    currency: 'UAH',
    symbol: '₴',
    themeName: getFromStorage('themeName') || THEMES.BASIC,
    locale: getFromStorage('locale') || LOCALES.ENGLISH
}

