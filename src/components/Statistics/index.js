import React, { useEffect, useState, useContext } from 'react';
import { getItems } from "../../utils/indexdb";

import { PieChart, Pie, Tooltip, Cell, Legend, Line, YAxis, XAxis, CartesianGrid, Bar, BarChart, LabelList } from "recharts";


import { Charts, ChartsWrapper } from './styles'

import convertValueToSelectedCurrency from '../../hooks';
import { AppContext } from "../../providers/context";
import { Button } from '../Form/styles';

import { BalanceContainer } from '../Balance/styles.js'
import up from '../../assets/img/up.svg'
import down from '../../assets/img/down.svg'

import { useSpring, animated } from 'react-spring';//!
import { useScreenSize } from '../../hooks';
// import { Link } from 'react-scroll';



export const Statistics = () => {
    const { state } = useContext(AppContext);
    const [data, setData] = useState([]); // Додавання стану для даних

    const [dataIncome, setDataIncome] = useState([]); // Додавання стану для даних
    const [dataExpenses, setDataExpenses] = useState([]); // Додавання стану для даних

    const [currentChart, setCurrentChart] = useState('chartEarnings'); //

    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalSpendings, setTotalSpendings] = useState(0);

    const [chart, setChart] = useState(true)

    //!
    const [isAnimating, setIsAnimating] = useState(false);

    const useAnimatedCounter = (value) => {

        const spring = useSpring({
            from: { number: 0 },
            to: { number: value },
            config: { duration: 1800 },
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

    function chartTurner() {
        if (chart) {
            setChart(false)
        } else {
            setChart(true)
        }
    }


    return (

        <ChartsWrapper>
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

            <h2>Detailed charts about Earnings and Spendings</h2>
            <div className='buttoncontainer'>
                <div onClick={chartTurner} className='buttoncontainer__chartbutton'>
                    {chart
                        ?
                        <svg class="svg-icon" viewBox="0 0 20 20">
                            <path d="M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z"></path>
                        </svg>
                        :
                        <svg class="svg-icon" viewBox="0 0 20 20">
                            <path fill="none" d="M11.015,11.009l5.063,1.191c0.288,0.068,0.579-0.088,0.682-0.364c0.35-0.931,0.528-1.909,0.528-2.91c0-4.559-3.71-8.269-8.27-8.269c-4.559,0-8.269,3.71-8.269,8.269c0,4.56,3.71,8.27,8.269,8.27c0.891,0,1.768-0.144,2.605-0.426c0.279-0.094,0.445-0.38,0.389-0.668L11.015,11.009z M9.018,16.024c-3.914,0-7.097-3.185-7.097-7.099s3.184-7.097,7.097-7.097s7.098,3.184,7.098,7.097c0,0.686-0.097,1.36-0.291,2.012l-5.427-1.276c-0.192-0.046-0.397,0.01-0.54,0.147c-0.144,0.138-0.207,0.339-0.169,0.534l1.07,5.461C10.193,15.951,9.61,16.024,9.018,16.024z"></path>
                            <path fill="none" d="M19.183,13.897c-0.08-0.149-0.22-0.256-0.384-0.295l-5.945-1.398c-0.191-0.046-0.397,0.01-0.54,0.147c-0.143,0.138-0.207,0.34-0.168,0.534l1.171,5.985c0.032,0.165,0.135,0.309,0.281,0.394c0.089,0.052,0.191,0.079,0.293,0.079c0.064,0,0.127-0.01,0.188-0.031c0.154-0.052,3.75-1.311,5.134-4.931C19.272,14.223,19.261,14.046,19.183,13.897z M14.325,17.928l-0.857-4.377l4.375,1.029C16.896,16.443,15.229,17.48,14.325,17.928z"></path>
                        </svg>
                    }


                </div>
            </div>
            <Charts>
                {chart
                    ?
                    <div className='charts__round'>
                        <PieChart className='charts__round' width={turner ? 600 : 300} height={turner ? 400 : 300}>
                            <Pie
                                data={data}
                                cx={turner ? "50%" : "35%"}
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={turner ? 200 : 100}
                                fill="pink"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend iconSize={8} layout="vertihocal" verticalAlign="middle"
                                wrapperStyle={
                                    {
                                        top: "50%",
                                        right: "-3%",
                                        transform: 'translate(0, -50%)',
                                        lineHeight: '18px',
                                    }
                                }
                            />
                        </PieChart>
                    </div>
                    :
                    <div className='caharts__container'>
                        <div className='charts__buttons'>
                            <Button id='chartEarnings' className='charts__button chosen active' onClick={chartChanger}>Earnings</Button>
                            <Button id='chartSpendings' className='charts__button chosen' onClick={chartChanger}>Spendings</Button>
                        </div>
                        <div id='scrollToBottom' className='caharts__barcontainer'>
                            {currentChart === 'chartEarnings' ?
                                <div className='charts__income'>
                                    <BarChart
                                        data={dataIncome}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 0,
                                            bottom: 15,
                                        }}
                                        barSize={20}
                                        height={turner ? 300 : 260}
                                        width={turner ? 450 : 300}
                                    >
                                        <XAxis dataKey="name" scale="point" padding={{ left: turner ? 5 : 25, right: 5 }} fontSize={turner ? 14 : 12} angle={turner ? 0 : 45} />
                                        <YAxis fontSize={turner ? 16 : 12} />
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
                                            left: 0,
                                            bottom: 15,
                                        }}
                                        barSize={20}
                                        height={turner ? 300 : 260}
                                        width={turner ? 450 : 300}
                                    >
                                        <XAxis dataKey="name" scale="point" padding={{ left: turner ? 5 : 25, right: 5 }} fontSize={turner ? 14 : 12} angle={turner ? 0 : 45} />
                                        <YAxis fontSize={turner ? 16 : 12} />

                                        <Tooltip />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Bar dataKey="value" fill="pink" background={{ fill: '#eee' }} />

                                    </BarChart>
                                </div>
                            }

                        </div>
                    </div>
                }


            </Charts >

        </ChartsWrapper>
    )
}

export default Statistics;
