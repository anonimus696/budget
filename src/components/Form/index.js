import { useState } from 'react';
import { FormattedMessage } from "react-intl";


import PropTypes from 'prop-types'
// import { Wrapper } from '@storybook/blocks';
import { Wrapper } from './styles.js'
import { Colomn } from './styles.js'
import { Input } from './styles.js'
import { Comment } from './styles.js'
import { Button } from './styles.js'


const Form = (props) => {
    const [form, setForm] = useState({
        value: '',
        date: new Date().toISOString().substring(0, 10),
        comment: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();
        props.onChange(form);
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

        setForm({
            ...form,
            [name]: value
        });
        console.log('Value:', value);
    }
    return (
        <Wrapper>
            <FormattedMessage id="hello" />
            <form onSubmit={onSubmit} data-testid="form">
                <Colomn>
                    <Input data-testid="value" value={form.value}
                        onChange={onChange}
                        name="value" type='number'
                        placeholder="Sum" />
                    <Input data-testid="date" value={form.date}
                        onChange={onChange}
                        name="date" type='date'
                        placeholder="Sum" />
                    <Comment data-testid="comment" name='comment' value={form.comment} onChange={onChange} />
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

