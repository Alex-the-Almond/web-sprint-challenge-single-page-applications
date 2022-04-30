import React from 'react';

function Orders ({details}) {
    if(!details) {
        return <h3>Your Order was NOT processed!</h3>
    }
        return(
            <div className='order-container'>
                <h2>{details.orderName}</h2>
                <p>Size: {details.pizzaSize}</p>
                <p>Sauce: {details.sauceSelector}</p>
                {
                    <div>
                        Toppings:
                        <ul>
                            {details.toppingOptions.map((top,idx) => <li key={idx}>{top}</li>)}
                        </ul>
                    </div>
                }
                <p>Special Instructions: {details.specialInstructions}</p>
            </div>
        )
}
export default Orders