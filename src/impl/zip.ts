class ZipIterator<T> implements Iterator<T> {
    private current: number = 0;
    private results: IteratorResult<T>[];

    constructor(private iterators: Iterator<T>[]) {
        this.results = this.iterators.map((r) => r.next());
    }

    next(value?: any): IteratorResult<T> {
        if (this.done()) {
            return { done: true, value: undefined };
        }

        let result = this.results[this.current];
        this.results[this.current] = this.iterators[this.current].next();

        this.current++;
        if (this.current >= this.iterators.length) {
            this.current = 0;
        }

        return { done: false, value: result.value };
    }

    private done(): boolean {
        for (let r of this.results) {
            if (!r.done)
                return false;
        }

        return true;
    }
}

export class Zip<T> implements Iterable<T> {

    constructor(private iteratables: Iterable<T>[]) { }

    [Symbol.iterator](): Iterator<T> {
        let iterators = this.iteratables.map((iter) => iter[Symbol.iterator]())

        return new ZipIterator<T>(iterators);
    }
}