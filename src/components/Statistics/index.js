import React, { useEffect, useState, useContext } from 'react';
import { getItems } from "../../utils/indexdb";

import { PieChart, Pie, Tooltip, Cell, Legend, Line, YAxis, XAxis, CartesianGrid, Bar, BarChart, LabelList } from "recharts";


import { Charts } from './styles'

import convertValueToSelectedCurrency from '../../hooks';
import { AppContext } from "../../providers/context";
import { Button } from '../Form/styles';

import { BalanceContainer } from '../Balance/styles.js'
import up from '../../assets/img/up.svg'
import down from '../../assets/img/down.svg'

import { useSpring, animated } from 'react-spring';//!
import { useScreenSize } from '../../hooks';

const style = {
    top: "50%",
    right: "-2%",
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
};


export const Statistics = () => {
    const { state } = useContext(AppContext);
    const [data, setData] = useState([]); // Додавання стану для даних

    const [dataIncome, setDataIncome] = useState([]); // Додавання стану для даних
    const [dataExpenses, setDataExpenses] = useState([]); // Додавання стану для даних

    const [currentChart, setCurrentChart] = useState('chartEarnings'); //

    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalSpendings, setTotalSpendings] = useState(0);

    //!
    const [isAnimating, setIsAnimating] = useState(false);

    const useAnimatedCounter = (value) => {

        const spring = useSpring({
            from: { number: 0 },
            to: { number: value },
            config: { duration: 2000 },
            onRest: () => {
                setIsAnimating(false);
            },
        });

        return {
            isAnimating,
            animatedValue: isAnimating ? spring.number.interpolate((val) => Math.floor(val)) : value,
        };
    };

    const totalTransactionsCounter = useAnimatedCounter(totalTransactions);
    const totalEarningsCounter = useAnimatedCounter(totalEarnings);
    const totalSpendingsCounter = useAnimatedCounter(totalSpendings);
    //!


    useEffect(() => {

        setIsAnimating(true);

        const setOperations = async () => {
            try {
                const incomeCategories = ['Зарплатня', 'Колядки', 'Дав Бог', 'Зайшла ставка', 'Інше'];//!
                const expenseCategories = ['Продукти', 'Одяг', 'Комуналка', 'Інше'];//!

                const allTransactions = await getItems();

                const transactionsByCategoryIncome = {};
                const transactionsByCategoryExpenses = {};

                const total = allTransactions.length;
                const earningsCount = allTransactions.filter(transaction => transaction.placeholder === "Earnings").length;
                const spendingsCount = allTransactions.filter(transaction => transaction.placeholder === "Spendings").length;

                setTotalTransactions(total);
                setTotalEarnings(earningsCount);
                setTotalSpendings(spendingsCount);
                //!

                // Спочатку створіть об'єкт для кожної категорії зі значенням 0
                incomeCategories.forEach(category => {
                    transactionsByCategoryIncome[category] = 0;
                });

                expenseCategories.forEach(category => {
                    transactionsByCategoryExpenses[category] = 0;
                });

                // Перебирайте всі транзакції і додавайте значення до відповідної категорії
                allTransactions.forEach(transaction => {
                    // Спочатку перевіряємо, чи транзакція належить до доходів
                    if (incomeCategories.includes(transaction.comment)) {
                        transactionsByCategoryIncome[transaction.comment] += transaction.value;
                    }
                    // Потім перевіряємо, чи транзакція належить до витрат
                    else if (expenseCategories.includes(transaction.comment)) {
                        transactionsByCategoryExpenses[transaction.comment] -= transaction.value;
                    }
                    // Якщо транзакція не відноситься ні до доходів, ні до витрат, додаємо її до категорії "Інше" для відповідної категорії (доходи або витрати)
                    else {
                        if (transaction.placeholder === "Spendings") {
                            // Для витрат
                            if (!transactionsByCategoryExpenses["Інше"]) {
                                transactionsByCategoryExpenses["Інше"] = 0;
                            }
                            transactionsByCategoryExpenses["Інше"] -= transaction.value;
                        } else if (transaction.placeholder === "Earnings") {
                            // Для доходів
                            if (!transactionsByCategoryIncome["Інше"]) {
                                transactionsByCategoryIncome["Інше"] = 0;
                            }
                            transactionsByCategoryIncome["Інше"] += transaction.value;
                        }
                    }
                });

                const transactionsByCategoryIncomeArray = Object.keys(transactionsByCategoryIncome).map(category => ({
                    name: category,
                    value: Math.floor(convertValueToSelectedCurrency(transactionsByCategoryIncome[category], state.currency))
                }));
                const transactionsByCategoryExpensesArray = Object.keys(transactionsByCategoryExpenses).map(category => ({
                    name: category,
                    // value: transactionsByCategoryExpenses[category]
                    value: Math.floor(convertValueToSelectedCurrency(transactionsByCategoryExpenses[category], state.currency))
                }));

                setDataIncome(transactionsByCategoryIncomeArray)
                setDataExpenses(transactionsByCategoryExpensesArray)
                console.log('transactionsByCategoryIncomeArray', transactionsByCategoryIncomeArray);//!
                console.log('transactionsByCategoryExpensesArray', transactionsByCategoryExpensesArray);//!


                // Тепер у вас є об'єкт transactionsByCategory, де ключами є категорії, а значеннями - суми
                //!

                const spendings = allTransactions
                    .filter(transaction => transaction.placeholder === "Spendings")
                    .reduce((acc, transaction) => acc - transaction.value, 0);
                const earnings = allTransactions
                    .filter(transaction => transaction.placeholder === "Earnings")
                    .reduce((acc, transaction) => acc + transaction.value, 0);

                const convertedSpendings = convertValueToSelectedCurrency(spendings, state.currency);
                const convertedEarnings = convertValueToSelectedCurrency(earnings, state.currency);

                // Оновлення стану даних після отримання результатів
                setData([
                    { name: 'Earnings', value: Math.floor(convertedEarnings) },
                    { name: 'Spendings', value: Math.floor(convertedSpendings) }
                ]);
            } catch (error) {
                console.error("Помилка при отриманні транзакцій:", error);
            }
        };
        setOperations();
    }, []); // Додавання totalEarnings і totalSpendings в залежності


    const COLORS = ['lightgreen', 'pink', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const screenWidth = useScreenSize();
    const turner = screenWidth >= 767.98;

    const chartChanger = (e) => {
        const target = e.target;
        const buttonEarnings = document.getElementById("chartEarnings");
        const buttonSpendings = document.getElementById("chartSpendings")

        target.classList.add("active");
        setCurrentChart(target.id)

        if (target.id === 'chartEarnings') {
            buttonSpendings.classList.remove("active");
        } else {
            buttonEarnings.classList.remove("active");
        }
    }


    return (

        <>
            <BalanceContainer data-testid="balance" className="balance">

                <div className="balance__items">
                    <div className="balance__item">
                        <div className="balance__icon">
                            {state.symbol}
                        </div>
                        <div className="balance__content content">
                            <div className="content__title">Total transactions</div>
                            <animated.div className="content__balance">
                                {totalTransactionsCounter.animatedValue}
                            </animated.div>
                        </div>
                    </div>
                    <div className="balance__item item-balance__green">
                        <div className="balance__img">
                            <img src={up} />
                        </div>
                        <div className="balance__content content">
                            <div className="content__title">Earning transactions</div>
                            <animated.div className="content__balance">
                                {totalEarningsCounter.animatedValue}
                            </animated.div>
                        </div>
                    </div>
                    <div className="balance__item item-balance__pink">
                        <div className="balance__img">
                            <img src={down} />
                        </div>
                        <div className="balance__content content">
                            <div className="content__title">Spending transactions</div>
                            <animated.div className="content__balance">
                                {totalSpendingsCounter.animatedValue}
                            </animated.div>
                        </div>
                    </div>
                </div>
            </BalanceContainer >

            <h1>Detailed charts about Earnings and Spendings</h1>
            <Charts>
                <div className='charts__round'>
                    <PieChart className='charts__round' width={300} height={300}>
                        <Pie
                            data={data}
                            cx="35%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="pink"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend iconSize={10} layout="vertihocal" verticalAlign="middle" wrapperStyle={style} />
                    </PieChart>
                </div>
                <div className='caharts__container'>
                    <div className='charts__buttons'>
                        <Button id='chartEarnings' className='charts__button chosen active' onClick={chartChanger}>Earnings</Button>
                        <Button id='chartSpendings' className='charts__button chosen' onClick={chartChanger}>Spendings</Button>
                    </div>
                    <div className='caharts__barcontainer'>
                        {currentChart === 'chartEarnings' ?
                            <div className='charts__income'>
                                <BarChart
                                    data={dataIncome}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 5,
                                        bottom: 15,
                                    }}
                                    barSize={20}
                                    height={turner ? 300 : 260}
                                    width={turner ? 450 : 300}
                                >
                                    <XAxis dataKey="name" scale="point" padding={{ left: turner ? 5 : 25, right: 5 }} fontSize={turner ? 14 : 12} angle={turner ? 0 : 45} />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid strokeDasharray="3  3" />
                                    <Bar dataKey="value" fill="lightgreen" background={{ fill: '#eee' }} />
                                </BarChart>
                            </div>
                            :
                            <div className='charts__expenses'>
                                <BarChart
                                    data={dataExpenses}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 5,
                                        bottom: 15,
                                    }}
                                    barSize={20}
                                    height={turner ? 300 : 260}
                                    width={turner ? 450 : 300}
                                >
                                    <XAxis dataKey="name" scale="point" padding={{ left: turner ? 5 : 25, right: 5 }} fontSize={turner ? 14 : 12} angle={turner ? 0 : 45} />
                                    <YAxis />

                                    <Tooltip />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar dataKey="value" fill="pink" background={{ fill: '#eee' }} />

                                </BarChart>
                            </div>
                        }

                    </div>
                </div>
            </Charts >

        </>
    )
}

export default Statistics;
