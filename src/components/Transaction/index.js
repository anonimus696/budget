import PropTypes from 'prop-types'
import { useCallback, useContext } from 'react'
import { memo } from 'react'
import { AppContext } from '../../providers/context'
import convertValueToSelectedCurrency from '../../hooks';

import star from '../../assets/img/star.svg'
import filledStar from '../../assets/img/fill.svg'

import { Wrapper, TransactionDate, Value, Comment, Icon, CloseContainer, LeftRight, RightLeft } from './styles.js'

const Transaction = memo(({ transaction: { id, value, date, comment, isStared }, onDelete, onStarClick }) => {
    const { state } = useContext(AppContext);

    const deleteItem = useCallback(() => onDelete(id), [id])

    /*
    //!
    const convertValueToSelectedCurrency = useCallback(() => {
        // Тут ви можете додати логіку для конвертації значення в обрану валюту.
        // Наприклад, якщо у вас є курси валют, ви можете їх використовувати для конвертації.
        // Приклад:
        const conversionRates = {
            UAH: 1,  // Курс гривні до самої себе
            USD: 0.036,  // Приблизний курс долара до гривні
            EUR: 0.030,  // Приблизний курс євро до гривні
        };

        const convertedValue = value * conversionRates[state.currency];

        return convertedValue.toFixed(2); // Округлюємо результат до двох знаків після коми
    }, [value, state.currency]);
    //!
    */

    const convertedValue = convertValueToSelectedCurrency(value, state.currency);

    const isNegative = convertedValue.includes("-");

    const formattedBalance = isNegative ? `-${state.symbol}${convertedValue.slice(1)}` : `${state.symbol}${convertedValue}`;


    return (
        <Wrapper value={value}>
            <Icon onClick={() => onStarClick(id)}>
                <img src={isStared ? filledStar : star} />
            </Icon>

            <TransactionDate>{date}</TransactionDate>

            {/* <Value>{value.toFixed(2)}, {state.currency}</Value> */}
            <Comment>{comment}</Comment>

            <Value>{formattedBalance}</Value>


            {/* <button onClick={deleteItem}>Delete</button> */}

            <CloseContainer onClick={deleteItem} >
                <LeftRight class="icon-cross"></LeftRight>
                <RightLeft class="visually-hidden">Close</RightLeft>
            </CloseContainer>

        </Wrapper>
    );
})



Transaction.defaultProps = {
    transaction: {
        label: '',
        value: 0
    }
}


Transaction.propTypes = {
    transaction: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number
    })
}


export default Transaction;