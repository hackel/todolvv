import TodoEntry from '@/components/TodoEntry.vue';
import { mount } from '@cypress/vue';
import Entry from '@scripts/models/Entry';
import vuetify from '@scripts/plugins/vuetify';

const mountTodoEntry = props =>
    mount(TodoEntry, {
        global: {
            plugins: [vuetify],
        },
        props,
    }).as('wrapper');

describe('TodoEntry Component', () => {
    it.only('shows a plain text string when edit=false', () => {
        mountTodoEntry({
            entry: Entry.new({ text: 'test entry' }),
            edit: false,
        });

        cy.get('input').should('not.exist');
        cy.contains('div', 'test entry').should('exist');
    });

    it('shows a text input field when edit=true', () => {
        mountTodoEntry({
            entry: Entry.new({ text: 'test entry' }),
            edit: true,
        });

        cy.getBySel('new-entry-field')
            .find('input')
            .should('exist')
            .and('have.value', 'test entry');
    });

    it('emits an update event when pressing enter', () => {
        mountTodoEntry({
            entry: Entry.new({ text: 'test entry' }),
            edit: true,
        });

        cy.getBySel('new-entry-field')
            .find('input')
            .type(' something new{Enter}')
            .should('have.value', '');

        cy.getBySel('new-entry-field')
            .get('@wrapper')
            .should(wrapper => {
                expect(wrapper.emitted('update')).to.have.length(1);
                const entry = wrapper.emitted('update')[0][0];
                expect(entry.text).to.equal('test entry something new');
            });
    });
});
