import { ForwardRangeImpl } from "./impl/forwardrange";

export interface ForwardRange<T> extends Iterable<T> {
    skip(count: number): ForwardRange<T>;
    take(count: number): ForwardRange<T>;
    where(predicate: (v: T) => boolean): ForwardRange<T>;
    while(predicate: (v: T) => boolean): ForwardRange<T>;
    map<U>(project: (v: T) => U): ForwardRange<U>;
    prepend(r: ForwardRange<T>): ForwardRange<T>;
    append(r: ForwardRange<T>): ForwardRange<T>;
    zip(r: ForwardRange<T>): ForwardRange<T>;
}

export function forward_range<T>(iter: Iterable<T>): ForwardRange<T> {
    return new ForwardRangeImpl(iter);
}