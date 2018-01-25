import { ForwardRange, Predicate, Projection } from '../range';
import { Skip } from './skip';
import { Take } from './take';
import { Where } from './where';
import { TakeWhile } from './take_while';
import { Map } from './map';
import { Concatenate } from './concatenate';
import { Zip } from './zip';
import { SkipWhile } from './skip_while';


export class ForwardRangeImpl<T> implements ForwardRange<T> {
    constructor(private iterable: Iterable<T>) { }

    skip(countOrPredicate: number | Predicate<T>): ForwardRange<T> {
        if (typeof countOrPredicate === "number")
            return new ForwardRangeImpl<T>(new Skip<T>(this.iterable, countOrPredicate));
        return new ForwardRangeImpl<T>(new SkipWhile<T>(this.iterable, countOrPredicate));
    }

    take(countOrPredicate: number | Predicate<T>): ForwardRange<T> {
        if (typeof countOrPredicate === "number")
            return new ForwardRangeImpl<T>(new Take<T>(this.iterable, countOrPredicate));
        return new ForwardRangeImpl<T>(new TakeWhile<T>(this.iterable, countOrPredicate));
    }

    where(predicate: Predicate<T>): ForwardRange<T> {
        return new ForwardRangeImpl<T>(new Where<T>(this.iterable, predicate));
    }

    map<U>(project: Projection<T, U>): ForwardRange<U> {
        return new ForwardRangeImpl<U>(new Map<T, U>(this.iterable, project));
    }

    prepend(...ranges: ForwardRange<T>[]): ForwardRange<T> {
        if (ranges.length === 0)
            return this;
        return new ForwardRangeImpl<T>(new Concatenate<T>([...ranges, this.iterable]));
    }

    append(...ranges: ForwardRange<T>[]): ForwardRange<T> {
        if (ranges.length === 0)
            return this;
        return new ForwardRangeImpl<T>(new Concatenate<T>([this.iterable, ...ranges]));
    }

    zip(...ranges: ForwardRange<T>[]): ForwardRange<T> {
        if (ranges.length === 0)
            return this;
        return new ForwardRangeImpl<T>(new Zip<T>([this.iterable, ...ranges]));
    }

    [Symbol.iterator](): Iterator<T> {
        return this.iterable[Symbol.iterator]();
    }
}