import Todo from '@/components/Todo.vue';
import { mount } from '@cypress/vue';
import vuetify from '@scripts/plugins/vuetify';
import { createPinia } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { Temporal } from '@js-temporal/polyfill';

describe('Todo Component', () => {
    beforeEach(() => {
        cy.viewport(1000, 800);
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
                expires_at: req.body.expires_at,
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
            },
        });
    };

    it('Playground', () => {
        cy.get('.v-card-text').should('be.visible');

        cy.getBySel('entries-table').find('tbody > tr').should('have.length', 11);
    });

    it('shows completed entries as checked', () => {
        cy.getBySel('entries-table').within($table => {
            cy.get('tbody > tr').eq(2).within(isCheckedAndStrikethrough);
            cy.get('tbody > tr').eq(9).within(isCheckedAndStrikethrough);
        });

        function isCheckedAndStrikethrough($tr) {
            cy.get('[data-test=complete-checkbox] input').should('be.checked');
            cy.get('[data-test=entry-text]').should(
                'have.css',
                'text-decoration',
                'line-through solid rgb(0, 0, 0)',
            );
        }
    });

    it('can add a new entry', () => {
        cy.intercept('POST', '/api/entry', storeRouteHandler).as('storeEntry');

        // Submit using enter key
        cy.getBySel('new-entry-field').type('a new entry{Enter}').wait('@storeEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 12)
            .eq(1)
            .should('contain.text', 'a new entry');

        // Submit using new entry button
        cy.getBySel('new-entry-field').type('second entry');
        cy.getBySel('new-entry-button').click().wait('@storeEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 13)
            .eq(1)
            .should('contain.text', 'second entry');

        // Include expiration date
        cy.getBySel('new-entry-field').type('third entry');
        const expiresAt = Temporal.Now.zonedDateTimeISO().add({ days: 7 }).toPlainDateTime();
        cy.getBySel('new-entry-expires-at')
            .click()
            .type(expiresAt.toString({ smallestUnit: 'minute' }));
        cy.getBySel('new-entry-button').click().wait('@storeEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 14)
            .eq(1)
            .should('contain.text', 'third entry')
            .and(
                'contain.text',
                // locale options from DateTimePicker.vue
                expiresAt.toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: Temporal.Now.timeZone().toString(),
                }),
            );
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
                    expires_at: req.body.expires_at,
                    updated_at: new Date().toISOString(),
                },
            });
        }).as('updateEntry');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .eq(3)
            .find('[data-test=complete-checkbox] input')
            .click()
            .should('be.checked');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .eq(3)
            .find('[data-test=entry-text]')
            .should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)');
    });
});
