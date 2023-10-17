import React, { useEffect, useState, useContext } from 'react';
import { getItems } from "../../utils/indexdb";

import { PieChart, Pie, Tooltip, Cell, Legend, Line, YAxis, XAxis, CartesianGrid, Bar, BarChart, LabelList } from "recharts";


import { Charts } from './styles'

import convertValueToSelectedCurrency from '../../hooks';
import { AppContext } from "../../providers/context";
import { Button } from '../Form/styles';



const style = {
    top: "50%",
    right: "-7%",
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
};


export const Statistics = () => {
    const { state } = useContext(AppContext);
    const [data, setData] = useState([]); // Додавання стану для даних

    const [dataIncome, setDataIncome] = useState([]); // Додавання стану для даних
    const [dataExpenses, setDataExpenses] = useState([]); // Додавання стану для даних

    const [currentChart, setCurrentChart] = useState('chartEarnings'); //

    useEffect(() => {

        const setOperations = async () => {
            try {
                const incomeCategories = ['Зарплатня', 'Колядки', 'Дав Бог', 'Зайшла ставка', 'Інше'];//!
                const expenseCategories = ['Продукти', 'Одяг', 'Комуналка', 'Інше'];//!

                const allTransactions = await getItems();

                const transactionsByCategoryIncome = {};
                const transactionsByCategoryExpenses = {};
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
                    value: transactionsByCategoryIncome[category]
                }));
                const transactionsByCategoryExpensesArray = Object.keys(transactionsByCategoryExpenses).map(category => ({
                    name: category,
                    value: transactionsByCategoryExpenses[category]
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
            <h1>Detailed charts about Earnings and Spendings</h1>
            <Charts>
                <div className='charts__round'>
                    <PieChart className='charts__round' width={300} height={300}>
                        <Pie
                            data={data}
                            cx="40%"
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
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    </PieChart>
                </div>
                <div className='caharts__container'>
                    <div className='charts__buttons'>
                        <Button id='chartEarnings' className='charts__button active' onClick={chartChanger}>Earnings</Button>
                        <Button id='chartSpendings' className='charts__button' onClick={chartChanger}>Spendings</Button>
                    </div>
                    <div className='caharts__barcontainer'>
                        {currentChart === 'chartEarnings' ?
                            <div className='charts__income'>
                                <BarChart
                                    width={300}
                                    height={300}
                                    data={dataIncome}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                    <XAxis dataKey="name" scale="point" padding={{ left: 5, right: 5 }} fontSize={12} angle={45} />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid strokeDasharray="3  3" />
                                    <Bar dataKey="value" fill="lightgreen" background={{ fill: '#eee' }} />
                                    {/* <Bar dataKey="value" fill="#82ca9d">
                                        <LabelList dataKey="name" position="top" angle={0} />
                                    </Bar> */}
                                </BarChart>
                            </div>
                            :
                            <div className='charts__expenses'>
                                <BarChart
                                    width={450}
                                    height={300}
                                    data={dataExpenses}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                    <XAxis dataKey="name" scale="point" padding={{ left: 5, right: 5 }} fontSize={15} />
                                    <YAxis />

                                    <Tooltip />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar dataKey="value" fill="pink" background={{ fill: '#eee' }} />

                                </BarChart>
                            </div>
                        }

                    </div>
                </div>
            </Charts>

        </>
    )
}

export default Statistics;
