/**
 * @jest-environment jsdom
 */

const { validateUrl } = require("../src/client/js/validateUrl")

describe('validateUrl', ()=> {
    it('returns something', () => {
        expect(validateUrl).toBeDefined();
    })
})
