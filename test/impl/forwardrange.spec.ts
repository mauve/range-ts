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

    it('skip by count', () => {
        let array = [0, 1, 2];

        let r = new ForwardRangeImpl(array);
        let result = [...r.skip(1)];

        expect(result).to.deep.equal([1, 2]);
    });

    it('skip by predicate', () => {
        let array = [0, 1, 2];

        let r = new ForwardRangeImpl(array);
        let result = [...r.skip((v) => true)];

        expect(result).to.deep.equal([]);
    });

    it('take by count', () => {
        let array = [0, 1, 2];

        let r = new ForwardRangeImpl(array);
        let result = [...r.take(1)];

        expect(result).to.deep.equal([0]);
    });

    it('take by predicate', () => {
        let array = [0, 1, 2];

        let r = new ForwardRangeImpl(array);
        let result = [...r.take((v) => true)];

        expect(result).to.deep.equal([0, 1, 2]);
    });
});