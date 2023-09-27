import { useState, useEffect, useCallback } from "react";
import { STATUSES } from './constants';
import { getData, addItem, deleteItem, updateItem } from './utils/indexdb'
import Balance from "./components/Balance";

export const useBooleanToggle = (initialStatus = false) => {
    const [status, setStatus] = useState(initialStatus);

    const handleStatusChange = () => {
        console.log('switch state');
        setStatus((currrentStatus) => !currrentStatus);
    };

    return {
        status,
        handleStatusChange
    }
}


export const useData = () => {
    const [state, setState] = useState({
        transactions: [],
        error: '',
        status: STATUSES.IDLE,
        hasNextPage: true
    });

    useEffect(() => {
        setState({
            ...state,
            status: STATUSES.PENDING
        });

        getData(0, 20).then((transactions) => {
            setState({
                ...state,
                transactions,
                status: STATUSES.SUCCESS,
                hasNextPage: true
            })
        }).catch((e) => {
            setState({
                ...state,
                transactions: [],
                status: STATUSES.ERROR,
                error: e,
                hasNextPage: false
            })
        })
    }, [])

    const loadMoreRows = useCallback(() => {
        setState({
            ...state,
            status: STATUSES.PENDING
        });

        getData(state.transactions.length, 20).then((transactions) => {
            setState({
                ...state,
                transactions: [...state.transactions, ...transactions],
                status: STATUSES.SUCCESS
            })
        }).catch(() => {
            setState({
                ...state,
                hasNextPage: false
            })
        })
    }, [state])


    const pushTransction = useCallback((data) => {
        const transaction = {
            ...data,
            value: +data.value,
            id: Date.now()
        }
        setState((state) => ({
            ...state,
            transactions: [transaction, ...state.transactions]
        }));

        addItem(transaction);
    }, [])

    const onDelete = useCallback((id) => {
        // Видалення транзакції за її id
        setState((state) => ({
            ...state,
            transactions: state.transactions.filter((item) => item.id !== id)

        }));

        deleteItem(id);
    }, [setState]);


    const onStarClick = useCallback((id) => {
        const item = state.transactions.find((i) => i.id === id);

        updateItem({
            ...item,
            isStared: !item.isStared
        }).then(() => {
            setState((state) => ({
                ...state,
                transactions: state.transactions.map((item) => item.id !== id ? item : {
                    ...item,
                    isStared: !item.isStared
                })
            }))
        })

    }, [setState, state])




    return {
        ...state,
        pushTransction,
        onDelete,
        onStarClick,
        loadMoreRows
    }
}
