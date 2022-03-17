import DateTimePicker from '@/components/DateTimePicker.vue';
import { mount } from '@cypress/vue';
import { Temporal } from '@js-temporal/polyfill';
import Entry from '@scripts/models/Entry';
import vuetify from '@scripts/plugins/vuetify';

const mountComponent = props =>
    mount(DateTimePicker, {
        global: {
            plugins: [vuetify],
        },
        props,
    }).as('wrapper');

describe('TodoEntry Component', () => {
    it('shows a plain text string when edit=false', () => {
        const entry = Entry.new({ expires_at: Temporal.Instant.from('2020-01-01T12:00Z') });
        mountComponent({
            edit: false,
            entry,
            modelValue: entry.expires_at,
        });

        cy.get('input').should('not.exist');
        // TODO: Need to explicitly set TZ env var prior to launching Cypress or this will fail.
        cy.getBySel('datetime-text').should('exist').and('contain.text', '01/01/2020, 06:00');
    });

    it('shows a text input field when edit=true', () => {
        const entry = Entry.new({ expires_at: Temporal.Instant.from('2020-01-01T12:00Z') });
        mountComponent({
            edit: true,
            entry,
            modelValue: entry.expires_at,
        });

        cy.getBySel('datetime-field')
            .find('input')
            .should('exist')
            .and('have.value', '2020-01-01T06:00');
    });

    it('emits a submit event when pressing enter', () => {
        const entry = Entry.new({ expires_at: Temporal.Instant.from('2020-01-01T12:00Z') });
        mountComponent({
            edit: true,
            entry,
            modelValue: entry.expires_at,
        });

        cy.getBySel('datetime-field').find('input').type('2020-01-01T12:00').trigger('keyup', {
            key: 'Enter',
        });

        cy.get('@wrapper').should(wrapper => {
            expect(wrapper.emitted('submit')).to.have.length(1);
        });
    });
});
