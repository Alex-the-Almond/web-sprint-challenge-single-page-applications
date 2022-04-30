import * as yup from 'yup';

const formSchema = yup.object().shape({
    sauceSelector: yup.string().required('You must select a sauce'),
    pizzaSize: yup.string().required('You must select the size of your Pizza'),
    orderName: yup.string().trim().required('You must provide a name for the Order').min(2, 'name must be at least 2 characters'),
    specialInstructions: yup.string().trim()
});

export default formSchema