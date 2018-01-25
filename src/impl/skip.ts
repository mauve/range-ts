class SkipIterator<T> implements Iterator<T> {
    constructor(private underlying: Iterator<T>, private skip: number) { }

    next(value?: any): IteratorResult<T> {
        while (this.skip > 0) {
            this.skip--;
            this.underlying.next();
        }
        return this.underlying.next();
    }

    return?(value?: any): IteratorResult<T> {
        return this.underlying.return(value);
    }

    throw?(e?: any): IteratorResult<T> {
        return this.underlying.throw(e);
    }
}

export class Skip<T> implements Iterable<T> {

    constructor(private underlying: Iterable<T>, private skip: number) { }

    [Symbol.iterator](): Iterator<T> {
        return new SkipIterator<T>(this.underlying[Symbol.iterator](), this.skip);
    }
}