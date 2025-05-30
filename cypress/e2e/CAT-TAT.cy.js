describe('Central de atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it.only('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz ', 10)

    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('souza')
    cy.get('#email').type('matheussouza@gmail.com')
    cy.get('#phone').type('11987654321')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)
  })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('souza')
    cy.get('#email').type('email-invalido')
    cy.get('#phone').type('11987654321')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

    it('validação de digitos númericos', () => {

    cy.get('#phone')
      .type('telefone-validacao')
      .should('have.value', '')
  })

  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.clock()

    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('matheussouza@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')

  })

    it('Usando clear', () => {
    cy.get('#firstName').type('Matheus').should('have.value', 'Matheus').clear().should('have.value', '')
    cy.get('#lastName').type('Souza').should('have.value', 'Souza').clear().should('have.value', '')
    cy.get('#email').type('matheussouza@gmail.com').should('have.value', 'matheussouza@gmail.com').clear().should('have.value', '')
    cy.get('#open-text-area').type('teste').clear()
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos', () => {
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.clock()
    const data = {
      firstName: 'Henrique',
      lastName: 'Lima',
      email: 'szmatheussouza@gmail.com',
      text: 'Teste de envio com comando customizado',
    }

    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it.only('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it.only('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it.only('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it.only('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it.only('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it.only('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('./cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it.only('verifica que a política de privacidade abre em outra aba sem precisar de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .should('have.attr', 'target', '_blank')
    })

  it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
      cy.contains('h1', 'Política de Privacidade').should('be.visible')
  })

  it.only('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

  it.only('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area').invoke('val', 'Um texto qualquer')
      .should('have.value', 'Um texto qualquer')
  })

  it.only('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
  })
})