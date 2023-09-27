import { useContext, memo, useMemo } from 'react'
import { AppContext } from '../../providers/context'
import { useBooleanToggle } from '../../hooks';
import { LOCALES } from '../../providers/i18n';
import { saveToStorage } from '../../utils/sessionStorage';
import { addData } from '../../utils/generate'

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

        dispatch({
            type: 'changeCurrency',
            currency: value
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
        <>
            <h1>Налаштування</h1>
            <Test data={data} />
            <button onClick={addData}>Add data (test loader)</button>
            <div>
                <form>
                    <label>
                        Currency:
                        <select name="currency"
                            onChange={onChange}
                            value={state.currency}>
                            <option value="UAH">Гривня</option>
                            <option value="USD">Dollar</option>
                            <option value="EUR">Euro</option>
                        </select>
                        <label>
                            Language:
                            <select name="currency"
                                onChange={onChangeLocale}
                                value={state.locale}>
                                <option value={LOCALES.UKRAINIAN}>Українська</option>
                                <option value={LOCALES.ENGLISH}>English</option>
                            </select>
                        </label>
                    </label>
                </form>
            </div>
            <div>
                <button onClick={handleStatusChange}>Розширені налаштування</button>
                {status ? (
                    <div>
                        <h2>Розширені налаштування</h2>
                        <p>...</p>
                    </div>
                ) : null}

            </div>
        </>
    );
};

export default Settings;