
import React, { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from "../../providers/context";
import { BalanceContainer } from './styles.js'
import { ChangeBalance } from '../ChangeBalance';
import up from '../../assets/img/up.svg'
import down from '../../assets/img/down.svg'
import { СurrencyRate } from "../СurrencyRate";

import { getItems } from "../../utils/indexdb";
import { useScreenSize } from "../../hooks"

import convertValueToSelectedCurrency from '../../hooks';



const Balance = ({ balance, children, onChange, setFilter }) => {

    const { state } = useContext(AppContext);
    const convertedBalance = convertValueToSelectedCurrency(balance, state.currency);

    //!
    const [totalSpendings, setTotalSpendings] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        const setOperations = async () => {
            try {
                const allTransactions = await getItems();

                // Обчислюємо суми "Spendings" і "Earnings"
                const spendings = allTransactions
                    .filter(transaction => transaction.placeholder === "Spendings")
                    .reduce((acc, transaction) => acc + transaction.value, 0);
                const earnings = allTransactions
                    .filter(transaction => transaction.placeholder === "Earnings")
                    .reduce((acc, transaction) => acc + transaction.value, 0);

                setTotalSpendings(spendings !== 0 ? spendings.toFixed(2).slice(1) : spendings.toFixed(2));
                setTotalEarnings(earnings.toFixed(2));
            } catch (error) {
                console.error("Помилка при отриманні транзакцій:", error);
            }
        };
        setOperations();
    }, [balance]);

    const convertedtotalSpendings = convertValueToSelectedCurrency(totalSpendings, state.currency);
    const convertedtotalEarnings = convertValueToSelectedCurrency(totalEarnings, state.currency);


    console.log('totalSpendings', totalSpendings);
    console.log('totalEarnings', totalEarnings);
    //!


    function balanceChecker(convertedBalance) {
        if (convertedBalance >= 1000000000 || convertedBalance <= -1000000000) {
            return (convertedBalance / 1000000000).toFixed(1) + "B";
        } else if (convertedBalance >= 1000000 || convertedBalance <= -1000000) {
            return (convertedBalance / 1000000).toFixed(1) + "M";
        } else {
            return convertedBalance;
        }
    }

    const newtotalSpendings = balanceChecker(convertedtotalSpendings)
    const newtotalEarnings = balanceChecker(convertedtotalEarnings)
    const newBalance = balanceChecker(convertedBalance);

    // Додаємо мінус перед значенням, якщо воно від'ємне
    const formattedBalance = newBalance.includes("-") ? `-${state.symbol}${newBalance.slice(1)}` : `${state.symbol}${newBalance}`;

    const screenWidth = useScreenSize();
    const renderChangeBalance = screenWidth >= 767.98;

    return (
        <BalanceContainer data-testid="balance" className="balance">

            <div className="balance__items">
                <div className="balance__item">
                    <div className="balance__icon">
                        {state.symbol}
                    </div>
                    <div className="balance__content content">
                        <div className="content__title">Actual balance</div>
                        <div className="content__balance">{formattedBalance}</div>
                    </div>
                    {renderChangeBalance && <ChangeBalance onChange={onChange} />}
                </div>
                <div onClick={() => setFilter("Earnings")} className="balance__item item-balance__green">
                    <div className="balance__img">
                        <img src={up} />
                    </div>
                    <div className="balance__content content">
                        <div className="content__title">Earnings</div>
                        <div className="content__balance">{state.symbol}{newtotalEarnings}</div>
                    </div>
                </div>
                <div onClick={() => setFilter("Spendings")} className="balance__item item-balance__pink">
                    <div className="balance__img">
                        <img src={down} />
                    </div>
                    <div className="balance__content content">
                        <div className="content__title">Spendings</div>
                        <div className="content__balance">-{state.symbol}{newtotalSpendings}</div>
                    </div>
                </div>

            </div>

        </BalanceContainer >
    )
}


export default Balance;




/*
                    <div className="balance__item balance__item-container">
                        <div className="balance__content content">
                            <div className="content__title">Currency rate</div>
                            <div className="content__balance"><span>$</span> {(1 / conversionRates.USD).toFixed(2)}</div>
                        </div>
                    </div>
*/

/*
            //!
            <button onClick={() => setFilter("Spendings")}>Spendings</button>
            <button onClick={() => setFilter("Earnings")}>Earnings</button>
            <button onClick={() => setFilter("Clear")}>Clear</button>
            //!
*/