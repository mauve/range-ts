class TakeIterator<T> implements Iterator<T> {
    constructor(private underlying: Iterator<T>, private take: number) { }

    next(value?: any): IteratorResult<T> {
        if (this.take > 0) {
            this.take--;
            return this.underlying.next();
        }

        return { done: true, value: undefined };
    }

    return?(value?: any): IteratorResult<T> {
        return this.underlying.return(value);
    }

    throw?(e?: any): IteratorResult<T> {
        return this.underlying.throw(e);
    }
}

export class Take<T> implements Iterable<T> {

    constructor(private underlying: Iterable<T>, private take: number) { }

    [Symbol.iterator](): Iterator<T> {
        return new TakeIterator<T>(this.underlying[Symbol.iterator](), this.take);
    }
}