import { forward_range } from '../src/range';
import { expect } from 'chai';
import 'mocha';

describe('Public API', () => {
    describe('ForwardRange', () => {
        it('should create from array', () => {
            let r = forward_range([0, 1, 2]);
            let a = [...r];
            expect(a).to.deep.equal([0, 1, 2]);
        });

        it('should concatenate iterables when several arguments given', () => {
            let r = forward_range([0, 1, 2], [3, 4, 5]);
            let a = [...r];
            expect(a).to.deep.equal([0, 1, 2, 3, 4, 5]);
        });

        it('should return empty range when no arguments given', () => {
            let r = forward_range();
            let a = [...r];
            expect(a).to.deep.equal([]);
        });
    });
});