import { SkipWhile } from '../../src/impl/skip_while';
import { expect } from 'chai';
import 'mocha';

describe('ForwardRange Algorithms', () => {
    describe('skip while', () => {
        it('should skip specified elements', () => {
            let array = [0, 1, 2, 3, 4, 5];

            let skip = new SkipWhile<number>(array, (v) => v < 2);
            let result = [...skip];

            expect(result).to.deep.equal([2, 3, 4, 5]);
        });

        it('handles skipping over empty range', () => {
            let array = [];

            let skip = new SkipWhile<number>(array, (v) => true);
            let result = [...skip];

            expect(result).to.deep.equal([]);
        });

        it('can skip everything', () => {
            let array = [0, 1];

            let skip = new SkipWhile<number>(array, (v) => true);
            let result = [...skip];

            expect(result).to.deep.equal([]);
        });
    });
});