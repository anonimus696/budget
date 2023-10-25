import { useContext, memo, useMemo } from 'react'
import { AppContext } from '../../providers/context'
import { useBooleanToggle } from '../../hooks';
import { LOCALES } from '../../providers/i18n';
import { saveToStorage } from '../../utils/sessionStorage';
import { addData } from '../../utils/generate';


import { SettingsCont } from './styles.js';
import { Button } from 'react-scroll';

const Test = memo(({ data }) => {
    console.log('rendering')

    return <div>{data}</div>
})

const Settings = () => {
    const { state, dispatch } = useContext(AppContext);
    const { status, handleStatusChange } = useBooleanToggle();

    //const [isAdvancedSettingShown, setisAdvancedSettingShown] = useState(false);

    const onChange = (e) => {
        const { value } = e.target;
        const name = e.target.options[e.target.selectedIndex].getAttribute('name');

        dispatch({
            type: 'changeCurrency',
            currency: value,
            symbol: name
        })
    }



    const onChangeLocale = (e) => {
        const { value } = e.target;

        dispatch({
            type: 'setLocale',
            locale: value
        })
        saveToStorage('locale', value)
    }
    /*
        const onBotton = useCallback(() => {
            console.log('Parrent click');
        }, []);
    */
    const data = useMemo(() => []);

    return (
        <SettingsCont>
            <h1>Налаштування</h1>
            <Test data={data} />
            <div className='settings'>
                <form className='settings__form form'>
                    <label className='form__label'>
                        Currency:
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
                        Language:
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
                <Button onClick={handleStatusChange}>Розширені налаштування</Button>
                {status ? (
                    <div>
                        <h2>Розширені налаштування</h2>
                        <button onClick={addData}>Add data (test loader)</button>
                        <p>...</p>
                    </div>
                ) : null}

            </div>
        </SettingsCont>
    );
};

export default Settings;