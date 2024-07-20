/**
 * @jest-environment jsdom
 */

const { handleSubmit } = require("../src/client/js/formHandler")

describe('formHandler', ()=> {
    it('returns something', () => {
        expect(handleSubmit).toBeDefined();
    })
})
