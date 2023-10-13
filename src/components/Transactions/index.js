import { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

import Transaction from '../Transaction';

import { Filter, FilterButton } from "./styles";
import { CloseContainer, LeftRight, RightLeft } from '../Transaction/styles'

import { useData } from '../../hooks';//!



const Transactions = ({ data, loadMoreRows, onDelete, onStarClick, isNextPageLoading, hasNextPage }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [filter, setFilter] = useState("Clear"); // Початковий фільтр "Clear"



    // Функція для фільтрації даних на основі вибраного фільтру

    useEffect(() => {
        console.log(data);

        if ((filter === "Clear")) {
            setFilteredData(data); // Всі транзакції
        } else if (filter === "Spendings") {
            // Фільтруємо транзакції, якщо це витрати
            setFilteredData(data.filter(transaction => transaction.placeholder === "Spendings"));
        } else if (filter === "Earnings") {
            // Фільтруємо транзакції, якщо це доходи
            setFilteredData(data.filter(transaction => transaction.placeholder === "Earnings"));
        } else if (filter === "isStared") {
            // Фільтруємо транзакції, якщо це доходи
            setFilteredData(data.filter(transaction => transaction.isStared === true));
        }
        // Додайте інші умови фільтрації, які вам потрібні

    }, [data, filter]);


    const isItemLoaded = index => !hasNextPage || index < filteredData.length;
    const loadMoreItems = isNextPageLoading ? () => { } : loadMoreRows;
    const itemCount = hasNextPage ? filteredData.length + 1 : filteredData.length;



    const filterSettings = (e, name) => {
        const target = e.target;
        target.classList.toggle("filtered");

        if (target.classList.contains("filtered")) {
            setFilter(name)
        } else {
            setFilter("Clear")
        }

        const otherButtons = document.querySelectorAll(".filtered");
        console.log(otherButtons);
        for (const button of otherButtons) {
            if (target !== button) {
                button.classList.remove("filtered");
            }
        }
    }

    const CloseButton = () => {
        return (
            <>
                <CloseContainer onClick={(e) => filterSettings(e, 'Clear')}>
                    <LeftRight class="icon-cross"></LeftRight>
                    <RightLeft class="visually-hidden">Close</RightLeft>
                </CloseContainer >
            </>
        )
    }

    return (
        // <div>Nothing</div>
        <div style={{ height: 'calc(100vh - 247px)' }}>

            <Filter>
                <FilterButton onClick={(e) => filterSettings(e, 'isStared')}>Favorites
                    {filter === 'isStared' ? <CloseButton /> : null}
                </FilterButton>
                <FilterButton onClick={(e) => filterSettings(e, 'Spendings')}>Spendings
                    {filter === 'Spendings' ? <CloseButton /> : null}
                </FilterButton>
                <FilterButton onClick={(e) => filterSettings(e, 'Earnings')}>Earnings
                    {filter === 'Earnings' ? <CloseButton /> : null}
                </FilterButton>
            </Filter>

            <AutoSizer>
                {({ height, width }) => (
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={itemCount}
                        loadMoreItems={loadMoreItems}
                    >
                        {({ onItemsRendered, ref }) => (
                            <List
                                className="List"
                                height={height}
                                itemCount={itemCount}
                                itemSize={80}
                                width={width}
                                itemData={filteredData}
                                ref={ref}
                                onItemsRendered={onItemsRendered}
                            >
                                {({ index, style, data }) => {
                                    if (!data[index]) {
                                        return null
                                    };

                                    return (
                                        <div style={style}>
                                            <Transaction key={data[index].id}
                                                transaction={filteredData[index]}
                                                onDelete={onDelete}
                                                onStarClick={onStarClick} />
                                        </div>
                                    )
                                }}
                            </List>
                        )}
                    </InfiniteLoader>
                )}
            </AutoSizer>
        </div>

    )
}


export default Transactions;

/*
            <button onClick={() => setFilter("Spendings")}>Spendings</button>
            <button onClick={() => setFilter("Earnings")}>Earnings</button>
            <button onClick={() => setFilter("Clear")}>Clear</button>

*/


/*
    const filterTransactions = (filtered) => {
        if (filtered === "Spendings") {
            const filteredData = data.filter(transaction => transaction.value < 0);
            setFilteredData(filteredData);
        } else if (filtered === "Earnings") {
            const filteredData = data.filter(transaction => transaction.value > 0);
            setFilteredData(filteredData);
        } else if (filtered === "Clear") {
            setFilteredData(data);
        }
    };
*/
// const filteredData = data;


/*


const [defaultFilterApplied, setDefaultFilterApplied] = useState(false);//!
//!
useEffect(() => {
    // Перевірити, чи є дані та встановити фільтр "Clear" при завантаженні сторінки
    if (data.length > 0 && !defaultFilterApplied) {
        filterTransactions("Clear");
        setDefaultFilterApplied(true);
    }
}, [defaultFilterApplied, data]);
    //!
* /












/*
const Transactions = ({ data, loadMoreRows, onDelete, onStarClick, isNextPageLoading, hasNextPage }) => {
    const isItemLoaded = index => !hasNextPage || index < data.length;
    const loadMoreItems = isNextPageLoading ? () => { } : loadMoreRows;
    const itemCount = hasNextPage ? data.length + 1 : data.length;

    const isExpense = (transaction) => transaction.value.includes('-');

    return (
        // <div>Nothing</div>

        <div style={{ height: 'calc(100vh - 127px)' }}>
            <AutoSizer>
                {({ height, width }) => (
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={itemCount}
                        loadMoreItems={loadMoreItems}
                    >
                        {({ onItemsRendered, ref }) => (
                            <List
                                className="List"
                                height={height}
                                itemCount={itemCount}
                                itemSize={80}
                                width={width}
                                itemData={data}
                                ref={ref}
                                onItemsRendered={onItemsRendered}
                            >
                                {({ index, style, data }) => {
                                    if (!data[index]) {
                                        return null
                                    };

                                    return (
                                        <div style={style}>
                                            <Transaction key={data[index].id}
                                                transaction={data[index]}
                                                onDelete={onDelete}
                                                onStarClick={onStarClick} />
                                        </div>
                                    )
                                }}
                            </List>
                        )}
                    </InfiniteLoader>
                )}
            </AutoSizer>
        </div>

    )
}

*/