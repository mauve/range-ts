import { ForwardRangeImpl } from '../../src/impl/forwardrange';
import { expect } from 'chai';
import 'mocha';

describe('ForwardRangeImpl', () => {
    it('create from array', () => {
        let array = [0, 1, 2];

        let r = new ForwardRangeImpl(array);
        let result = [...r];

        expect(result).to.deep.equal([0, 1, 2]);
    });

    it('algorithms are chainable', () => {
        let array = [0, 1, 2];

        let r = new ForwardRangeImpl(array);
        let r2 = r.skip(1).take(2);
        let result = [...r2];

        expect(result).to.deep.equal([1, 2]);
    });
});