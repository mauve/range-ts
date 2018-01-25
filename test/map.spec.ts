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
    });
});