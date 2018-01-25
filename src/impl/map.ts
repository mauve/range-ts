class MapIterator<T, U> implements Iterator<U> {
    constructor(private underlying: Iterator<T>, private project: (v: T) => U) { }

    next(value?: any): IteratorResult<U> {
        let result = this.underlying.next();
        if (result.done) {
            return { done: true, value: undefined };
        }

        return {
            done: false,
            value: this.project(result.value)
        }
    }
}

export class Map<T, U> implements Iterable<U> {

    constructor(private underlying: Iterable<T>, private project: (v: T) => U) { }

    [Symbol.iterator](): Iterator<U> {
        return new MapIterator(this.underlying[Symbol.iterator](), this.project);
    }
}