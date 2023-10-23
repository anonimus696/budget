import { useState, useEffect } from 'react';

import Balance from '../Balance';
import Transactions from '../Transactions';
import ErrorBoundary from '../ErrorBoundary';

import { Wrapper } from './styles.js'
import { STATUSES } from '../../constants'

import { useData } from '../../hooks';

import { getItems } from '../../utils/indexdb';


import { getData } from '../../utils/indexdb';



const Home = ({ headerData, setHeaderData }) => {

    const [balance, setBalance] = useState(0);

    const [filter, setFilter] = useState("Clear");
    const { transactions, hasNextPage, status, pushTransction, onDelete, onStarClick, loadMoreRows } = useData();


    /*
        useEffect(() => {

            const allTransactions = getItems();

            console.log("ALL TRANSACTIONS", allTransactions);
            const initialBalance = allTransactions.reduce((acc, transaction) => acc + transaction.value, 0);
            setBalance(initialBalance.toFixed(2));
        }, [transactions]);
    */


    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const allTransactions = await getItems();
                // Перерахувати баланс при завантаженні сторінки
                const initialBalance = allTransactions.reduce((acc, transaction) => acc + transaction.value, 0);
                setBalance(initialBalance.toFixed(2));
            } catch (error) {
                console.error("Помилка при отриманні транзакцій:", error);
            }
        };
        fetchTransactions();
    }, [transactions]);




    const onChange = (transaction) => {

        pushTransction(transaction)

        setBalance((prevBalance) => (prevBalance + Number(transaction.value)));

    };


    useEffect(() => {
        if (headerData) {
            pushTransction(headerData);
            getItems();
        }

        setHeaderData(null);

    }, [headerData]);



    return (
        <ErrorBoundary>

            <Wrapper data-testid="home-component">
                {/* <BalanceData>
                    {(balance) => <Balance balance={balance} />}
                </BalanceData>
                 */}

                <Balance
                    setFilter={setFilter} //!
                    balance={balance} onChange={onChange} />

                {transactions.length > 0
                    ?
                    <Transactions
                        data={transactions}
                        isNextPageLoading={status === STATUSES.PENDING}
                        hasNextPage={hasNextPage}
                        loadMoreRows={loadMoreRows}
                        onDelete={onDelete}
                        onStarClick={onStarClick}

                        filter={filter} setFilter={setFilter}//!
                    />
                    :
                    <h1>You do not have any transaction yet, please press plus to add a new transaction</h1>
                }


            </Wrapper>

        </ErrorBoundary>
    )
}


export default Home;


/*


*/