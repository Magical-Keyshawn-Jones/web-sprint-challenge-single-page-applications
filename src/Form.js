import { Route, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import React from 'react'

function Form () {

    // Initial Values
    const initialFormValues = {
        name: '',
        specialText: '',
        pepperoni: false,
        olives: false,
        cheese: false,
        pineapples: false
    }
    
    // Error Values
    const errorValues = {
        name: '',
        specialText:''
    }

    // Storing Values
    const [formValues, setFormValues] = useState(initialFormValues);
    const [errors, setError] = useState(errorValues);

    // console.log(formValues)

    // Making Test form formValues
    const formTest = yup.object().shape({
        name: yup
        .string()
        .min(2,'name must be at least 2 characters'),
        specialText: yup.string(),
        pepperoni: yup.boolean(),
        olives: yup.boolean(),
        cheese: yup.boolean(),
        pineapples: yup.boolean()
    })
    

    // Adding Input Test
    function validator (name, value) {
        yup.reach(formTest, name)
        .validate(value)
        .then(()=>{
            setError({...formValues, [name]: ''})
        })
        .catch((err)=>{
            setError({...formValues, [name]: err.errors[0]})
        })
    }

    // Adding Dynamic input function
    function onChange (event) {
        const { name, value, id, checked, type } = event.target

        const valueToUse = type === 'checkbox' ? checked : value

        setFormValues({...formValues, [name]: valueToUse})

        validator(name,valueToUse)
    }

    // Making a Post sender for Form 
    function sender (letter) {
        axios.post('https://reqres.in/api/orders', letter)
        .then(object => console.log(object))
        .catch(err => console.log('error!',err))
    }

    function cleanPosting () {

        const refinement = {
            name: formValues.name.replace(/\s+/g, ' ').trim(),
            specialText: formValues.specialText.replace(/\s+/g, ' ').trim(),
            toppings: ['pepperoni', 'olives', 'cheese', 'pineapples'].filter(toppers => formValues[toppers])
        }

        sender(refinement)
    }

    // Making Submit function for onSubmit
    function onSubmit  (event) {

        event.preventDefault()

        cleanPosting()

        setFormValues(initialFormValues)
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
                <form id='pizza-form' onSubmit={onSubmit}>
                    <label>
                        Name of Order
                        <input
                        type='text'
                        id='name-input'
                        name='name'
                        value={formValues.name}
                        onChange={onChange}
                        />
                    </label>
                    <div>
                        {errors.name}
                    </div>
                    <label>
                        Pizza Size
                        <select id='size-dropdown'>
                            <option>Only one size! sorry! 30"</option>
                            <option>32 size please</option>
                        </select>
                    </label>
                    <label>
                        Toppings
                        <input
                            type='checkbox'
                            name='pepperoni'
                            checked={formValues.pepperoni}
                            onChange={onChange}
                        />
                        <input
                            type='checkbox'
                            name='olives'
                            checked={formValues.olives}
                            onChange={onChange}
                        />
                        <input
                            type='checkbox'
                            name='cheese'
                            checked={formValues.cheese}
                            onChange={onChange}
                        />
                        <input
                            type='checkbox'
                            name='cheese'
                            checked={formValues.cheese}
                            onChange={onChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Special Instructions
                        <input
                            id='special-text'
                            type='text'
                            name='specialText'
                            value={formValues.specialText}
                            onChange={onChange}
                        />
                    </label>
                    <br/>
                    <button id='order-button'>Order</button>
                </form>
            </Route>
        </div>
    )
}



export default Form