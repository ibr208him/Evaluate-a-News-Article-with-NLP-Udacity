/**
 * @jest-environment jsdom
 */
const { checkForName } = require("../src/client/js/nameChecker");

describe('nameChecker', ()=> {
    it('returns something', () => {
        expect(checkForName).toBeDefined();
    })
})
