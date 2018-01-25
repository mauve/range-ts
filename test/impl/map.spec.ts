import { Map } from '../../src/impl/map';
import { expect } from 'chai';
import 'mocha';

describe('ForwardRange Algorithms', () => {
    describe('map', () => {
        it('should call the mapper', () => {
            let array = [0, 1, 2];

            let map = new Map<number, number>(array, (v) => v * 2);
            let result = [...map];

            expect(result).to.deep.equal([0, 2, 4]);
        });
    });
});