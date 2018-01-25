class TakeWhileIterator<T> implements Iterator<T> {
    done = false;

    constructor(private underlying: Iterator<T>, private predicate: (v: T) => boolean) { }

    next(value?: any): IteratorResult<T> {
        if (this.done) {
            return { done: true, value: undefined };
        }

        let next = this.underlying.next();
        if (next.done) {
            this.done = true;
            return { done: true, value: undefined };
        }

        if (!this.predicate(next.value)) {
            this.done = true;
            return { done: true, value: undefined };
        }

        return next;
    }

    return?(value?: any): IteratorResult<T> {
        return this.underlying.return(value);
    }

    throw?(e?: any): IteratorResult<T> {
        return this.underlying.throw(e);
    }
}

export class TakeWhile<T> implements Iterable<T> {

    constructor(private underlying: Iterable<T>, private predicate: (v: T) => boolean) { }

    [Symbol.iterator](): Iterator<T> {
        return new TakeWhileIterator(this.underlying[Symbol.iterator](), this.predicate);
    }
}