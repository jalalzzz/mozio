describe('empty spec', () => {
  it('passes', () => {
    cy.visit(' http://127.0.0.1:5173/')
  })
  it('check the button add disable and input empty', () => {

    cy.get('#btnAdd').should('be.disabled');
    cy.get('#btnShow').should('be.disabled');
    cy.get('#departure_input').should('be.empty')
    cy.get('#destination_input').should('be.empty')
    cy.get('#departure_dt_input').should('be.empty')
    cy.get('#num_adults').should('be.empty')
    cy.get('#num_adults').invoke('val')
    .then((val) => {
      
      expect(val).to.equal('1');
    })

  })

  it('check the button add enable after add values ', () => {

  

cy.get('#departure_input').click();
cy.get('#departure_input').type('Paris');
cy.get('.rw-list-option').click();
cy.get('#destination_input').click();
cy.get('#destination_input').type('lyon');
cy.get('#destination_listbox > .rw-list-option').click();
cy.get('.rw-i-calendar > path').click();
cy.get('.rw-calendar-row:nth-child(5) > .rw-cell:nth-child(4) > span').click();

    
    cy.get('#btnAdd').should('not.be.disabled');
    

  })
  it('CLICK add button appaer table', () => {

  


    cy.get('#btnAdd').click();
    cy.get('#btnAdd').should('be.disabled');
    cy.get('#btnRemove').should('not.be.disabled');
    cy.get('#btnShow').should('not.be.disabled');
        
    
      })
      it('CLICK remove button reset every things', () => {

      cy.get('#btnRemove').click();
        cy.get('#btnAdd').should('be.disabled');
        cy.get('#btnShow').should('be.disabled');
            
        
          })

})
