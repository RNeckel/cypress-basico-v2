Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Ricardo')
    cy.get('#lastName').type('Neckel')
    cy.get('#email').type('ricardoneckel@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})