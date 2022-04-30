import React, { useState, useEffect } from "react";
import { Router, Route, Link, Switch, useHistory } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import * as yup from 'yup';
import OrderForm from './Components/Form.js';
import formSchema from './Validation/formSchema.js';
import Orders from './Components/Orders.js';

const initialFormValues = {
  pizzaSize: '',
  sauceSelector: '',
  pepperoni: false,
  ham: false,
  sausage: false,
  mushrooms: false,
  bellPeppers: false,
  onions: false,
  olives: false,
  specialInstructions: '',
  orderName: '',
};

const initialFormErrors = {
  pizzaSize: '',
  sauceSelector: '',
  orderName: '',
};

const initialOrders = [];

const initialDisabled = true;

const App = () => {
  
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [orders, setOrders] = useState(initialOrders);
  const [disabled, setDisabled] = useState(initialDisabled);
  
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    history.push('/pizza');
  };
  
  const postOrder = (to) => {
    axios.post('https://reqres.in/api/orders', to)
    .then((res) => {
      setOrders([res.data, ...orders]);
    }).catch(err => console.error(err))
    .finally(() => setFormValues(initialFormValues))
  };

  const checkboxChange = (event) => {
    const {name} = event.target;
    const {checked} = event.target;
    setFormValues({...formValues, [name]: checked});
  };

  const inputChange = (event) => {
    const {name} = event.target;
    const {value} = event.target;
    validate(name, value);
    setFormValues({...formValues, [name]: value});
  }
  
  const validate = (name,value) => {
    yup.reach(formSchema, name).validate(value)
    .then(() => setFormErrors({...formErrors, [name]: ''}))
    .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}));
  };
  
  const formSubmit = () => {
    const newOrder = {
      sauceSelector: formValues.sauceSelector,
      pizzaSize: formValues.pizzaSize,
      toppingOptions: ['pepperoni', 'ham', 'sausage', 'mushrooms', 'bellPeppers', 'onions', 'olives'].filter(toppings => !!formValues[toppings]),
      specialInstructions: formValues.specialInstructions.trim(),
      orderName: formValues.orderName.trim(),
    };
    postOrder(newOrder);
  };

  useEffect(() => {
     formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  })
  
  return (
   <div className='App'>
     <header>
       <Link to='/'>Home</Link>
       <Link to='/pizza'>Create</Link>
       <Link to='/order(s)'>Orders</Link>
    </header>
     <main>
       <h1>BloomTech Eats</h1>
       <img src='https://imgs.search.brave.com/ho_KWA-Xmb-BAcwsq8XuEwhIVeHNBihEvIFMrLq4oT0/rs:fit:1200:1000:1/g:ce/aHR0cHM6Ly9mbS5j/bmJjLmNvbS9hcHBs/aWNhdGlvbnMvY25i/Yy5jb20vcmVzb3Vy/Y2VzL2ltZy9lZGl0/b3JpYWwvMjAxNi8w/OC8yMi8xMDM4ODQ0/ODYtR2V0dHlJbWFn/ZXMtNDkyMDQ3OTEy/LjE5MTB4MTAwMC5q/cGc' alt='Pizza in pan'/>
       <Switch>
         <Route exact path='/'>
           <form onSubmit={onSubmit}>
             <button id='order-pizza' type='submit'>Create Pizza</button>
           </form>
           </Route>
         <Route exact path='/pizza' id='pizza-order'>
           <h2>Pick your Toppings!</h2>
           <OrderForm values={formValues} change={inputChange} checkbox={checkboxChange} submit={formSubmit} errors={formErrors} disabled={disabled} />
         </Route>
         <Route exact path='/orders' id='orders'>
          <h1>Orders</h1>
          {
            orders.map(order => {
              return (
                <Orders key={order.id} details={order} />
              )
            })
          }
         </Route>
       </Switch>
     </main>
     <footer>
     <div class="social"><a href="#"><i class="icon ion-social-instagram"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-facebook"></i></a></div>
            <ul class="list-inline">
              <div>
              <a href="/">Home</a>
              </div>
                <div>
                <a href="/pizza">Create Your Own Pizza!</a>
                </div>
                <div>
                <a href="/orders">Orders Page</a>
                </div>
            </ul>
            <p class="copyright">Alexander Aymond © 2022</p>
        </footer>
    
  </div>
  );
};
export default App;
