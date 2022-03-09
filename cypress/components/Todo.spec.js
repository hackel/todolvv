import Todo from '@/components/Todo.vue';
import { mount } from '@cypress/vue';
import vuetify from '@scripts/plugins/vuetify';
import { createPinia } from 'pinia';

describe('Todo Component', () => {
    beforeEach(() =>
        mount(Todo, {
            global: {
                plugins: [createPinia(), vuetify],
            },
        }),
    );

    it('Playground', () => {
        cy.get('.v-card-text').should('be.visible');

        cy.getBySel('entries-table').find('tbody > tr').should('have.length', 4);
    });

    it('can add a new entry', () => {
        cy.getBySel('new-entry-field').type('a new entry{Enter}');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 5)
            // TODO: Should be first!
            .last()
            .should('contain.text', 'a new entry');

        cy.getBySel('new-entry-field').type('a second entry');

        cy.getBySel('new-entry-button').click();

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 6)
            // TODO: Should be first!
            .last()
            .should('contain.text', 'a second entry');
    });

    it('can remove an entry', () => {
        cy.getBySel('new-entry-field').type('a new entry{Enter}');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 5)
            .last()
            .find('[data-test=remove-button]')
            .click();

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 4)
            .and('not.contain.text', 'a new entry');
    });

    it('can duplicate an entry', () => {
        cy.getBySel('new-entry-field').type('a new entry{Enter}');

        cy.getBySel('entries-table')
            .find('tbody > tr')
            .should('have.length', 5)
            .last()
            .find('[data-test=duplicate-button]')
            .click();

        cy.getBySel('entries-table').find('tbody > tr').should('have.length', 6);

        cy.getBySel('entries-table').find('tr:contains("a new entry")').should('have.length', 2);
    });

    it('can mark an entry as completed', () => {
        cy.getBySel('new-entry-field').type('a new entry{Enter}');

        cy.getBySel('entries-table')
            .contains('tr', 'a new entry')
            .find('[data-test=complete-checkbox]')
            .click()
            .should('be.checked');

        cy.getBySel('entries-table')
            .contains('div', 'a new entry')
            .should('have.css', 'text-decoration', 'line-through rgb(0, 0, 0)');
    });
});
