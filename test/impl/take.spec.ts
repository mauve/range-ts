import { Take } from '../../src/impl/take';
import { expect } from 'chai';
import 'mocha';

describe('ForwardRange Algorithms', () => {
    describe('take', () => {
        it('should take specified elements', () => {
            let array = [0, 1, 2, 3, 4, 5];

            let take = new Take<number>(array, 2);
            let result = [...take];

            expect(result).to.deep.equal([0, 1]);
        });

        it('zero takes no elements', () => {
            let array = [0, 1, 2, 3, 4, 5];

            let take = new Take<number>(array, 0);
            let result = [...take];

            expect(result).to.deep.equal([]);
        });

        it('handles take from an empty range', () => {
            let array = [];

            let take = new Take<number>(array, 2);
            let result = [...take];

            expect(result).to.deep.equal([]);
        });
    });
});