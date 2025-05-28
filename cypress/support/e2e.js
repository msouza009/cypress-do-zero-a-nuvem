// Comandos customizados.

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Matheus',
    lastName: 'Souza',
    email: 'szmatheussouza@gmail.com',
    text: 'Teste de envio com comando customizado',
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
}) 

