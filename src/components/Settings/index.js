import { useContext, memo, useMemo, useState } from 'react'
import { AppContext } from '../../providers/context'
import { useBooleanToggle } from '../../hooks';
import { LOCALES } from '../../providers/i18n';
import { saveToStorage } from '../../utils/sessionStorage';
import { addData, delData } from '../../utils/generate';
import { useIntl } from 'react-intl';

import { SettingsCont } from './styles.js';


const Test = memo(({ data }) => {
    console.log('rendering')

    return <div>{data}</div>
})

const Settings = () => {

    const intl = useIntl();
    const T = (key) => {
        return intl.formatMessage({ id: [key] });
    };

    const { state, dispatch } = useContext(AppContext);
    // const { status, handleStatusChange } = useBooleanToggle();
    const [password, setPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [message, setMessage] = useState(false);


    //const [isAdvancedSettingShown, setisAdvancedSettingShown] = useState(false);

    const handleStatusChange = (e) => {
        e.preventDefault();
        if (password === '1540') { // Порівняння з рядком '1540'
            setIsPasswordCorrect(true); // Встановіть isPasswordCorrect на true, якщо пароль правильний.
            setPassword('');
        } else {
            setMessage(true)
            setPassword('');
            e.target.classList.add('error');
        }
    };
    const enterValue = (e) => {
        setPassword(e.target.value)
        const element = document.querySelector('.error');
        console.log('element', element);
        if (message) {
            setMessage(false)
            element.classList.remove('error');
        }
    }

    const onChange = (e) => {
        const { value } = e.target;
        const name = e.target.options[e.target.selectedIndex].getAttribute('name');

        dispatch({
            type: 'changeCurrency',
            currency: value,
        })

        dispatch({
            type: 'changeSymbol',
            symbol: name
        })
        saveToStorage('changeCurrency', value)
        saveToStorage('changeSymbol', name)

    }


    const onChangeLocale = (e) => {
        const { value } = e.target;

        dispatch({
            type: 'setLocale',
            locale: value
        })
        saveToStorage('locale', value)
    }

    const data = useMemo(() => []);

    return (
        <SettingsCont>
            <h2>{T('settings.setting')}</h2>
            <Test data={data} />
            <div className='settings'>
                <form className='settings__form form'>
                    <label className='form__label'>
                        {T('form.сurrency')}
                        <select
                            onChange={onChange}
                            name={state.name}
                            value={state.currency}>
                            <option name="₴" value="UAH">UAH</option>
                            <option name="$" value="USD">USD</option>
                            <option name="€" value="EUR">EUR</option>
                        </select>
                    </label>
                    <hr />
                    <label className='form__label'>
                        {T('settings.language')}
                        <select name="language"
                            onChange={onChangeLocale}
                            value={state.locale}>
                            <option value={LOCALES.UKRAINIAN}>Українська</option>
                            <option value={LOCALES.ENGLISH}>English</option>
                        </select>
                    </label>
                </form>
            </div>
            <hr />
            <div className='settings__advanced'>
                {!isPasswordCorrect ?
                    <div>
                        <form className='settings__form advanced' onSubmit={handleStatusChange}>
                            <div className='advanced__title'>{T('settings.advanced')}</div>
                            <input
                                className='advanced__input'
                                value={password}
                                type='tel'
                                placeholder={T('settings.enter')}
                                maxLength={4}
                                onChange={enterValue} />
                            {message && <div className='advanced__errormessage'>{T('settings.password')}</div>}
                            <button className='button' >{T('settings.advanced')}</button>
                        </form>
                    </div>
                    :
                    <button className='button del' onClick={() => setIsPasswordCorrect(false)} >{T('settings.close')}</button>
                }
                {/* <button className='button' onClick={handleStatusChange}>Розширені налаштування</button> */}
                {isPasswordCorrect ? (
                    <div>
                        <h3>{T('settings.advanced')}</h3>
                        <button className='button' onClick={addData}>{T('settings.addData')}</button>
                        <button className='button del' onClick={delData}>{T('settings.delData')}</button>
                        <p>...</p>
                    </div>
                ) : null}

            </div>
        </SettingsCont>
    );
};

export default Settings;