import React, { useContext, useState } from "react";
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

    console.log(state.themeName);
    const setTheme = () => {
        const newTheme = state.themeName === THEMES.LIGHT || state.themeName === THEMES.BASIC ? THEMES.DARK : THEMES.LIGHT;

        dispatch({
            type: 'setTheme',
            themeName: newTheme,
        });
        saveToStorage('themeName', newTheme);
    };


    return (
        <IconTheme onClick={setTheme}>
            {state.themeName === THEMES.LIGHT || state.themeName === THEMES.BASIC ? (
                <img src={moon} alt="Moon Icon" />
            ) : (
                <img src={sun} alt="Sun Icon" />
            )}
        </IconTheme>
    )
}

export default ThemeSwich;