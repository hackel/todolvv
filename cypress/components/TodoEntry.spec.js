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
    it('shows a plain text string when edit=false', () => {
        const entry = Entry.new({ text: 'test entry' });
        mountTodoEntry({
            edit: false,
            entry,
            modelValue: entry.text,
        });

        cy.get('input').should('not.exist');
        cy.contains('div', 'test entry').should('exist');
    });

    it('shows a text input field when edit=true', () => {
        const entry = Entry.new({ text: 'test entry' });
        mountTodoEntry({
            edit: true,
            entry,
            modelValue: entry.text,
        });

        cy.getBySel('entry-field').find('input').should('exist').and('have.value', 'test entry');
    });

    it('emits a submit event when pressing enter', () => {
        const entry = Entry.new({ text: 'test entry' });
        mountTodoEntry({
            edit: true,
            entry,
            modelValue: entry.text,
        });

        cy.getBySel('entry-field').find('input').type(' something new{Enter}');
        cy.getBySel('entry-field').find('input').should('have.value', 'test entry something new');

        cy.get('@wrapper').should(wrapper => {
            expect(wrapper.emitted('submit')).to.have.length(1);
        });
    });
});
