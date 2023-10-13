import React, { useContext } from "react";
import { AppContext } from "../../providers/context";
import { THEMES } from '../../providers/themes/themeList'
import { saveToStorage } from "../../utils/sessionStorage";

import moon from '../../assets/img/moon.svg'
import sun from '../../assets/img/sun.svg'

import { IconTheme } from './styles.js'

/*
export const ThemeSwich = () => {
    const { state, dispatch } = useContext(AppContext);

    const setTheme = (themeName) => {


        dispatch({
            type: 'setTheme',
            themeName
        });
        saveToStorage('themeName', themeName)
    }

    return (
        <>
            <div>
                <button onClick={() => setTheme(THEMES.LIGHT)}>Light</button>
                <button onClick={() => setTheme(THEMES.DARK)}>Dark</button>
            </div>
        </>
    )
}
*/
export const ThemeSwich = () => {
    const { state, dispatch } = useContext(AppContext);

    const toggleTheme = () => {
        console.log(state.theme);
        const themeName = state.themeName === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
        dispatch({
            type: 'setTheme',
            themeName
        });
        saveToStorage('themeName', themeName);
    }

    return (
        <IconTheme onClick={toggleTheme}>
            <img src={state.themeName === THEMES.LIGHT || THEMES.BASIC ? moon : sun} />
        </IconTheme>
    )
}