import * as yup from 'yup';

const formTest = yup.object().shape({
    name: yup
    .string()
    .required()
    .min(2,'name must be at least 2 characters')
})

export default formTest;