/// <reference types="Cypress" />
//serve para adicionar intelisense

describe('Central de Atendimento ao Cliente TAT', function() { //suite de testes
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {  //caso de teste
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() { //caso de teste
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'  
        cy.get('#firstName').type('Ricardo')
        cy.get('#lastName').type('Neckel')
        cy.get('#email').type('ricardoneckel@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {  //caso de teste
        cy.get('#firstName').type('Ricardo')
        cy.get('#lastName').type('Neckel')
        cy.get('#email').type('ricardoneckel@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.exist')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {  //caso de teste
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function() {  //caso de teste
        cy.get('#firstName').type('Ricardo')
        cy.get('#lastName').type('Neckel')
        cy.get('#email').type('ricardoneckel@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {  //caso de teste
        cy.get('#firstName').type('Ricardo').should('have.value', 'Ricardo').clear().should('have.value', '')
        cy.get('#lastName').type('Neckel').should('have.value', 'Neckel').clear().should('have.value', '')
        cy.get('#email').type('ricardoneckel@gmail.com').should('have.value', 'ricardoneckel@gmail.com').clear().should('have.value', '')
        cy.get('#open-text-area').type('Ricardo teste 123').should('have.value', 'Ricardo teste 123').clear().should('have.value', '')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {  //caso de teste
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //comandos personalizados
    it('envia o formuário com sucesso usando um comando customizado', function() {  //caso de teste
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function() {  //caso de teste
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {  //caso de teste
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {  //caso de teste
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {  //caso de teste
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {  //caso de teste
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })   
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {  //caso de teste
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    //upload de arquivos
    it('seleciona um arquivo da pasta fixtures', function() {  //caso de teste
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function(input){
            //console.log(input);
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {  //caso de teste
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function(input){
            //console.log(input);
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {  //caso de teste
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
        
    })
    //links que abrem em outra aba
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {  //caso de teste
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        
    })

    it.only('acessa a pagina da politica de privacidade removendo o target e então clicando no link', function() {  //caso de teste
        cy.get('#privacy a').invoke('removeAttr','target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

  })
  