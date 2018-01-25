import { ForwardRange } from '../range';
import { Skip } from './skip';
import { Take } from './take';
import { Where } from './where';
import { While } from './while';
import { Map } from './map';
import { Concatenate } from './concatenate';
import { Zip } from './zip';


export class ForwardRangeImpl<T> implements ForwardRange<T> {
    constructor(private iterable: Iterable<T>) { }

    skip(count: number): ForwardRange<T> {
        return new ForwardRangeImpl<T>(new Skip<T>(this.iterable, count));
    }

    take(count: number): ForwardRange<T> {
        return new ForwardRangeImpl<T>(new Take<T>(this.iterable, count));
    }

    where(predicate: (v: T) => boolean): ForwardRange<T> {
        return new ForwardRangeImpl<T>(new Where<T>(this.iterable, predicate));
    }

    while(predicate: (v: T) => boolean): ForwardRange<T> {
        return new ForwardRangeImpl<T>(new While<T>(this.iterable, predicate));
    }

    map<U>(project: (v: T) => U): ForwardRange<U> {
        return new ForwardRangeImpl<U>(new Map<T, U>(this.iterable, project));
    }

    prepend(r: ForwardRange<T>): ForwardRange<T> {
        return new ForwardRangeImpl<T>(new Concatenate<T>([r, this.iterable]));
    }

    append(r: ForwardRange<T>): ForwardRange<T> {
        return new ForwardRangeImpl<T>(new Concatenate<T>([this.iterable, r]));
    }

    zip(r: ForwardRange<T>): ForwardRange<T> {
        return new ForwardRangeImpl<T>(new Zip<T>([this.iterable, r]));
    }

    [Symbol.iterator](): Iterator<T> {
        return this.iterable[Symbol.iterator]();
    }
}