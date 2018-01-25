import { Skip } from '../../src/impl/skip';
import { expect } from 'chai';
import 'mocha';

describe('ForwardRange Algorithms', () => {
    describe('skip', () => {
        it('should skip specified elements', () => {
            let array = [0, 1, 2, 3, 4, 5];

            let skip = new Skip<number>(array, 2);
            let result = [...skip];

            expect(result).to.deep.equal([2, 3, 4, 5]);
        });

        it('zero skips no elements', () => {
            let array = [0, 1, 2, 3, 4, 5];

            let skip = new Skip<number>(array, 0);
            let result = [...skip];

            expect(result).to.deep.equal([0, 1, 2, 3, 4, 5]);
        });

        it('handles skipping over empty range', () => {
            let array = [];

            let skip = new Skip<number>(array, 2);
            let result = [...skip];

            expect(result).to.deep.equal([]);
        });
    });
});