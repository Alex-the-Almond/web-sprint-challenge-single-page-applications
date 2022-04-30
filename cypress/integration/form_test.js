describe('BloomTech Eats', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza');
    })


    const orderNameInput = () => cy.get('input[name=orderName]');
    const specialInstructionsInput = () => cy.get('input[name=specialInstructions]');
    const pepperoni = () => cy.get('input[name=pepperoni]');
    const ham = () => cy.get('input[name=ham]');
    const sausage = () => cy.get('input[name=sausage]');
    const mushrooms = () => cy.get('input[name=mushrooms]');
    const bellPeppers = () => cy.get('input[name=bellPeppers]');
    const onions = () => cy.get('input[name=onions]');
    const olives = () => cy.get('input[name=olives]');
    const pizzaSize = () => cy.get('select[name=pizzaSize]');
    const sauceSelector = () => cy.get('select[name=sauceSelector]');
    const submitBtn = () => cy.get('button[id=order-button]');
    const pizzaBtn = () => cy.get('button[id=order-pizza]');

   
    it('Can select pizza size, sauce, and toppings, and type in text fields and submit', () => {
        pizzaSize().should('exist')
        .select('Large')
        
        sauceSelector().should('exist')
        .select('Alfredo')

        pepperoni().click()
        ham().click()
        mushrooms().click()
        sausage().click()
        bellPeppers().click()
        onions().click()
        olives().click()

        specialInstructionsInput().should('exist')
        .should('have.value', '')
        .type('No outer Crust')
        .should('have.value', 'No outer Crust')

        orderNameInput().should('exist')
        .should('have.value', '')
        .type('Whatever')
        .should('have.value', 'Whatever')

        submitBtn().should('exist')
        .click()
    })

})