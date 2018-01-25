import { Where } from '../../src/impl/where';
import { expect } from 'chai';
import 'mocha';

describe('ForwardRange Algorithms', () => {
    describe('where', () => {
        it('should only return matching objects', () => {
            let array = [0, 1, 2, 3, 4, 5];

            let where = new Where<number>(array, (v) => v < 3);
            let result = [...where];

            expect(result).to.deep.equal([0, 1, 2]);
        });
    });
});