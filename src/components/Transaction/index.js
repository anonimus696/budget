import PropTypes from 'prop-types'
import { useCallback, useContext } from 'react'
import { memo } from 'react'
import { AppContext } from '../../providers/context'

import star from '../../assets/img/star.svg'
import filledStar from '../../assets/img/fill.svg'

import { Wrapper, TransactionDate, Value, Comment, Icon } from './styles.js'

const Transaction = memo(({ transaction: { id, value, date, comment, isStared }, onDelete, onStarClick }) => {
    const { state } = useContext(AppContext);

    const deleteItem = useCallback(() => onDelete(id), [id])

    return (
        <Wrapper value={value}>
            <Icon onClick={() => onStarClick(id)}>
                <img src={isStared ? filledStar : star} />
            </Icon>
            <TransactionDate>{date}</TransactionDate>
            <Value>{value.toFixed(2)}, {state.currency}</Value>
            <Comment>{comment}</Comment>
            <button onClick={deleteItem}>Delete</button>
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