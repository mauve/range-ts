import { While } from '../../src/impl/while';
import { expect } from 'chai';
import 'mocha';

describe('while', () => {
    it('should only return object while matching', () => {
        let array = [0, 1, 2, 3, 1, 2];

        let _while = new While<number>(array, (v) => v < 3);
        let result = [..._while];

        expect(result).to.deep.equal([0, 1, 2]);
    });
});