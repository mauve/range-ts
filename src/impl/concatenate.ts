class ConcatenateIterator<T> implements Iterator<T> {
    private current: IteratorResult<Iterator<T>>;

    constructor(private iter: Iterator<Iterator<T>>) {
        this.current = iter.next();
    }

    next(value?: any): IteratorResult<T> {
        if (this.current.done) {
            this.current = this.iter.next();

            if (this.current.done) {
                return { done: true, value: undefined };
            }
        }

        let result = this.current.value.next();
        if (result.done) {
            this.current = this.iter.next();
            return this.next();
        }

        return result;
    }
}

export class Concatenate<T> implements Iterable<T> {

    constructor(private iteratables: Iterable<T>[]) { }

    [Symbol.iterator](): Iterator<T> {
        let iterators = this.iteratables.map((iter) => iter[Symbol.iterator]())

        return new ConcatenateIterator<T>(iterators[Symbol.iterator]());
    }
}