/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Get an element by its data-test attribute.
         *
         * Alias for cy.get('[data-test="${element}"]')
         *
         * @example
         * cy.getBySel('my-data-attr')...
         */
        getBySel(element: string): Chainable<any>;

        /**
         * Log in to the site.
         *
         * Log in to the default testing account by calling login without
         * arguments, or login as a specific user by setting
         * CYPRESS_EMAIL & CYPRESS_PASSWORD in your .env file.
         *
         * @example
         * cy.login();
         */
        login(): Chainable<void>;

        // /**
        //  * Log out of the site.
        //  * @example
        //  * cy.logout();
        //  */
        // logout(options?: Cypress.Loggable): Chainable<void>;
        // /**
        //  * Execute a single MySQL query and return the results.
        //  * @example
        //  * cy.mysql('select * from users where id=?', 1);
        //  */
        // mysql(query: string, ...parameters: (string|number|Array)[]): Chainable<Object[]>
        // /**
        //  * Skips the test if a DB connection is not available.
        //  */
        // requireDB(): Chainable<boolean>;
        // /**
        //  * Denote a section within a test.
        //  * @example
        //  * cy.section('Verify something');
        //  * cy.get('[data-cy=something]').should('be.visible');
        //  * @example
        //  * // Section content may be wrapped for code clarity.
        //  * cy.section('Verify something', () => {
        //  *     cy.get('[data-cy=something]').should('be.visible');
        //  * })
        //  */
        // section(title: string, fn?: function): Chainable<any>;
        // /**
        //  * Select the nth `<option>` of a `<select>`.
        //  * @example
        //  * cy.get('select').selectNth(1);
        //  */
        // selectNth(index: number): Chainable<JQuery<any>>;
        // /**
        //  * Update the stubbed response of a named route.
        //  * @example
        //  * cy.route('/api/example').as('exampleRoute');
        //  * cy.setRouteResponse(`@exampleRoute`, 'fixture:example');
        //  * cy.setRouteResponse(`@exampleRoute`, { ok: true });
        //  */
        // setRouteResponse(routeAlias: string, response: any);
        // /**
        //  * Get and set state _synchronously_.
        //  *
        //  * @example Retrieve the value of `key1`.
        //  * cy.state('key1');
        //  * @example Set the value of `key1` to 123.
        //  * cy.state('key1', 123);
        //  * @example Retrieve all of the existing state.
        //  * cy.state();
        //  */
        // state(key?: string, value?: any): any;
        // /**
        //  * Iterate through a list of elements and scope all subsequent cy commands to within each element.
        //  * @example
        //  * cy.get('dl').withinEach(() => {
        //  *     cy.get('dt').should('be.visible');
        //  *     cy.get('dd').should('be.visible');
        //  * })
        //  */
        // withinEach(fn: (element: JQuery<HTMLElement>, index: number, list: HTMLElement[]) => void): Chainable<JQuery<HTMLElement>>;
    }
}

// <reference types="chai" />
// declare module Chai {
//     interface Assertion {
//         /**
//          * Checks if the string matches a date format.
//          * @example
//          * expect("4/24/19 3:26pm").to.have.dateFormat("M/D/YY h:mma");
//          * cy.wrap("4/24/19 3:26pm").should("have.dateFormat", "M/D/YY h:mma");
//          */
//         dateFormat(format: string, strict?: boolean): Assertion;
//         /**
//          * Assert numeric value.
//          * @example
//          * expect('1').to.be.numeric;
//          * cy.wrap('1').should('be.numeric');
//          */
//         numeric: Assertion;
//         /**
//          * Checks if the string matches a glob pattern.
//          * @example
//          * expect("/users/comments/1").to.be.route("/users/comments/*")
//          * cy.wrap("/users/comments/1").should("be.route", "/users/comments/*")
//          */
//         route(pattern: string, options?: MinimatchOptions): Assertion;
//     }
// }
