# promise-settle-all

Similar to Promise.all, but unlike Promise.all, will not reject as soon as any of the given promises is rejected, but will wait for all of the given promises to be settled.

This is useful when you want all operations to complete, even if some of them fail, before the next action can take place.

For example, when testing you might want to close all connections at the end. You don't want the next test to start until all connections are closed, even if closing one of them fails.

### Usage

```ts
import allSettled from 'promise-settle-all';

Promise.all([ Promise.reject(), fetch('https://example.com/index.html') ]).catch(err => {
    // This will execute immediately, while the call to fetch() is still pending
});

allSettled([ Promise.reject(), fetch('https://example.com/index.html') ]).catch(err => {
    // This will execute only after the call to fetch() is complete
});

```
