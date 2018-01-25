import { ForwardRangeImpl } from "./impl/forwardrange";
import { Concatenate } from "./impl/concatenate";

export type Predicate<T> = (v: T) => boolean;
export type Projection<T, U> = (v: T) => U;

/**
 * A ForwardRange is a range which can only be iterated from the beginning to the end.
 */
export interface ForwardRange<T> extends Iterable<T> {
    /**
     * Skips the given number of elements from the beginning
     * or all the elements as long as the predicate returns true
     *
     * @param countOrPredicate The number of items to skip
     *      or a predicate. If a predicate is given skipping
     *      will be done as long as the predicate returns true.
     * @returns A new ForwardRange<T>, the returned range is
     *      lazily evaluated which means that it contains
     *      all information required to perform the skip
     *      but the skip has not been performed yet.
     */
    skip(countOrPredicate: number | Predicate<T>): ForwardRange<T>;

    /**
     * Takes the given number of elements from the beginning
     * or all elements while the predicate returns true.
     *
     * @param countOrPredicate The number of items to take
     *      or a predicate. If a predicate is given taking
     *      will be done as long as the predicate returns true.
     * @returns A lazily evaluated ForwardRange<T> which contains
     *      all elements as specified by `countOrPredicate`.
     */
    take(countOrPredicate: number | Predicate<T>): ForwardRange<T>;

    /**
     * Returns a ForwardRange<T> which contains all elements
     * which match the given predicate.
     *
     * @param predicate A predicate which decides which elements
     *      to include the new range.
     * @returns A lazily evaluated ForwardRange<T> which contains
     *      all elements for which `predicate` returns true.
     */
    where(predicate: Predicate<T>): ForwardRange<T>;

    /**
     * Returns a new `ForwardRange<U>` which is a projection
     * of all values in `this` using the `Projection<T, U>`.
     *
     * @param projection A function which is applied to all
     *      elements in `this` to create a new range.
     * @returns A lazily evaluated `ForwardRange<U>` which contains
     *      all values from `this` after application of the
     *      projection `T -> U`.
     */
    map<U>(project: Projection<T, U>): ForwardRange<U>;

    /**
     * Returns a new `ForwardRange<T>` which has all input
     * ranges prepended to `this`.
     *
     * @param ...ranges Ranges which will be prepended to
     *      this range.
     * @returns A lazily evaluated range which is a concatenation
     *      of all input ranges with the `this` range last.
     */
    prepend(...ranges: ForwardRange<T>[]): ForwardRange<T>;

    /**
     * Returns a new `ForwardRange<T>` which has all input
     * ranges appended to `this`.
     *
     * @param ...ranges Ranges which will be appended to
     *      this range.
     * @returns A lazily evaluated range which is a concatenation
     *      of all input ranges with the `this` range first.
     */
    append(...ranges: ForwardRange<T>[]): ForwardRange<T>;

    zip(...ranges: ForwardRange<T>[]): ForwardRange<T>;
}

/**
 * Create a `ForwardRange<T>` from zero or more `Iterables<T>`.
 * If more than one input range is given the resulting range
 * will be a concatenation of all input ranges.
 *
 * @param iters Zero or more iterables which will form
 *      a lazily evaluated concatenated range.
 * @returns A `ForwardRange<T>` which is a lazily evaluated
 *      concatenation of all input ranges.
 */
export function forward_range<T>(...iters: Iterable<T>[]): ForwardRange<T> {
    if (iters.length > 1) {
        return new ForwardRangeImpl<T>(new Concatenate<T>(iters));
    }

    if (iters.length === 1) {
        return new ForwardRangeImpl(iters[0]);
    }

    return new ForwardRangeImpl<T>([]);
}