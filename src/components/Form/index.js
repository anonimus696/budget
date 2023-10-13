
import { useState, useContext } from 'react';

import { AppContext } from '../../providers/context'

import { conversionRates } from '../../constants';



import PropTypes from 'prop-types'
// import { Wrapper } from '@storybook/blocks';
import { Wrapper, Colomn, Input, Comment, Button } from './styles.js'
import up from '../../assets/img/up.svg'
import down from '../../assets/img/down.svg'



const Form = (props) => {
    const [form, setForm] = useState({
        value: '',
        date: new Date().toISOString().substring(0, 10),
        comment: 'Transaction',
        placeholder: 'Earnings'
    })

    const { state } = useContext(AppContext);

    const [category, setCategory] = useState('');//!

    const incomeCategories = ['Зарплатня', 'Колядки', 'Дав Бог', 'Зайшла ставка', 'Інше'];
    const expenseCategories = ['Продукти', 'Одяг', 'Комуналка', 'Інше'];

    const onSubmit = (e) => {
        e.preventDefault();

        const numericValue = parseFloat(form.value); // Парсимо рядок у число

        const convertedValue = state.currency !== 'UAH' ? numericValue / conversionRates[state.currency] : numericValue;

        const value = form.placeholder === 'Spendings' ? -convertedValue : convertedValue;

        props.onChange({ ...form, value });

        // props.onChange(form);
        setForm({
            ...form,
            value: '',
            comment: ''

        });

        props.onCloseFormModal();

    }
    // console.log('onchange event:', e);
    const onChange = (e) => {
        const { value, name } = e.target;

        if (name === 'value') {
            const newValue = value.replaceAll(/[+-]/g, '');
            const errorElement = document.getElementById(`error`);

            if (!newValue.match(/^[0-9]*$/)) {
                errorElement.hidden = false;
                return;
            } else {
                errorElement.hidden = true;
            }
            setForm({
                ...form,
                [name]: newValue
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    }

    const handleIncomeButtonClick = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            placeholder: 'Earnings'
        });

        // Додаємо клас "active" до кнопки
        e.target.classList.add("active");

        // Забираємо клас "active" з іншої кнопки
        const otherButton = document.getElementById("expense");
        if (otherButton) {
            otherButton.classList.remove("active");
        }
    }

    const handleExpenseButtonClick = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            placeholder: 'Spendings'
        });

        // Додаємо клас "active" до кнопки
        e.target.classList.add("active");

        // Забираємо клас "active" з іншої кнопки
        const otherButton = document.getElementById("income");
        if (otherButton) {
            otherButton.classList.remove("active");
        }
    }

    //!
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setCategory(value);

        // Опціонально можна очистити поле коментаря при зміні категорії:
        setForm({
            ...form,
            comment: value,
        });
    };
    //!



    return (
        <Wrapper Wrapper >
            <Button id='income' className='chosen active' onClick={handleIncomeButtonClick}>Доходи</Button>
            <Button id='expense' className='chosen ' onClick={handleExpenseButtonClick}>Витрати</Button>
            {/* <FormattedMessage id="hello" /> */}
            <form onSubmit={onSubmit} data-testid="form">
                <div className='formitems'>
                    <div className='formitems__item'>
                        <div className='formitems__content'>
                            <div className='formitems__title'>You enter</div>
                            <div className='formitems__value'>{form.placeholder}</div>
                        </div>
                        <div className='formitems__icon formitems__icon-svg'><img src={form.placeholder === 'Spendings' ? down : up} /></div>
                    </div>
                    <div className='formitems__item'>
                        <div className='formitems__content'>
                            <div className='formitems__title'>Currency</div>
                            <div className='formitems__value'>{state.currency}</div>
                        </div>
                        <div className='formitems__icon'>{state.symbol}</div>
                    </div>
                </div>
                <Colomn>
                    <Input data-testid="value"
                        value={form.value}
                        onChange={onChange}
                        name="value"
                        type='tel'
                        placeholder={form.placeholder}
                        required
                        autocomplete="off"
                        maxLength={9}
                    />
                    <div hidden id='error'>Шо ти вводиш довбойоб?<br /> тут мають бути цифри</div>

                    <Input data-testid="date"
                        value={form.date}
                        onChange={onChange}
                        name="date" type='date'
                    />
                    {/* <Comment data-testid="comment" name='comment' value={form.comment} onChange={onChange} /> */}

                    <Comment
                        name="comment"
                        value={category}
                        // onChange={onChange}
                        onChange={handleCategoryChange}
                    >
                        <option>Виберіть категорію</option>
                        {form.placeholder === 'Earnings'
                            ? incomeCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))
                            : expenseCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                    </Comment>

                    {category === 'Інше' && (
                        <Input
                            data-testid="other-category"
                            onChange={onChange}
                            name="comment"
                            type="text"
                            maxLength={20} // Максимальна довжина тексту - 20 символів
                            placeholder="Інше"
                        />
                    )}

                    <Button data-testid="save-button">Save</Button>
                </Colomn>
            </form>
        </Wrapper>
    )
}

Form.propTypes = {
    onChange: PropTypes.func
};

export default Form;




/* 
    const [transactionType, setTransactionType] = useState('Доходи');//!лишній крок
        setTransactionType('Доходи');//!лишній крок
        setTransactionType('Витрати');//!лишній крок
        props.onChange({ ...form, value, type: form.palaceholder });
*/

/*
        setForm({
            ...form,
            [name]: value
        });
        console.log('Value:', value);
    */

/*
                            value={form.comment}

                    <Comment
                        name='comment'
                        value={form.comment}
                        onChange={onChange}>
                        <option >Виберіть категрію</option>
                        <option value="Продукти">Продукти</option>
                        <option value="Одяг">Одяг</option>
                        <option value="Комуналка">Комуналка</option>
                        <option value="Інше">Інше</option>
                    </Comment>
*/

/*
  const [category, setCategory] = useState('');//!


  
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setCategory(value);

        // Опціонально можна очистити поле коментаря при зміні категорії:
        setForm({
            ...form,
            comment: '',
        });
    };


                    <Comment
                        name="comment"
                        value={category} // Відслідковуємо категорію, а не коментар
                        onChange={handleCategoryChange}
                    >
                        <option>Виберіть категорію</option>
                        <option value="Продукти">Продукти</option>
                        <option value="Одяг">Одяг</option>
                        <option value="Комуналка">Комуналка</option>
                        <option value="Інше">Інше</option>
                    </Comment>

                    {category === 'Інше' && (
                        <Input
                            data-testid="other-category"
                            value={form.comment}
                            onChange={onChange}
                            name="comment"
                            type="text"
                            maxLength={20} // Максимальна довжина тексту - 20 символів
                            placeholder="Інше"
                        />
                    )}
*/