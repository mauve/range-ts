class SkipWhileIterator<T> implements Iterator<T> {
    private skip = true;

    constructor(private underlying: Iterator<T>, private predicate: (v: T) => boolean) { }

    next(value?: any): IteratorResult<T> {
        let result = this.underlying.next();
        while (this.skip && !result.done && this.predicate(result.value)) {
            result = this.underlying.next();
        }
        this.skip = false;
        return result;
    }

    return?(value?: any): IteratorResult<T> {
        return this.underlying.return(value);
    }

    throw?(e?: any): IteratorResult<T> {
        return this.underlying.throw(e);
    }
}

export class SkipWhile<T> implements Iterable<T> {

    constructor(private underlying: Iterable<T>, private predicate: (v: T) => boolean) { }

    [Symbol.iterator](): Iterator<T> {
        return new SkipWhileIterator<T>(this.underlying[Symbol.iterator](), this.predicate);
    }
}