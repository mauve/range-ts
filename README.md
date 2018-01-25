# range-ts

A simple linq-like library for TypeScript.

# Caveat

Currently only models `ForwardRange`, i.e. a range which can only be iterated from the beginning to the end.
`RandomAccessRange` and other concepts will be added later.

# Examples

```ts
import { forward_range } from './range.ts';

let r = forward_range([0, 1, 2, 3, 1, 1]);

r.skip(1);
// returns a ForwardRange which equals [1, 2, 3, 1, 1]

r.skip((v) => v < 3)
// returns a ForwardRange which equals [3, 1, 1]

r.take(2);
// returns a ForwardRange which equals [0, 1]

r.take((v) => v < 2)
// returns a ForwardRange which equals [0, 1]

r.where((v) => v < 2);
// returns a ForwardRange which equals [0, 1, 1, 1]

r.map((v) => v * 2);
// returns a ForwardRange which equals [0, 2, 4, 6, 2, 2]

r.prepend(forward_range([0, 0]));
// returns a ForwardRange which equals [0, 0, 0, 1, 2, 3, 1, 1]

r.append(forward_range([0, 0]));
// returns a ForwardRange which equals [0, 1, 2, 3, 1, 1, 0, 0]

r.zip(forward_range([5, 5, 5, 5, 5, 5]));
// returns a ForwardRange which equals [0, 5, 1, 5, 2, 5, 3, 5, 1, 5, 1, 5]
```

Operations are also chainable:

```ts
import { forward_range } from './range.ts';

let r = forward_range([0, 1, 2, 3, 1, 1]);

r.skip(1).take(2).map((v) => v * 2);
// returns a ForwardRange which equals [2, 4]
```

