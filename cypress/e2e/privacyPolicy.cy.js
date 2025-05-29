it('teste a página da política de privacidade forma independente', () => {
    cy.visit('./src/privacy.html')
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('h1', 'Política de Privacidade').should('be.visible')
})