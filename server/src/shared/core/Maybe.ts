export const nothing = Symbol('Nothing');
export type Nothing = typeof nothing;

export type Maybe<A> = A | Nothing;
// type MaybeNumber = Maybe<number>;

export const isNothing = (m: Maybe<unknown>): m is Nothing => m === nothing;

// const isNothing = (m: MaybeNumber): m is Nothing =>
//   m.toString() === 'Symbol(Nothing)';
