import { ForwardRangeImpl } from "./impl/forwardrange";
import { Concatenate } from "./impl/concatenate";

export type Predicate<T> = (v: T) => boolean;
export type Projection<T, U> = (v: T) => U;

export interface ForwardRange<T> extends Iterable<T> {
    skip(countOrPredicate: number | Predicate<T>): ForwardRange<T>;
    take(countOrPredicate: number | Predicate<T>): ForwardRange<T>;
    where(predicate: Predicate<T>): ForwardRange<T>;
    map<U>(project: Projection<T, U>): ForwardRange<U>;
    prepend(...ranges: ForwardRange<T>[]): ForwardRange<T>;
    append(...ranges: ForwardRange<T>[]): ForwardRange<T>;
    zip(...ranges: ForwardRange<T>[]): ForwardRange<T>;
}

export function forward_range<T>(...iters: Iterable<T>[]): ForwardRange<T> {
    if (iters.length > 1) {
        return new ForwardRangeImpl<T>(new Concatenate<T>(iters));
    }

    if (iters.length === 1) {
        return new ForwardRangeImpl(iters[0]);
    }

    return new ForwardRangeImpl<T>([]);
}