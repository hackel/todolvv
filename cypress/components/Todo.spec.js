import Todo from '@/components/Todo.vue';
import { mount } from '@cypress/vue';
import vuetify from '@scripts/plugins/vuetify';
import { createPinia } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

describe('Todo Component', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/entry', { fixture: 'entries.json' }).as('getEntries');

        mount(Todo, {
            global: {
                plugins: [createPinia(), vuetify],
            },
        });

        cy.wait('@getEntries');
    });

    const storeRouteHandler = req => {
        req.reply(201, {
            data: {
                uuid: uuidv4(),
                text: req.body.text,
                completed_at: null,
                expires_at: null,
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
            },
        });
    };

    it('Playground', () => {
        cy.get('.v-card-text').should('be.visible');

        cy.getBySel('entries-table').find('tbody > tr').should('have.length', 11);
    });

    it('can add a new entry', () => {
        cy.intercept('POST', '/api/entry', storeRouteHandler).as('storeEntry');
        cy.getBySel('new-entry-field').type('a new entry{Enter}').wait('@storeEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 12)
            .eq(1)
            .should('contain.text', 'a new entry');

        cy.getBySel('new-entry-field').type('a second entry');
        cy.getBySel('new-entry-button').click().wait('@storeEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 13)
            .eq(1)
            .should('contain.text', 'a second entry');
    });

    it('can remove an entry', () => {
        cy.intercept('DELETE', '/api/entry/*', { statusCode: 204 }).as('deleteEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 11)
            .eq(3)
            .find('[data-test=remove-button]')
            .click()
            .wait('@deleteEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 10)
            .and('not.contain.text', 'Suscipit consequatur corporis soluta officiis tenetur est.');
    });

    it('can duplicate an entry', () => {
        cy.intercept('POST', '/api/entry', storeRouteHandler).as('storeEntry');
        cy.getBySel('new-entry-field').type('a new entry{Enter}').wait('@storeEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 12)
            .eq(1)
            .find('[data-test=duplicate-button]')
            .click()
            .wait('@storeEntry');

        cy.getBySel('entries-table').find('tbody > tr').should('have.length', 13);
        cy.getBySel('entries-table').find('tr:contains("a new entry")').should('have.length', 2);
    });

    it('can mark an entry as completed', () => {
        cy.intercept('PUT', '/api/entry/*', req => {
            req.reply(200, {
                data: {
                    ...req.body,
                    uuid: uuidv4(),
                    completed_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            });
        }).as('updateEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 11)
            .eq(3)
            .find('[data-test=complete-checkbox]')
            .click()
            .should('be.checked');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 11)
            .eq(3)
            .find('div')
            .should('have.css', 'text-decoration', 'line-through rgb(0, 0, 0)');
    });
});
