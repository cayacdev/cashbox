describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Cash Box');
    cy.contains('Login');
  });
});
