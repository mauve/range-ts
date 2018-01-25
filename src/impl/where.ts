class WhereIterator<T> implements Iterator<T> {
    constructor(private underlying: Iterator<T>, private predicate: (T) => boolean) { }

    next(value?: any): IteratorResult<T> {
        let next = this.underlying.next();

        while (!next.done && !this.predicate(next.value)) {
            next = this.underlying.next();
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

export class Where<T> implements Iterable<T> {

    constructor(private underlying: Iterable<T>, private predicate: (T) => boolean) { }

    [Symbol.iterator](): Iterator<T> {
        return new WhereIterator(this.underlying[Symbol.iterator](), this.predicate);
    }
}