import CombinedError = require('combine-errors');

export default function allSettled<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;
export default function allSettled<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<[T1, T2, T3, T4]>;
export default function allSettled<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[T1, T2, T3]>;
export default function allSettled<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[T1, T2]>;
export default function allSettled<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;

/**
 * Similar to Promise.all, but unlike Promise.all, will not reject as soon as any
 * of the given promises is rejected, but will wait for all of the given promises
 * to be settled.
 *
 * @param {Iterable<PromiseLike<TAll> | TAll>} promises
 * @returns {Promise<TAll[]>}
 * @throws A combined error containing all rejected promises
 */
export default function allSettled<TAll>(promises: Iterable<TAll | PromiseLike<TAll>>): Promise<TAll[]> {
    var errors: any[] = [];
    return Promise.all<TAll>(Array.from(promises).map(
            promise => Promise.resolve(promise).catch(err => (errors.push(err), undefined as unknown as TAll)))
        ).then((result: TAll[]) => {
            if (errors.length) {
                throw CombinedError(errors);
            } else {
                return result;
            }
        });
}
