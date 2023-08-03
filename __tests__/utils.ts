export type Expect<TInput extends true> = TInput;

export type ExpectTrue<TInput extends true> = TInput;
export type ExpectFalse<TInput extends false> = TInput;

export type IsTrue<TInput extends true> = TInput;
export type IsFalse<TInput extends false> = TInput;

export type Equal<TActual, TExpected> = 
    (<T>() => T extends TActual ? 1 : 2) extends 
    (<T>() => T extends TExpected ? 1 : 2)
        ? true
        : false;
export type NotEqual<TActual, TExpected> = true extends Equal<TActual, TExpected> ? false : true;


export function test(_name: string, _test: () => void): void {
    return;
}
