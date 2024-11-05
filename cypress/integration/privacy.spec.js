it('testa a ', function() {  //caso de teste
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})