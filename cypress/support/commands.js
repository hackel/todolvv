// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('login', (email, password) => {
    email = 'test@example.com' || Cypress.env('CYPRESS_EMAIL');
    password = 'password' || Cypress.env('CYPRESS_PASSWORD');

    Cypress.log({
        name: 'login',
        message: email,
        consoleProps: () => ({ email, password }),
    });

    cy.request({ method: 'GET', url: '/sanctum/csrf-cookie', log: false })
        .getCookie('XSRF-TOKEN', { log: false })
        .then(cookie => {
            cy.request({
                method: 'POST',
                url: '/login',
                failOnStatusCode: false,
                body: {
                    email,
                    password,
                },
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(cookie.value),
                },
                log: false,
            });
        });
});
