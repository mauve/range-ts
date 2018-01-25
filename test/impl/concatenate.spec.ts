import { Concatenate } from '../../src/impl/concatenate';
import { expect } from 'chai';
import 'mocha';

describe('ForwardRange Algorithms', () => {
    describe('concatenate', () => {
        it('concat 1 range', () => {
            let concat = new Concatenate<number>([[0, 1, 2]]);
            let result = [...concat];

            expect(result).to.deep.equal([0, 1, 2]);
        });

        it('concat empty ranges', () => {
            let concat = new Concatenate<number>([[]]);
            let result = [...concat];

            expect(result).to.deep.equal([]);
        });

        it('concat several empty ranges', () => {
            let concat = new Concatenate<number>([[], []]);
            let result = [...concat];

            expect(result).to.deep.equal([]);
        });

        it('concat several ranges', () => {
            let concat = new Concatenate<number>([[0, 1], [], [2, 3]]);
            let result = [...concat];

            expect(result).to.deep.equal([0, 1, 2, 3]);
        });
    });
});