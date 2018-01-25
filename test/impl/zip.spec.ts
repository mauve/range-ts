import { Zip } from '../../src/impl/zip';
import { expect } from 'chai';
import 'mocha';

describe('ForwardRange Algorithms', () => {
    describe('zip', () => {
        it('should interleave two arrays of same size', () => {
            let a1 = [0, 1];
            let a2 = [2, 3];


            let zip = new Zip<number>([a1, a2]);
            let result = [...zip];

            expect(result).to.deep.equal([0, 2, 1, 3]);
        });

        it('should zip until all ranges are empty', () => {
            let a1 = [0, 1];
            let a2 = [2, 3, 4];


            let zip = new Zip<number>([a1, a2]);
            let result = [...zip];

            expect(result).to.deep.equal([0, 2, 1, 3, undefined, 4]);
        });

        it('should handle two empty arrays', () => {
            let a1 = [];
            let a2 = [];


            let zip = new Zip<number>([a1, a2]);
            let result = [...zip];

            expect(result).to.deep.equal([]);
        });
    });
});