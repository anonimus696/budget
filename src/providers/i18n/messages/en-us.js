import { LOCALES } from '../constants'

export default {
    [LOCALES.ENGLISH]: {
        hello: 'Hello World!',
        zero: 'You do not have any transaction yet, please press plus to add a new transaction',

        categories: {
            incomeCategories: "Salary,Caroling,Gift,Lottery,Other",
            expenseCategories: "Groceries,Clothing,Utilities,Other",
            other: "Other",
            category: "Choose category",
        },


        menu: {
            home: 'Home',
            settings: 'Settings',
            statistic: 'Statistic',
            about: 'About'
        },
        balance: {
            actual: 'Actual balance',
            earnings: 'Earnings',
            spendings: 'Spendings',
            favorites: 'Favorites',
        },
        statistic: {
            total: 'Total transactions',
            earnings: 'Earning transactions',
            spendings: 'Spending transactions',
            charts: 'Charts',
            transaction: 'Transaction',
        },
        form: {
            category: 'Category',
            сurrency: 'Currency',
            save: 'Save',
        },
        settings: {
            setting: 'Settings',
            language: 'Language',
            test: 'For testing',
            password: 'password not correct',
            advanced: 'Advanced settings',
            close: 'Close advanced',
            addData: 'Add data (test loader)',
            delData: 'Del data(test loader)',
            enter: 'Enter password',
        },
        about: {
            page: 'About page',
            p1: 'The application is designed to track your own expenses and income and view statistics about them.',
            p2: 'To add a transaction, click the " + " button on the main page.',
            p3: 'Developed based on the educational materials of',
        },

    }
}