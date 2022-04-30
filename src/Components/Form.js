import React from 'react';
import {useHistory} from 'react-router-dom';

const OrderForm = (props) => {
    const {values, submit, change, disabled, errors, checkbox} = props;
    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
        history.push('/orders');
        submit();
    };

    return(
        <form id='pizza-form' className='pizza-form-container' onSubmit={onSubmit}>
            <div className='pizza-container'>
                <div className='errors'>
                    <div>{errors.pizzaSize}</div>
                    <div>{errors.sauceSelector}</div>
                    <div>{errors.orderName}</div>
                </div>
                <label className='sizeSelector'> Pizza Size: 
                <select name='pizzaSize' id='size-dropdown' onChange={change} value={values.pizzaSize}>
                    <option>--Select Size--</option>
                    <option value={values.small} >Small</option>
                    <option value={values.medium} >Medium</option>
                    <option value={values.large} >Large</option>
                    <option value={values.extraLarge} >Extra-Large</option>
                </select>
                </label>
                <div>
                    <label> Choose a Sauce: 
                        <select name='sauceSelector' onChange={change} value={values.sauceSelector}>
                            <option>--Select your Sauce--</option>
                            <option value={values.classic}>Classic</option>
                            <option value={values.bbq}>BBQ</option>
                            <option value={values.alfredo}>Alfredo</option>
                        </select>
                    </label>
                </div>
                <div className='topping-options'>
                    <div>
                        Pepperoni<input checked={values.pepperoni} type='checkbox' name='pepperoni' onChange={checkbox} id='pepperoni' />
                    </div>
                    <div>
                        Ham<input checked={values.ham} type='checkbox' name='ham' onChange={checkbox} id='ham' />
                    </div>
                    <div>
                        Sausage<input checked={values.sausage} type='checkbox' name='sausage' onChange={checkbox} id='sausage' />
                    </div>
                    <div>
                        Mushrooms<input checked={values.mushroom} type='checkbox' name='mushrooms' onChange={checkbox} id='mushrooms'/>
                    </div>
                    <div>
                        Bell Peppers<input checked={values.bellPeppers} type='checkbox' name='bellPeppers' onChange={checkbox} id='bellPeppers' /> 
                    </div>
                    <div>
                      Onions<input checked={values.onions} type='checkbox' name='onions' onChange={checkbox} id='onions' />
                    </div>
                    <div>
                       Olives<input checked={values.olives} type='checkbox' name='olives' onChange={checkbox} id="olives" />
                    </div>
                </div>
                <div className='specialInstructions'>
                    <label>Special Instructions: 
                        <input type='text' onChange={change} name='specialInstructions' id='special-text' />
                    </label>
                </div>
                <div>
                    <label>Order Name: 
                        <input type='text' onChange={change} name='orderName' id='name-input' />
                    </label>
                    <div>
                    <button id='order-button' type='submit' disabled={disabled} />Submit
                    </div>
                </div>
            </div>
        </form>
    )
}

export default OrderForm