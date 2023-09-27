import { useState } from 'react';

import Balance from '../Balance';
import Transactions from '../Transactions';
import ErrorBoundary from '../ErrorBoundary';

import { Wrapper } from './styles.js'
import { STATUSES } from '../../constants'

import { useData } from '../../hooks';
import { ChangeBalance } from '../ChangeBalance';
import { BalanceData } from '../Balance/BalanceData';

const Home = () => {
    const [balance, setBalance] = useState(0);

    const { transactions, hasNextPage, status, pushTransction, onDelete, onStarClick, loadMoreRows } = useData();

    const onChange = (transaction) => {

        pushTransction(transaction)

        setBalance(balance + Number(transaction.value))
    }


    return (
        <ErrorBoundary>
            <Wrapper data-testid="home-component">

                {/* <BalanceData>
                    {(balance) => <Balance balance={balance} />}
                </BalanceData>
                 */}

                <Balance balance={balance} />
                <ChangeBalance onChange={onChange} />
                <hr />

                <Transactions data={transactions}
                    isNextPageLoading={status === STATUSES.PENDING}
                    hasNextPage={hasNextPage}
                    loadMoreRows={loadMoreRows}
                    onDelete={onDelete}
                    onStarClick={onStarClick} />

            </Wrapper>
        </ErrorBoundary>
    )
}


export default Home;


/*

*/