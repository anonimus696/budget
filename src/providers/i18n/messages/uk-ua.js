import { LOCALES } from '../constants'

export default {
    [LOCALES.UKRAINIAN]: {
        hello: 'Привіт Світ!',
        zero: 'У вас ще немає транзакцій натисніть плюс, щоб додати',
        here: 'тут',

        categories: {
            incomeCategories: "Зарплатня,Колядки,Дав Бог,Лотерея,Інше",
            expenseCategories: "Продукти,Одяг,Комуналка,Інше",
            other: "Інше",
            category: "Виберіть категорію",
        },

        menu: {
            home: 'Головна',
            settings: 'Параметри',
            statistic: 'Статистика',
            about: 'Про нас'
        },
        balance: {
            actual: 'Актуальний баланс',
            earnings: 'Доходи',
            spendings: 'Витрати',
            favorites: 'Улюблені',
        },
        statistic: {
            total: 'Загалом транзакцій',
            earnings: 'Транзакцій з доходами',
            spendings: 'Транзакцій з витратами',
            charts: 'Графіки',
            transaction: 'Транзакція',
        },
        form: {
            category: 'Категорія',
            сurrency: 'Валюта',
            save: 'Зберегти',
        },
        settings: {
            setting: 'Налаштування',
            language: 'Мова',
            test: 'Для тестування',
            password: 'пароль не вірний',
            advanced: 'Розширені налаштування',
            close: 'Закрити розширені',
            addData: 'Додати дані (тест лодера)',
            delData: 'Видалити дані (тест лодера)',
            enter: 'Введіть пароль',
        },
        about: {
            page: 'Інформація',
            p1: 'Щоб додати транзакцію, натисніть " + " на головній сторінці.',
            p2: 'Додаток створений для відстеження власних витат і доходів та перегляду статистики по них.',
            p3: 'Розроблено за основі навчальних матеріалів',
        },
    }
}

{/* <FormattedMessage id="balance.earnings" /> */ }