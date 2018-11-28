import allSettled from '../src';
import { waiter, defer } from './promise-utils';
import * as expect from 'expect';

describe('allsettled', () => {
    it('should resolve if all promises are resolved', async () => {
        let result = await allSettled([ Promise.resolve(1), Promise.resolve(2) ]);
        expect(result).toEqual([ 1, 2 ]);
    });

    it('should reject if one promise is rejected', async () => {
        let result = waiter(allSettled([ Promise.resolve(1), Promise.reject(2) ]));
        await result.promise;
        expect(result.rejected).toBe(true);
    });

    it('should not be rejected until all promises are settled', async () => {
        let d = defer<number>();
        let result = waiter(allSettled([ Promise.reject(), d ]));

        await Promise.resolve();
        expect(result.settled).toBe(false);

        d.resolve(2);
        await result.promise;
        expect(result.rejected).toBe(true);
    });

    it('should resolve an empty set of promises', async () => {
        let result = await allSettled([]);
        expect(result).toEqual([]);
    });

    it('should resolve a simple value', async () => {
        let result = await allSettled([ 1, Promise.resolve(2)]);
        expect(result).toEqual([ 1, 2 ]);
    });
});
