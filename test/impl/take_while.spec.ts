import { TakeWhile } from '../../src/impl/take_while';
import { expect } from 'chai';
import 'mocha';

describe('ForwardRange Algorithms', () => {
    describe('take while', () => {
        it('should only return object while matching', () => {
            let array = [0, 1, 2, 3, 1, 2];

            let take_while = new TakeWhile<number>(array, (v) => v < 3);
            let result = [...take_while];

            expect(result).to.deep.equal([0, 1, 2]);
        });
    });
});