import { Route, Link } from 'react-router-dom';
import { useState } from 'react';
import formTest from './Validation';
import * as yup from 'yup';
import React from 'react'

function Form () {

    // Initial Values
    const initialFormValues = {
        name: ''
    }
    
    // Error Values
    const errorValues = {
        name: ''
    }

    // Storing Values
    const [formValues, setFormValues] = useState(initialFormValues);
    const [error, setError] = useState(errorValues);

    // Adding Input Test
    function validator (name, value) {
        yup.reach(formTest, name)
        .validate(value)
        .then(()=>{
            setError({...error, [name]: ''})
        })
        .catch((err)=>{
            setError({...error, [name]: err.error[0]})
        })
    }

    // Adding Dynamic input function
    function onChange (event) {
        const { name, value, id, checked, type } = event.target

        const valueToUse = type === 'checkbox' ? checked : value
        validator(name,valueToUse)

        setFormValues({...formValues, [name]: value})
    }
    

    return (
        <div>
            <div>
            <Link to='/'>
                <button id='order-pizza'>Order Pizza</button>
            </Link>
            </div>
            I'm about the pizza
            <Route path='/pizza'>
                Hi I'm a form
                <form id='pizza-form'>
                    <input
                    type='text'
                    id='name-input'
                    name='name'
                    value={formValues.name}
                    onChange={onChange}
                    />
                    <div>
                        {error.name}
                    </div>
                </form>
            </Route>
        </div>
    )
}



export default Form