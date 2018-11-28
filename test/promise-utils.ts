export interface Waiter<T> {
    promise: Promise<void>;
    settled: boolean;
    resolved: boolean;
    rejected: boolean;
    value: T | undefined;
    error: any | undefined;
}

export function waiter<T>(promise: Promise<T>): Waiter<T> {
    let w: Waiter<T> = {
        settled: false,
        resolved: false,
        rejected: false,
        value: undefined,
        error: undefined,
        promise: promise.then(value => {
            w.settled = true;
            w.resolved = true;
            w.value = value;
        }, err => {
            w.error = err;
            w.settled = true;
            w.rejected = true;
        })
    };
    return w;
}

export interface Deferred<T> {
    promise: Promise<T>;
    resolve(value: T): void;
    reject(err?: any): void;
}

export function defer<T>() {
    let d = { } as Deferred<T>;
    d.promise = new Promise<T>((resolve, reject) => {
        d.resolve = resolve;
        d.reject  = reject;
    });
    return d;
}
